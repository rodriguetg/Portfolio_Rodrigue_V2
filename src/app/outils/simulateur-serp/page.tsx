import type { Metadata } from "next";
import SerpSimulator from "@/components/SerpSimulator";

const desc =
  "Simulateur SERP gratuit : prévisualisez votre résultat Google en temps réel avec la largeur en pixels de vos balises title et meta description. Évitez la troncature.";

export const metadata: Metadata = {
  title: "Simulateur SERP gratuit : testez vos balises title & meta | Rodrigue GBADOU",
  description: desc,
  alternates: { canonical: "/outils/simulateur-serp" },
  openGraph: {
    title: "Simulateur SERP gratuit | Rodrigue GBADOU",
    description: desc,
    url: "https://rodespe.com/outils/simulateur-serp",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Simulateur SERP",
  url: "https://rodespe.com/outils/simulateur-serp",
  applicationCategory: "SEOApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: { "@id": "https://rodespe.com/#person" },
};

export default function SerpPage() {
  return (
    <main className="wrap tool-shell" style={{ paddingBottom: "8vh" }}>
      <div className="tool-head">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Outil gratuit</span>
        <h1>Simulateur <span className="grad">SERP</span></h1>
        <p>
          Écrivez, l&apos;aperçu Google se met à jour en direct. La jauge vous dit quand ça dépasse,
          en pixels, pas en caractères.
        </p>
      </div>
      <SerpSimulator />
      <p className="tool-note" style={{ marginTop: 26 }}>
        Un besoin SEO plus large ? <a href="/#contact" style={{ color: "var(--accent2)" }}>Parlons-en, 30 min gratuites</a>.
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
