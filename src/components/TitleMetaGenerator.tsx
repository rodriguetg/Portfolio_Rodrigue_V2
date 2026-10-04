"use client";

import { useEffect, useRef, useState } from "react";

const TITLE_MAX = 580;
const DESC_MAX = 990;
const TITLE_FONT = "400 20px arial";
const DESC_FONT = "400 14px arial";
type PageType = "article" | "produit" | "service" | "local";

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const clean = (s: string) => s.replace(/\s+/g, " ").replace(/\s*[|–-]\s*$/, "").trim();
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function build(type: PageType, k: string, b: string, ben: string, city: string) {
  const kk = k || "votre mot-clé";
  const K = cap(kk);
  const y = new Date().getFullYear();
  const B = b ? ` | ${b}` : "";
  const c = city || "votre ville";
  let titles: string[] = [];
  let descs: string[] = [];
  if (type === "article") {
    titles = [
      `${K} : le guide complet ${y}${B}`,
      `${K} : définition, exemples et bonnes pratiques`,
      `Comment réussir ${kk} ? Méthode pas à pas${B}`,
      `${K} en ${y} : ce qui marche vraiment${B}`,
      `${K} : 7 erreurs à éviter${B}`,
    ];
    descs = [
      `Tout savoir sur ${kk} : définition, méthode, exemples concrets et outils. Un guide pratique pour passer à l'action dès aujourd'hui.`,
      `${K} expliqué simplement : les étapes clés, les erreurs fréquentes et des conseils applicables tout de suite. Lisez le guide.`,
      `Vous voulez maîtriser ${kk} ? Découvrez une méthode claire, des exemples réels et les bonnes pratiques ${y}.`,
      `${ben ? cap(ben) + ". " : ""}Ce guide sur ${kk} vous donne les clés pour obtenir des résultats rapidement, sans jargon.`,
    ];
  } else if (type === "produit") {
    titles = [
      `${K}${ben ? ` : ${ben}` : ""}${B}`,
      `${K} au meilleur prix${B}`,
      `Acheter ${kk} : avis, prix et comparatif${B}`,
      `${K} – Livraison rapide${B}`,
      `${K} : notre sélection ${y}${B}`,
    ];
    descs = [
      `Découvrez notre ${kk} : ${ben || "qualité, prix juste et livraison rapide"}. Commandez en ligne en quelques clics.`,
      `${K} au meilleur prix. Comparez les modèles, lisez les avis et choisissez le produit adapté à vos besoins.`,
      `Vous cherchez ${kk} ? Large choix, conseils d'experts et paiement sécurisé${b ? " chez " + b : ""}. Livraison rapide.`,
      `${K} : caractéristiques, avis clients et prix. Trouvez le modèle idéal et profitez d'un service client réactif.`,
    ];
  } else if (type === "service") {
    titles = [
      `${K}${ben ? ` : ${ben}` : " : résultats mesurables"}${B}`,
      `Expert ${kk} – Devis gratuit${B}`,
      `${K} sur mesure pour votre entreprise${B}`,
      `${K} : accompagnement de A à Z${B}`,
      `${K} – Premier échange offert${B}`,
    ];
    descs = [
      `Besoin d'un expert en ${kk} ? ${ben ? cap(ben) + ". " : ""}Accompagnement sur mesure, méthode claire et résultats mesurables. Demandez un devis.`,
      `${K} : audit, stratégie et mise en place. Gagnez du temps et concentrez-vous sur l'essentiel. Premier échange gratuit.`,
      `Confiez votre projet de ${kk} à un spécialiste${b ? " : " + b : ""}. Solutions adaptées à votre budget et suivi transparent.`,
      `Vous voulez passer à la vitesse supérieure en ${kk} ? Découvrez une offre pensée pour les PME et les équipes marketing.`,
    ];
  } else {
    titles = [
      `${K} à ${c}${B}`,
      `${K} ${c} : devis gratuit et rapide${B}`,
      `${K} à ${c} – Avis clients${B}`,
      `${K} à ${c} et alentours${B}`,
      `Votre ${kk} à ${c}${ben ? ` : ${ben}` : ""}${B}`,
    ];
    descs = [
      `${K} à ${c} : ${ben || "un service de proximité, réactif et de qualité"}. Contactez-nous pour un devis gratuit.`,
      `Vous cherchez ${kk} à ${c} ? Intervention rapide, tarifs clairs et avis clients vérifiés. Prenez rendez-vous.`,
      `${b ? b + ", votre" : "Votre"} spécialiste ${kk} à ${c} et dans les environs. Devis gratuit et réponse rapide.`,
      `${K} à ${c} : découvrez nos prestations, nos tarifs et les avis de nos clients. Appelez-nous ou réservez en ligne.`,
    ];
  }
  const uniq = (a: string[]) => Array.from(new Set(a.map(clean)));
  return { titles: uniq(titles), descs: uniq(descs) };
}

