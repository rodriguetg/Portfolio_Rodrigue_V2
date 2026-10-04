import { NextResponse } from "next/server";
import { lookup } from "node:dns/promises";
import net from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UA = "Mozilla/5.0 (compatible; RodespeGeoChecker/1.0; +https://rodespe.com/outils/checker-geo)";
const BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"];
const hits = new Map<string, number[]>();

type Status = "ok" | "warn" | "fail";
type Check = { id: string; label: string; status: Status; detail: string; weight: number };

function isPrivate(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
  }
  const v = ip.toLowerCase();
  if (v.startsWith("::ffff:")) return isPrivate(v.slice(7));
  return v === "::1" || v === "::" || v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80");
}

async function assertPublic(u: URL) {
  if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error("URL http(s) uniquement.");
  if (u.port && u.port !== "80" && u.port !== "443") throw new Error("Port non autorisé.");
  const host = u.hostname.replace(/^\[|\]$/g, "");
  const addrs: { address: string }[] = net.isIP(host) ? [{ address: host }] : await lookup(host, { all: true });
  if (!addrs.length || addrs.some((a) => isPrivate(a.address))) throw new Error("Adresse non autorisée.");
}

async function get(url: string, max = 1_500_000) {
  let current = new URL(url);
  for (let i = 0; i < 4; i++) {
    await assertPublic(current);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
      const res = await fetch(current, {
        redirect: "manual",
        signal: ctrl.signal,
        cache: "no-store",
        headers: { "user-agent": UA, accept: "text/html,text/plain,*/*" },
      });
      const loc = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && loc) {
        current = new URL(loc, current);
        continue;
      }
      let text = "";
      const reader = res.body?.getReader();
      if (reader) {
        const dec = new TextDecoder();
        let size = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.length;
          text += dec.decode(value, { stream: true });
          if (size > max) { await reader.cancel(); break; }
        }
      }
      return {
        status: res.status,
        type: res.headers.get("content-type") ?? "",
        robotsHeader: res.headers.get("x-robots-tag") ?? "",
        text,
        finalUrl: current.toString(),
      };
    } finally {
      clearTimeout(timer);
    }
  }
  throw new Error("Trop de redirections.");
}

function botAllowed(robots: string, bot: string): boolean {
  const groups: { agents: string[]; rules: { allow: boolean; path: string }[] }[] = [];
  let cur: { agents: string[]; rules: { allow: boolean; path: string }[] } | null = null;
  let lastWasAgent = false;
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if (key === "user-agent") {
      if (!cur || !lastWasAgent) { cur = { agents: [], rules: [] }; groups.push(cur); }
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (cur && (key === "allow" || key === "disallow")) cur.rules.push({ allow: key === "allow", path: val });
    }
  }
  const b = bot.toLowerCase();
  const g = groups.find((x) => x.agents.includes(b)) ?? groups.find((x) => x.agents.includes("*"));
  if (!g) return true;
  const isRoot = (p: string) => p === "/" || p === "/*";
  const dis = g.rules.some((r) => !r.allow && isRoot(r.path));
  const al = g.rules.some((r) => r.allow && isRoot(r.path));
  return !dis || al;
}

function attrOf(html: string, re: RegExp, attr: string): string {
  const tag = html.match(re)?.[0] ?? "";
  return tag.match(new RegExp(attr + "=[\"']([^\"']*)[\"']", "i"))?.[1]?.trim() ?? "";
}

