"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const TITLE_MAX = 580; // px, desktop
const DESC_MAX = 990; // px, desktop
const TITLE_FONT = "400 20px arial";
const DESC_FONT = "400 14px arial";

function useTextMeasure() {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    ctxRef.current = document.createElement("canvas").getContext("2d");
  }, []);
  return (text: string, font: string) => {
    const ctx = ctxRef.current;
    if (!ctx) return 0;
    ctx.font = font;
    return Math.round(ctx.measureText(text).width);
  };
}

function truncate(text: string, measure: (t: string, f: string) => number, font: string, max: number) {
  if (measure(text, font) <= max) return text;
  let t = text;
  while (t.length && measure(t + "…", font) > max) t = t.slice(0, -1);
  return t.trimEnd() + "…";
}

function Gauge({ label, width, max }: { label: string; width: number; max: number }) {
  const pct = Math.min(100, (width / max) * 100);
  const color = width > max ? "#ff5d6c" : width > max * 0.9 ? "#ffb84d" : "#3ddc84";
  return (
    <div className={"gauge" + (width > max ? " over" : "")}>
      <div className="g-head">
        <span>{label}</span>
        <b>{width} / {max} px</b>
      </div>
      <div className="g-bar">
        <i style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function SerpSimulator() {
  const [title, setTitle] = useState("Chargé de marketing digital SEO/GEO | Rodrigue GBADOU");
  const [desc, setDesc] = useState(
    "J'aide les équipes marketing à automatiser leurs tâches répétitives : SEO technique, workflows n8n, intégrations API et IA."
  );
  const [url, setUrl] = useState("rodespe.com");
  const measure = useTextMeasure();
  const [, force] = useState(0);
  useEffect(() => { force(1); }, []); // re-render une fois le canvas prêt

  const wTitle = measure(title, TITLE_FONT);
  const wDesc = measure(desc, DESC_FONT);
  const pvTitle = useMemo(() => truncate(title, measure, TITLE_FONT, TITLE_MAX) || "Votre title ici", [title, wTitle]); // eslint-disable-line react-hooks/exhaustive-deps
  const pvDesc = useMemo(() => truncate(desc, measure, DESC_FONT, DESC_MAX) || "Votre meta description ici.", [desc, wDesc]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="serp-grid">
      <div className="panel">
        <div className="field">
          <label htmlFor="serp-title">Balise title</label>
          <input id="serp-title" maxLength={90} value={title} onChange={(e) => setTitle(e.target.value)} />
          <Gauge label="Largeur title" width={wTitle} max={TITLE_MAX} />
        </div>
        <div className="field">
          <label htmlFor="serp-desc">Meta description</label>
          <textarea id="serp-desc" rows={3} maxLength={220} value={desc} onChange={(e) => setDesc(e.target.value)} />
          <Gauge label="Largeur description" width={wDesc} max={DESC_MAX} />
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label htmlFor="serp-url">URL affichée</label>
          <input id="serp-url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
      </div>
      <div>
        <div className="serp-preview">
          <div className="url">
            <span className="fav">🌐</span>
            <span>
              <span className="dom">{url || "rodespe.com"}</span>
              <br />
              <span className="path">https://{url || "rodespe.com"}</span>
            </span>
          </div>
          <h4>{pvTitle}</h4>
          <div className="desc">{pvDesc}</div>
        </div>
        <p className="tool-note">
          Mesure réelle de la largeur du texte (canvas) avec la police des SERP.
          Limites desktop : ~580 px pour le title, ~990 px pour la description.
        </p>
      </div>
    </div>
  );
}
