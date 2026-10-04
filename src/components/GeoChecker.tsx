"use client";

import { useState } from "react";

type Status = "ok" | "warn" | "fail";
type Check = { id: string; label: string; status: Status; detail: string; weight: number };
type Result = { url: string; score: number; checks: Check[] };

const colors: Record<Status, string> = { ok: "#3ddc84", warn: "#ffb84d", fail: "#ff5d6c" };
const icons: Record<Status, string> = { ok: "✓", warn: "!", fail: "✗" };
const box: React.CSSProperties = { border: "1px solid rgba(255,255,255,.12)", borderRadius: 16, padding: 20, background: "rgba(255,255,255,.03)" };
const inp: React.CSSProperties = { flex: 1, minWidth: 220, padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.05)", color: "inherit", font: "inherit" };
const btn: React.CSSProperties = { padding: "12px 20px", borderRadius: 10, border: "1px solid var(--accent2)", background: "rgba(255,255,255,.06)", color: "inherit", cursor: "pointer", font: "inherit" };

export default function GeoChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [res, setRes] = useState<Result | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || loading) return;
    setLoading(true);
    setError("");
    setRes(null);
    try {
      const r = await fetch("/api/geo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await r.json();
      if (!r.ok) setError(data.error ?? "Erreur inconnue.");
      else setRes(data as Result);
    } catch {
      setError("Impossible de joindre le serveur.");
    }
    setLoading(false);
  };

  const sc = res ? (res.score >= 80 ? colors.ok : res.score >= 50 ? colors.warn : colors.fail) : "";

  return (
    <div style={{ display: "grid", gap: 22 }}>
      <form onSubmit={run} style={{ ...box, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input style={inp} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://exemple.com/page" aria-label="URL à analyser" />
        <button type="submit" style={btn} disabled={loading}>{loading ? "Analyse…" : "Analyser"}</button>
      </form>

      {error && <div style={{ ...box, borderColor: colors.fail, color: "#ff7b88" }}>{error}</div>}

      {res && (
        <div style={{ display: "grid", gap: 14 }}>
          <div style={{ ...box, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ width: 96, height: 96, borderRadius: "50%", border: `6px solid ${sc}`, display: "grid", placeItems: "center", fontSize: 28, fontWeight: 700 }}>
              {res.score}
            </div>
            <div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>Score de visibilité IA /100</div>
              <div style={{ wordBreak: "break-all", marginTop: 4 }}>{res.url}</div>
            </div>
          </div>
          {res.checks.map((c) => (
            <div key={c.id} style={{ ...box, padding: 16, display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ minWidth: 28, height: 28, borderRadius: "50%", display: "grid", placeItems: "center", background: colors[c.status] + "26", color: colors[c.status], fontWeight: 700 }}>
                {icons[c.status]}
              </span>
              <div>
                <div style={{ fontWeight: 600 }}>{c.label} <span style={{ fontSize: 12, opacity: 0.6 }}>({c.weight} pts)</span></div>
                <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>{c.detail}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
