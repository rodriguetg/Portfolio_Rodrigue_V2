import type { Metadata } from "next";
import { caseStudies } from "@/data/caseStudies";

export const metadata: Metadata = {
  title: "Études de Cas : Workflows & Automatisations | Rodrigue GBADOU",
  description: "Plongez dans mes workflows automatisés, le développement de bots et l'intégration de systèmes complexes.",
  alternates: { canonical: "/etudes-de-cas" },
};

export default function CaseStudiesIndex() {
  return (
    <main>
      <section className="wrap page-head">
        <div className="breadcrumb"><a href="/">Accueil</a> <span>/</span> <span>Études de Cas</span></div>
        <h1>Études de <span className="grad">Cas</span></h1>
        <p>Plongez dans mes workflows automatisés, le développement de bots et l'intégration de systèmes complexes.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: "9vh" }}>
        <div className="proj-grid reveal">
          {caseStudies.map((c, i) => (
            <a className="proj-card" href={`/etudes-de-cas/${c.slug}`} key={c.slug}>
              <div className="proj-thumb" style={{ backgroundImage: `url('${c.image}')` }}>
                <span className="cat-badge">Case Study</span>
                <span className="mark">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="proj-body">
                <div className="chips" style={{ margin: "0 0 12px" }}>
                  {c.technologies.slice(0, 3).map((t) => <span className="chip" key={t}>{t}</span>)}
                </div>
                <h3>{c.title}</h3>
                <p>{c.excerpt}</p>
                <span style={{ display: "inline-block", marginTop: 14, color: "var(--accent2)", fontWeight: 600, fontSize: 14 }}>Voir l'étude de cas →</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
