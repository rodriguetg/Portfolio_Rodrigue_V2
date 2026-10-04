"use client";

import { useEffect, useRef, useState } from "react";

type Check = { id: string; label: string; status: "ok" | "warn" | "bad"; detail: string };
type Result = {
  url: string;
  finalUrl: string;
  score: number;
  psi: { perf: number; lcp: string | null; cls: string | null } | null;
  checks: Check[];
};

const STEPS = [
  "Récupération de la page…",
  "Analyse des balises et de la structure…",
  "Vérification robots.txt et sitemap…",
  "Interrogation de PageSpeed Insights (jusqu'à 30 s)…",
];

function verdict(score: number): { title: string; text: string } {
  if (score >= 85) return { title: "Très bonne base 🟢", text: "Les fondations SEO sont saines. Les points restants sont des optimisations fines." };
  if (score >= 65) return { title: "Bien, mais des points bloquants 🟠", text: "La base est correcte, mais certains problèmes pèsent sur votre visibilité. Commencez par les points rouges." };
  return { title: "Des fondations à reprendre 🔴", text: "Plusieurs problèmes majeurs freinent l'indexation ou le clic. La bonne nouvelle : ce sont souvent des corrections rapides." };
}

export default function AuditTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  async function run() {
    if (!url.trim() || loading) return;
    setLoading(true); setError(null); setResult(null); setStep(0); setDisplayScore(0);
    timerRef.current = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 3500);
    try {
      const r = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await r.json();
      if (!r.ok) { setError(data?.error ?? "Erreur inattendue."); return; }
      setResult(data as Result);
      // animation du score
      const target = (data as Result).score;
      let cur = 0;
      const anim = setInterval(() => {
        cur += Math.max(1, Math.round(target / 40));
        if (cur >= target) { cur = target; clearInterval(anim); }
        setDisplayScore(cur);
      }, 25);
    } catch {
      setError("Erreur réseau — réessayez.");
    } finally {
      if (timerRef.current) clearInterval(timerRef.current);
      setLoading(false);
    }
  }

  const R = 56;
  const CIRC = 2 * Math.PI * R;
  const v = result ? verdict(result.score) : null;

  return (
    <div className="panel">
      <div className="audit-inline">
        <div className="field" style={{ flex: 1, minWidth: 220, marginBottom: 0 }}>
          <label htmlFor="audit-url">URL à analyser</label>
          <input
            id="audit-url" type="text" placeholder="https://votre-site.com" value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
          />
        </div>
        <span className="shine">
          <button onClick={run} disabled={loading}>{loading ? "Analyse…" : "Lancer l'audit ⚡"}</button>
        </span>
      </div>

      {loading && (
        <div className="audit-progress">
          <div className="pbar"><i style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>
          <div className="plabel">{STEPS[step]}</div>
        </div>
      )}

      {error && <p className="audit-error">{error}</p>}

      {result && v && (
        <div className="audit-result">
          <div className="score-row">
            <div className="ring">
              <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r={R} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="10" />
                <circle
                  cx="65" cy="65" r={R} fill="none" stroke="url(#auditgr)" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={CIRC} strokeDashoffset={CIRC - (CIRC * displayScore) / 100}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset .1s linear" }}
                />
                <defs>
                  <linearGradient id="auditgr" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7c5cff" /><stop offset="100%" stopColor="#36e2c4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="val"><b>{displayScore}</b><span>/ 100</span></div>
            </div>
            <div className="score-txt">
              <h3>{v.title}</h3>
              <p>{v.text}</p>
              <p className="audit-final-url">Page analysée : {result.finalUrl}</p>
            </div>
          </div>

          <div className="checks">
            {result.checks.map((c) => (
              <div className={`check ${c.status}`} key={c.id}>
                <span className="dot">{c.status === "ok" ? "✓" : c.status === "warn" ? "!" : "✕"}</span>
                <div><b>{c.label}</b><span>{c.detail}</span></div>
              </div>
            ))}
          </div>

          <div className="audit-cta">
            <h3>Ces corrections peuvent être automatisées 🤝</h3>
            <p>Monitoring continu, rapports hebdo, corrections en masse : c'est exactement ce que je mets en place pour mes clients.</p>
            <span className="shine"><a href="/#contact">Discuter de votre SEO — gratuit, 30 min</a></span>
          </div>
        </div>
      )}
    </div>
  );
}