type Check = { ok: boolean; msg: string };
function runChecks(text: string, k: string, w: number, max: number, isTitle: boolean): Check[] {
  const out: Check[] = [];
  const nk = norm(k.trim());
  const nt = norm(text);
  const pos = nk ? nt.indexOf(nk) : -1;
  if (nk) out.push({ ok: pos >= 0, msg: pos >= 0 ? "Mot-clé présent" : "Mot-clé absent" });
  if (isTitle && pos >= 0) {
    const early = pos <= nt.length * 0.4;
    out.push({ ok: early, msg: early ? "Mot-clé en début" : "Mot-clé trop loin" });
  }
  out.push({ ok: w <= max, msg: w <= max ? "Pas de troncature" : "Tronqué dans Google" });
  const min = isTitle ? 300 : 600;
  if (w > 0 && w < min) out.push({ ok: false, msg: "Un peu court" });
  const words: string[] = nt.match(/[a-z0-9]{4,}/g) ?? [];
  const dup = Array.from(new Set(words.filter((x, i) => words.indexOf(x) !== i)));
  if (dup.length) out.push({ ok: false, msg: `Répétition : ${dup.join(", ")}` });
  const letters = text.replace(/[^A-Za-zÀ-ÿ]/g, "");
  const up = letters.replace(/[^A-ZÀ-Þ]/g, "").length;
  if (letters.length > 10 && up / letters.length > 0.3) out.push({ ok: false, msg: "Trop de majuscules" });
  return out;
}

function Gauge({ label, width, max }: { label: string; width: number; max: number }) {
  const pct = Math.min(100, (width / max) * 100);
  const color = width > max ? "#ff5d6c" : width > max * 0.9 ? "#ffb84d" : "#3ddc84";
  return (
    <div className={"gauge" + (width > max ? " over" : "")}>
      <div className="g-head"><span>{label}</span><b>{width} / {max} px</b></div>
      <div className="g-bar"><i style={{ width: `${pct}%`, background: color }} /></div>
    </div>
  );
}

const box: React.CSSProperties = { border: "1px solid rgba(255,255,255,.12)", borderRadius: 16, padding: 20, background: "rgba(255,255,255,.03)" };
const inp: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.05)", color: "inherit", font: "inherit", marginTop: 6 };
const lbl: React.CSSProperties = { display: "block", fontSize: 13, opacity: 0.8, marginBottom: 12 };
const btn: React.CSSProperties = { padding: "8px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.06)", color: "inherit", cursor: "pointer", font: "inherit", fontSize: 13 };

function Badges({ checks }: { checks: Check[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
      {checks.map((c) => (
        <span key={c.msg} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: c.ok ? "rgba(61,220,132,.15)" : "rgba(255,93,108,.15)", color: c.ok ? "#3ddc84" : "#ff7b88" }}>
          {c.ok ? "✓" : "✗"} {c.msg}
        </span>
      ))}
    </div>
  );
}

