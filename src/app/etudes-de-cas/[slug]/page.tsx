import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return {};
  return {
    title: `${cs.title} : Étude de Cas | Rodrigue GBADOU`,
    description: cs.subtitle,
    alternates: { canonical: `/etudes-de-cas/${cs.slug}` },
  };
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();
  return (
    <main>
      <section className="wrap page-head">
        <div className="breadcrumb"><a href="/etudes-de-cas">← Retour aux projets</a></div>
        <h1 dangerouslySetInnerHTML={{ __html: cs.title.replace(/(\S+)\s*$/, '<span class="grad">$1</span>') }} />
        <p>{cs.subtitle}</p>
        <div className="cs-meta" style={{ marginTop: 22 }}>
          {cs.technologies.map((t) => <span className="badge" key={t}>{t}</span>)}
        </div>
      </section>

      <div className="wrap">
        <img className="cs-hero-img reveal" src={cs.image} alt={cs.title} loading="lazy" />
        <section className="cs-section reveal" style={{ borderTop: 0 }}>
          <div className="cs-stats">
            {cs.stats.map((s) => (
              <div className="cs-stat" key={s.label}><div className="n">{s.value}</div><div className="k">{s.label}</div></div>
            ))}
          </div>
        </section>
        <section className="cs-section reveal"><h2>Le Défi</h2><p>{cs.challenge}</p></section>
        <section className="cs-section reveal"><h2>La Solution</h2><p>{cs.solution}</p></section>
        <section className="cs-section reveal">
          <h2>Comment ça marche ?</h2>
          <div className="steps">
            {cs.process.map((st) => (
              <div className="step" key={st.title}><h4>{st.title}</h4><p>{st.description}</p></div>
            ))}
          </div>
        </section>
        <section className="cs-section reveal faq">
          <h2>Questions Fréquentes</h2>
          {cs.faq.map((f) => (
            <details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>
          ))}
        </section>
      </div>

      <div className="wrap">
        <div className="cta-band reveal">
          <h2>Intéressé par ce workflow ?</h2>
          <p>Installation plug & play · Documentation incluse · Support de mise en place.</p>
          <span className="shine"><a href="/#contact">Télécharger le blueprint</a></span>
        </div>
      </div>
    </main>
  );
}
