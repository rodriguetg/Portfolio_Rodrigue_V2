import { NextRequest, NextResponse } from "next/server";
import { runAudit, validateUrl } from "@/lib/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Rate limit en mémoire : 6 audits / heure / IP (conteneur unique → suffisant).
const WINDOW_MS = 3600_000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();

function allowed(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) {
    hits.set(ip, arr);
    return false;
  }
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) {
    // purge grossière pour éviter la fuite mémoire
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!allowed(ip)) {
    return NextResponse.json(
      { error: "Limite atteinte : 6 audits par heure. Réessayez plus tard, ou contactez-moi pour un audit complet." },
      { status: 429 }
    );
  }

  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const target = validateUrl((body.url ?? "").trim());
  if (!target) {
    return NextResponse.json({ error: "URL invalide. Format attendu : https://votre-site.com" }, { status: 400 });
  }

  try {
    const result = await runAudit(target);
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur inattendue.";
    return NextResponse.json(
      { error: `Impossible d'auditer cette page. ${msg}` },
      { status: 502 }
    );
  }
}