export default function TitleMetaGenerator() {
  const [k, setK] = useState("automatisation marketing");
  const [brand, setBrand] = useState("Rodespe");
  const [type, setType] = useState<PageType>("service");
  const [ben, setBen] = useState("");
  const [city, setCity] = useState("Paris");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [copied, setCopied] = useState("");
  const [ready, setReady] = useState(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    ctxRef.current = document.createElement("canvas").getContext("2d");
    setReady(true);
  }, []);

  const measure = (t: string, f: string) => {
    const c = ctxRef.current;
    if (!ready || !c) return 0;
    c.font = f;
    return Math.round(c.measureText(t).width);
  };
  const truncate = (t: string, f: string, max: number) => {
    if (measure(t, f) <= max) return t;
    let s = t;
    while (s.length && measure(s + "…", f) > max) s = s.slice(0, -1);
    return s.trimEnd() + "…";
  };

  const { titles, descs } = build(type, k.trim(), brand.trim(), ben.trim(), city.trim());
  useEffect(() => {
    setTitle(titles[0] ?? "");
    setDesc(descs[0] ?? "");
  }, [k, brand, type, ben, city]); // eslint-disable-line react-hooks/exhaustive-deps

  const copy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("");
    }
  };

  const wT = measure(title, TITLE_FONT);
  const wD = measure(desc, DESC_FONT);
  const html = `<title>${esc(title)}</title>\n<meta name="description" content="${esc(desc)}" />`;
  const site = brand.trim() ? brand.trim().toLowerCase().replace(/\s+/g, "") + ".com" : "votre-site.com";

  const List = ({ items, isTitle }: { items: string[]; isTitle: boolean }) => (
    <div style={{ display: "grid", gap: 10 }}>
      {items.map((t) => {
        const w = measure(t, isTitle ? TITLE_FONT : DESC_FONT);
        const ch = runChecks(t, k, w, isTitle ? TITLE_MAX : DESC_MAX, isTitle);
        const active = (isTitle ? title : desc) === t;
        return (
          <button key={t} type="button" onClick={() => (isTitle ? setTitle(t) : setDesc(t))}
            style={{ ...box, padding: 14, textAlign: "left", cursor: "pointer", color: "inherit", font: "inherit", borderColor: active ? "var(--accent2)" : "rgba(255,255,255,.12)" }}>
            <div style={{ fontSize: 14 }}>{t}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>{t.length} car. · {w} px · {ch.filter((c) => c.ok).length}/{ch.length} critères</div>
            <Badges checks={ch} />
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 22 }}>
      <div style={{ ...box, display: "grid", gap: 4, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", columnGap: 18 }}>
        <label style={lbl}>Mot-clé principal<input style={inp} value={k} onChange={(e) => setK(e.target.value)} /></label>
        <label style={lbl}>Marque (optionnel)<input style={inp} value={brand} onChange={(e) => setBrand(e.target.value)} /></label>
        <label style={lbl}>Type de page
          <select style={inp} value={type} onChange={(e) => setType(e.target.value as PageType)}>
            <option value="article">Article / guide</option>
            <option value="produit">Fiche produit</option>
            <option value="service">Page service</option>
            <option value="local">Page locale</option>
          </select>
        </label>
        <label style={lbl}>Bénéfice clé (optionnel)<input style={inp} value={ben} placeholder="ex : 10 h gagnées par semaine" onChange={(e) => setBen(e.target.value)} /></label>
        {type === "local" && <label style={lbl}>Ville<input style={inp} value={city} onChange={(e) => setCity(e.target.value)} /></label>}
      </div>

      <div style={{ display: "grid", gap: 22, gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
        <div><h3 style={{ marginBottom: 12 }}>Titles proposés</h3><List items={titles} isTitle /></div>
        <div><h3 style={{ marginBottom: 12 }}>Meta descriptions proposées</h3><List items={descs} isTitle={false} /></div>
      </div>

      <div style={box}>
        <h3 style={{ marginBottom: 12 }}>Ajustez et prévisualisez</h3>
        <label style={lbl}>Title<input style={inp} value={title} onChange={(e) => setTitle(e.target.value)} /></label>
        <Gauge label="Title" width={wT} max={TITLE_MAX} />
        <Badges checks={runChecks(title, k, wT, TITLE_MAX, true)} />
        <label style={{ ...lbl, marginTop: 16 }}>Meta description<textarea style={{ ...inp, minHeight: 80, resize: "vertical" }} value={desc} onChange={(e) => setDesc(e.target.value)} /></label>
        <Gauge label="Meta description" width={wD} max={DESC_MAX} />
        <Badges checks={runChecks(desc, k, wD, DESC_MAX, false)} />

        <div style={{ background: "#fff", color: "#202124", borderRadius: 12, padding: "16px 18px", marginTop: 18, fontFamily: "arial, sans-serif" }}>
          <div style={{ fontSize: 12, color: "#4d5156" }}>{site}</div>
          <div style={{ fontSize: 20, color: "#1a0dab", lineHeight: 1.3, margin: "4px 0" }}>{truncate(title, TITLE_FONT, TITLE_MAX) || "Votre title ici"}</div>
          <div style={{ fontSize: 14, color: "#4d5156", lineHeight: 1.58 }}>{truncate(desc, DESC_FONT, DESC_MAX) || "Votre meta description ici."}</div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <button type="button" style={btn} onClick={() => copy(title, "t")}>{copied === "t" ? "Copié ✓" : "Copier le title"}</button>
          <button type="button" style={btn} onClick={() => copy(desc, "d")}>{copied === "d" ? "Copié ✓" : "Copier la meta"}</button>
          <button type="button" style={btn} onClick={() => copy(html, "h")}>{copied === "h" ? "Copié ✓" : "Copier le HTML"}</button>
        </div>
        <pre style={{ marginTop: 12, fontSize: 12, whiteSpace: "pre-wrap", opacity: 0.8 }}>{html}</pre>
      </div>
    </div>
  );
}
