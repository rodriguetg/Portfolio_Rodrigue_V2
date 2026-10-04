// Audit SEO express — analyse server-side d'une URL : balises, indexabilité, PageSpeed Insights.
// Zéro dépendance : parsing par regex prudents sur le HTML brut.

export type CheckStatus = "ok" | "warn" | "bad";
export type AuditCheck = { id: string; label: string; status: CheckStatus; detail: string };
export type AuditResult = {
  url: string;
  finalUrl: string;
  score: number;
  psi: { perf: number; lcp: string | null; cls: string | null } | null;
  checks: AuditCheck[];
};

const UA =
  "Mozilla/5.0 (compatible; RodespeAuditBot/1.0; +https://rodespe.com/outils/audit-seo)";

function timedFetch(url: string, ms: number, init?: RequestInit) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, {
    ...init,
    signal: ctrl.signal,
    headers: { "User-Agent": UA, Accept: "text/html,*/*", ...(init?.headers ?? {}) },
    redirect: "follow",
    cache: "no-store",
  }).finally(() => clearTimeout(t));
}

// --- garde anti-SSRF basique ---
export function validateUrl(raw: string): URL | null {
  if (raw.includes("://") && !/^https?:\/\//i.test(raw)) return null; // ftp://, file://, etc.
  let u: URL;
  try {
    u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  const host = u.hostname.toLowerCase();
  if (
    host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") ||
    host.endsWith(".internal") || host === "0.0.0.0" ||
    /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host) || /^169\.254\./.test(host) ||
    host.includes(":") // IPv6 littéral
  ) return null;
  if (u.port && !["80", "443", ""].includes(u.port)) return null;
  return u;
}

// --- helpers parsing ---
function getTag(html: string, re: RegExp): string | null {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}
function metaContent(html: string, name: string): string | null {
  const re1 = new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`, "i");
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`, "i");
  return getTag(html, re1) ?? getTag(html, re2);
}
function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&nbsp;/g, " ");
}