function strip(s: string): string {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  if (recent.length >= 10) {
    return NextResponse.json({ error: "Trop de requêtes, réessayez dans quelques minutes." }, { status: 429 });
  }
  recent.push(now);
  hits.set(ip, recent);

  let input = "";
  try {
    input = String(((await req.json()) as { url?: string }).url ?? "").trim();
  } catch {
    input = "";
  }
  if (!input) return NextResponse.json({ error: "URL manquante." }, { status: 400 });
  if (!/^https?:\/\//i.test(input)) input = "https://" + input;
  let target: URL;
  try {
    target = new URL(input);
  } catch {
    return NextResponse.json({ error: "URL invalide." }, { status: 400 });
  }

  try {
    const page = await get(target.toString());
    const checks: Check[] = [];
    const add = (c: Check) => checks.push(c);
    const isHtml = /html/i.test(page.type);

    if (page.status !== 200 || !isHtml) {
      add({ id: "access", label: "Page accessible", status: "fail", weight: 15,
        detail: `Code HTTP ${page.status}${isHtml ? "" : ", contenu non HTML"}.` });
      return NextResponse.json({ url: page.finalUrl, score: 0, checks });
    }
    add({ id: "access", label: "Page accessible", status: "ok", weight: 15, detail: "Code HTTP 200, HTML servi aux robots." });

    const origin = new URL(page.finalUrl).origin;
    const [robots, llms] = await Promise.all([
      get(origin + "/robots.txt", 300_000).catch(() => null),
      get(origin + "/llms.txt", 300_000).catch(() => null),
    ]);
    const html = page.text;

    const robotsMeta = attrOf(html, /<meta[^>]+name=["']robots["'][^>]*>/i, "content").toLowerCase();
    const noindex = robotsMeta.includes("noindex") || page.robotsHeader.toLowerCase().includes("noindex");
    add({ id: "index", label: "Page indexable", status: noindex ? "fail" : "ok", weight: 15,
      detail: noindex ? "Directive noindex détectée : moteurs et IA ne citeront pas cette page." : "Aucune directive noindex." });

    const words = strip(html).split(" ").filter((w) => w.length > 1).length;
    add({ id: "ssr", label: "Contenu lisible sans JavaScript", weight: 15,
      status: words >= 300 ? "ok" : words >= 100 ? "warn" : "fail",
      detail: `${words} mots dans le HTML brut. La plupart des robots IA n'exécutent pas le JavaScript : le contenu doit être présent dans le HTML.` });

    if (!robots || robots.status !== 200 || /html/i.test(robots.type)) {
      add({ id: "bots", label: "Robots IA autorisés (robots.txt)", status: "ok", weight: 15, detail: "Pas de robots.txt exploitable : aucun robot n'est bloqué." });
    } else {
      const blocked = BOTS.filter((b) => !botAllowed(robots.text, b));
      add({ id: "bots", label: "Robots IA autorisés (robots.txt)", weight: 15,
        status: blocked.length === 0 ? "ok" : blocked.length < BOTS.length ? "warn" : "fail",
        detail: blocked.length ? `Bloqués : ${blocked.join(", ")}.` : `Autorisés : ${BOTS.join(", ")}.` });
    }

    const hasLlms = !!llms && llms.status === 200 && !/html/i.test(llms.type) && llms.text.trim().length > 20;
    add({ id: "llms", label: "Fichier llms.txt", status: hasLlms ? "ok" : "warn", weight: 10,
      detail: hasLlms ? "llms.txt présent." : "Absent. C'est une convention proposée, pas un standard officiel, mais elle aide les agents IA à comprendre le site." });

    const types: string[] = [];
    let blocks = 0;
    const reS = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let m: RegExpExecArray | null;
    while ((m = reS.exec(html)) !== null) {
      blocks++;
      const reT = /"@type"\s*:\s*"([^"]+)"/g;
      let t: RegExpExecArray | null;
      while ((t = reT.exec(m[1])) !== null) types.push(t[1]);
    }
    const uniq = Array.from(new Set(types));
    add({ id: "schema", label: "Données structurées (JSON-LD)", status: blocks ? "ok" : "fail", weight: 10,
      detail: blocks ? `Types : ${uniq.join(", ") || "non détectés"}.` : "Aucun JSON-LD : ajoutez au minimum Organization ou Person, et le type de la page." });

    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
    const desc = attrOf(html, /<meta[^>]+name=["']description["'][^>]*>/i, "content");
    const n = (title ? 1 : 0) + (desc ? 1 : 0);
    add({ id: "meta", label: "Title et meta description", status: n === 2 ? "ok" : n === 1 ? "warn" : "fail", weight: 5,
      detail: `Title : ${title ? "présent" : "absent"} · Meta description : ${desc ? "présente" : "absente"}.` });

    const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
    const h2 = (html.match(/<h2[\s>]/gi) ?? []).length;
    add({ id: "hn", label: "Structure des titres", status: h1 === 1 && h2 >= 2 ? "ok" : h1 >= 1 ? "warn" : "fail", weight: 5,
      detail: `${h1} H1, ${h2} H2. Une structure claire aide les IA à extraire des passages.` });

    const canon = attrOf(html, /<link[^>]+rel=["']canonical["'][^>]*>/i, "href");
    add({ id: "canonical", label: "URL canonique", status: canon ? "ok" : "warn", weight: 5, detail: canon || "Aucune balise canonical." });

    const lang = html.match(/<html[^>]+lang=["']([^"']+)/i)?.[1] ?? "";
    add({ id: "lang", label: "Langue déclarée", status: lang ? "ok" : "warn", weight: 5,
      detail: lang ? `lang="${lang}"` : "Attribut lang absent sur la balise html." });

    const score = Math.round(checks.reduce((s, c) => s + (c.status === "ok" ? c.weight : c.status === "warn" ? c.weight / 2 : 0), 0));
    return NextResponse.json({ url: page.finalUrl, score, checks });
  } catch (e) {
    const msg = e instanceof Error && e.name !== "AbortError" ? e.message : "Le site n'a pas répondu à temps.";
    return NextResponse.json({ error: msg }, { status: 422 });
  }
}
