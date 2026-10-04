import type { Metadata } from "next";
import TitleMetaGenerator from "@/components/TitleMetaGenerator";

const desc =
  "Générateur de balises title et meta description gratuit : un mot-clé, un type de page, des propositions calibrées en pixels avec aperçu Google et contrôles SEO.";

export const metadata: Metadata = {
  title: "Générateur title & meta description gratuit | Rodrigue GBADOU",
  description: desc,
  alternates: { canonical: "/outils/generateur-title-meta" },
  openGraph: {
    title: "Générateur title & meta gratuit | Rodrigue GBADOU",
    description: desc,
    url: "https://rodespe.com/outils/generateur-title-meta",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Générateur title & meta description",
  url: "https://rodespe.com/outils/generateur-title-meta",
  applicationCategory: "SEOApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: { "@id": "https://rodespe.com/#person" },
};

export default function TitleMetaPage() {
  return (
    <main className="wrap tool-shell" style={{ paddingBottom: "8vh" }}>
      <div className="tool-head">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Outil gratuit</span>
        <h1>Générateur <span className="grad">title &amp; meta</span></h1>
        <p>Un mot-clé, un type de page : des propositions de balises calibrées en pixels, vérifiées et prêtes à copier.</p>
      </div>
      <TitleMetaGenerator />
      <p className="tool-note" style={{ marginTop: 26 }}>
        Un besoin SEO plus large ? <a href="/#contact" style={{ color: "var(--accent2)" }}>Parlons-en, 30 min gratuites</a>.
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