function analyzeHtml(html: string, pageUrl: URL): AuditCheck[] {
  const checks: AuditCheck[] = [];
  const push = (id: string, label: string, status: CheckStatus, detail: string) =>
    checks.push({ id, label, status, detail });

  // title
  const title = getTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title) push("title", "Balise title", "bad", "Aucune balise <title> trouvée. C'est l'élément SEO le plus important de la page.");
  else {
    const t = decodeEntities(title.replace(/\s+/g, " "));
    if (t.length < 15) push("title", "Balise title", "warn", `« ${t} » — ${t.length} caractères, trop court pour décrire la page (visez 30 à 60).`);
    else if (t.length > 65) push("title", "Balise title", "warn", `« ${t.slice(0, 60)}… » — ${t.length} caractères, risque de troncature dans Google (visez 30 à 60).`);
    else push("title", "Balise title", "ok", `« ${t} » — ${t.length} caractères, longueur idéale.`);
  }

  // meta description
  const desc = metaContent(html, "description");
  if (!desc) push("desc", "Meta description", "bad", "Absente. Google génère un extrait aléatoire à votre place : votre taux de clic en dépend directement.");
  else if (desc.length < 60) push("desc", "Meta description", "warn", `${desc.length} caractères — trop courte pour convaincre (visez 70 à 160).`);
  else if (desc.length > 170) push("desc", "Meta description", "warn", `${desc.length} caractères — sera tronquée dans les résultats (visez 70 à 160).`);
  else push("desc", "Meta description", "ok", `${desc.length} caractères, longueur idéale.`);

  // H1
  const h1s = html.match(/<h1[\s>]/gi)?.length ?? 0;
  if (h1s === 1) push("h1", "Titre H1", "ok", "Un seul H1, structure claire.");
  else if (h1s === 0) push("h1", "Titre H1", "bad", "Aucun H1 trouvé. Chaque page doit annoncer son sujet principal.");
  else push("h1", "Titre H1", "warn", `${h1s} balises H1 détectées — une seule est recommandée.`);

  // robots noindex
  const robotsMeta = metaContent(html, "robots");
  if (robotsMeta && /noindex/i.test(robotsMeta)) push("noindex", "Indexation", "bad", `meta robots « ${robotsMeta} » : la page demande à Google de NE PAS l'indexer.`);
  else push("noindex", "Indexation", "ok", "Pas de blocage noindex détecté.");

  // canonical
  const canonical = getTag(html, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ??
    getTag(html, /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  if (canonical) push("canonical", "URL canonique", "ok", `Canonical déclarée : ${canonical}`);
  else push("canonical", "URL canonique", "warn", "Aucune balise canonical — risque de contenu dupliqué (www/non-www, paramètres…).");

  // lang
  const lang = getTag(html, /<html[^>]+lang=["']([^"']+)["']/i);
  if (lang) push("lang", "Langue déclarée", "ok", `Attribut lang="${lang}" présent.`);
  else push("lang", "Langue déclarée", "warn", "Attribut lang manquant sur <html> — utile pour Google et l'accessibilité.");

  // viewport
  if (metaContent(html, "viewport")) push("viewport", "Mobile (viewport)", "ok", "Meta viewport présente, la page s'adapte au mobile.");
  else push("viewport", "Mobile (viewport)", "bad", "Pas de meta viewport : rendu mobile dégradé, pénalisant depuis l'index mobile-first.");

  // Open Graph
  const ogTitle = metaContent(html, "og:title");
  const ogImage = metaContent(html, "og:image");
  if (ogTitle && ogImage) push("og", "Partage social (Open Graph)", "ok", "og:title et og:image présents, les partages afficheront un aperçu propre.");
  else if (ogTitle || ogImage) push("og", "Partage social (Open Graph)", "warn", `Open Graph incomplet (${ogTitle ? "og:image manquant" : "og:title manquant"}).`);
  else push("og", "Partage social (Open Graph)", "warn", "Aucune balise Open Graph — les partages sur les réseaux seront moches.");

  // données structurées
  const ldCount = html.match(/<script[^>]+application\/ld\+json/gi)?.length ?? 0;
  if (ldCount > 0) push("schema", "Données structurées", "ok", `${ldCount} bloc(s) JSON-LD Schema.org détecté(s).`);
  else push("schema", "Données structurées", "warn", "Aucun Schema.org détecté — un quick win pour enrichir vos résultats Google.");

  // images sans alt
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  if (imgs.length > 0) {
    const noAlt = imgs.filter((i) => !/\balt=["'][^"']+["']/i.test(i)).length;
    if (noAlt === 0) push("alt", "Attributs alt des images", "ok", `${imgs.length} image(s), toutes avec un attribut alt.`);
    else push("alt", "Attributs alt des images", noAlt > imgs.length / 2 ? "bad" : "warn", `${noAlt} image(s) sur ${imgs.length} sans alt descriptif.`);
  }

  // https
  if (pageUrl.protocol === "https:") push("https", "HTTPS", "ok", "La page est servie en HTTPS.");
  else push("https", "HTTPS", "bad", "Page servie en HTTP non sécurisé.");

  return checks;
}

async function checkRobotsAndSitemap(origin: string): Promise<AuditCheck[]> {
  const checks: AuditCheck[] = [];
  let robotsTxt = "";
  try {
    const r = await timedFetch(`${origin}/robots.txt`, 6000);
    if (r.ok) {
      robotsTxt = (await r.text()).slice(0, 20000);
      if (/^\s*disallow:\s*\/\s*$/im.test(robotsTxt) && /user-agent:\s*\*/i.test(robotsTxt))
        checks.push({ id: "robots", label: "robots.txt", status: "bad", detail: "robots.txt accessible mais il bloque tout le site (Disallow: /)." });
      else checks.push({ id: "robots", label: "robots.txt", status: "ok", detail: "robots.txt accessible, pas de blocage global." });
    } else checks.push({ id: "robots", label: "robots.txt", status: "warn", detail: `robots.txt répond ${r.status}. Pas bloquant, mais recommandé.` });
  } catch {
    checks.push({ id: "robots", label: "robots.txt", status: "warn", detail: "robots.txt inaccessible (timeout ou erreur réseau)." });
  }
  try {
    const declared = robotsTxt.match(/sitemap:\s*(\S+)/i)?.[1];
    const target = declared ?? `${origin}/sitemap.xml`;
    const s = await timedFetch(target, 6000);
    if (s.ok) checks.push({ id: "sitemap", label: "Sitemap XML", status: "ok", detail: `Sitemap accessible (${declared ? "déclaré dans robots.txt" : "/sitemap.xml"}).` });
    else checks.push({ id: "sitemap", label: "Sitemap XML", status: "warn", detail: `Aucun sitemap trouvé (${target} répond ${s.status}).` });
  } catch {
    checks.push({ id: "sitemap", label: "Sitemap XML", status: "warn", detail: "Sitemap inaccessible (timeout ou erreur réseau)." });
  }
  return checks;
}

async function fetchPsi(url: string): Promise<AuditResult["psi"]> {
  try {
    const key = process.env.PSI_API_KEY;
    const api =
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}` +
      `&strategy=mobile&category=performance${key ? `&key=${key}` : ""}`;
    const r = await timedFetch(api, 35000, { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const j: any = await r.json();
    const perf = Math.round((j?.lighthouseResult?.categories?.performance?.score ?? 0) * 100);
    const lcp = j?.lighthouseResult?.audits?.["largest-contentful-paint"]?.displayValue ?? null;
    const cls = j?.lighthouseResult?.audits?.["cumulative-layout-shift"]?.displayValue ?? null;
    return { perf, lcp, cls };
  } catch {
    return null;
  }
}

function computeScore(checks: AuditCheck[], psi: AuditResult["psi"]): number {
  let base = 100;
  for (const c of checks) {
    if (c.status === "bad") base -= 14;
    else if (c.status === "warn") base -= 6;
  }
  base = Math.max(0, base);
  if (psi) return Math.max(0, Math.min(100, Math.round(base * 0.65 + psi.perf * 0.35)));
  return base;
}

export async function runAudit(target: URL): Promise<AuditResult> {
  const res = await timedFetch(target.href, 12000);
  if (!res.ok) throw new Error(`La page répond ${res.status} — audit impossible.`);
  const finalUrl = new URL(res.url || target.href);
  const html = (await res.text()).slice(0, 1_500_000);

  const [pageChecks, siteChecks, psi] = await Promise.all([
    Promise.resolve(analyzeHtml(html, finalUrl)),
    checkRobotsAndSitemap(finalUrl.origin),
    fetchPsi(finalUrl.href),
  ]);

  const checks = [...pageChecks, ...siteChecks];
  if (psi) {
    const st: CheckStatus = psi.perf >= 80 ? "ok" : psi.perf >= 50 ? "warn" : "bad";
    checks.push({
      id: "psi",
      label: "Performance mobile (PageSpeed)",
      status: st,
      detail: `Score ${psi.perf}/100${psi.lcp ? ` · LCP ${psi.lcp}` : ""}${psi.cls ? ` · CLS ${psi.cls}` : ""}. ${psi.perf < 80 ? "Objectif : LCP sous 2,5 s." : "Bonne base."}`,
    });
  } else {
    checks.push({ id: "psi", label: "Performance mobile (PageSpeed)", status: "warn", detail: "PageSpeed Insights n'a pas répondu à temps — score calculé sans la performance." });
  }

  // tri : bad → warn → ok
  const order = { bad: 0, warn: 1, ok: 2 };
  checks.sort((a, b) => order[a.status] - order[b.status]);

  return { url: target.href, finalUrl: finalUrl.href, score: computeScore(checks, psi), psi, checks };
}
