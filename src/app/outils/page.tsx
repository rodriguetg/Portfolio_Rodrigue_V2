import type { Metadata } from "next";

const desc =
  "Outils SEO gratuits : simulateur SERP avec mesure en pixels, audit SEO express et générateur de balises title & meta. Sans inscription, résultats immédiats.";

export const metadata: Metadata = {
  title: "Outils SEO gratuits | Rodrigue GBADOU",
  description: desc,
  alternates: { canonical: "/outils" },
  openGraph: { title: "Outils SEO gratuits | Rodrigue GBADOU", description: desc, url: "https://rodespe.com/outils" },
};

export default function OutilsPage() {
  return (
    <main className="wrap">
      <div className="tool-head">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Outils gratuits</span>
        <h1>Le <span className="grad">labo SEO</span></h1>
        <p>
          Des outils que j&apos;ai construits et que j&apos;utilise. Pas d&apos;inscription, pas de limite
          artificielle, juste des résultats. Chaque outil est aussi une démo de ce que je peux automatiser pour vous.
        </p>
      </div>
      <div className="cards c3" style={{ maxWidth: 1000, margin: "0 auto", paddingBottom: "8vh" }}>
        <a className="card" href="/outils/simulateur-serp">
          <span className="go">↗</span>
          <span className="ico">🔍</span>
          <h3>Simulateur SERP</h3>
          <p>Prévisualisez votre résultat Google en temps réel : largeur en pixels, troncature, aperçu desktop. Écrivez des titles qui ne se font pas couper.</p>
          <span className="tag" style={{ marginTop: 14 }}>100% client · instantané</span>
        </a>
        <a className="card" href="/outils/audit-seo">
          <span className="go">↗</span>
          <span className="ico">⚡</span>
          <h3>Audit SEO express</h3>
          <p>Collez une URL, obtenez un score /100 en 30 secondes : balises, indexabilité, performance PageSpeed et les corrections prioritaires.</p>
          <span className="tag" style={{ marginTop: 14 }}>14 vérifications · gratuit</span>
        </a>
        <a className="card" href="/outils/generateur-schema">
          <span className="go">↗</span>
          <span className="ico">🧩</span>
          <h3>Générateur Schema.org</h3>
          <p>FAQ, entreprise locale, article, fil d&apos;Ariane : le JSON-LD se génère en direct, prêt à coller pour viser les résultats enrichis Google.</p>
          <span className="tag" style={{ marginTop: 14 }}>4 types · gratuit</span>
        </a>
        <div className="card is-soon" aria-disabled="true">
          <span className="ico">🤖</span>
          <h3>Générateur title &amp; meta<span className="soon">BIENTÔT</span></h3>
          <p>Un mot-clé, un type de page : trois propositions de balises optimisées, générées par IA et calibrées à la bonne longueur.</p>
          <span className="tag" style={{ marginTop: 14 }}>En construction</span>
        </div>
      </div>
    </main>
  );
}
