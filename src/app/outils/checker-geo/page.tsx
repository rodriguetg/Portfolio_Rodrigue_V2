import type { Metadata } from "next";
import GeoChecker from "@/components/GeoChecker";

const desc =
  "Checker GEO gratuit : vérifiez si ChatGPT, Claude, Perplexity et les moteurs IA peuvent lire et citer votre page (robots.txt, llms.txt, JSON-LD, contenu sans JavaScript).";

export const metadata: Metadata = {
  title: "Checker de visibilité IA (GEO) gratuit | Rodrigue GBADOU",
  description: desc,
  alternates: { canonical: "/outils/checker-geo" },
  openGraph: {
    title: "Checker de visibilité IA (GEO) | Rodrigue GBADOU",
    description: desc,
    url: "https://rodespe.com/outils/checker-geo",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Checker de visibilité IA (GEO)",
  url: "https://rodespe.com/outils/checker-geo",
  applicationCategory: "SEOApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: { "@id": "https://rodespe.com/#person" },
};

export default function GeoPage() {
  return (
    <main className="wrap tool-shell" style={{ paddingBottom: "8vh" }}>
      <div className="tool-head">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Outil gratuit</span>
        <h1>Checker <span className="grad">visibilité IA</span></h1>
        <p>Votre page est-elle lisible et citable par ChatGPT, Claude ou Perplexity ? 10 contrôles GEO en quelques secondes.</p>
      </div>
      <GeoChecker />
      <p className="tool-note" style={{ marginTop: 26 }}>
        Envie d&apos;aller plus loin sur le GEO ? <a href="/#contact" style={{ color: "var(--accent2)" }}>Parlons-en, 30 min gratuites</a>.
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
