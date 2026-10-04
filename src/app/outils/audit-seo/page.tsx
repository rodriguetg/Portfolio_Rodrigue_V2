import type { Metadata } from "next";
import AuditTool from "@/components/AuditTool";

const desc =
  "Audit SEO express gratuit : collez une URL et obtenez un score sur 100 en 30 secondes — balises, indexabilité, robots.txt, sitemap et performance PageSpeed, avec les corrections prioritaires.";

export const metadata: Metadata = {
  title: "Audit SEO gratuit : score /100 en 30 s | Rodrigue GBADOU",
  description: desc,
  alternates: { canonical: "/outils/audit-seo" },
  openGraph: {
    title: "Audit SEO express gratuit | Rodrigue GBADOU",
    description: desc,
    url: "https://rodespe.com/outils/audit-seo",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Audit SEO express",
  url: "https://rodespe.com/outils/audit-seo",
  applicationCategory: "SEOApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: { "@id": "https://rodespe.com/#person" },
};

export default function AuditPage() {
  return (
    <main className="wrap tool-shell" style={{ paddingBottom: "8vh", maxWidth: 860 }}>
      <div className="tool-head">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Outil gratuit</span>
        <h1>Audit SEO <span className="grad">express</span></h1>
        <p>
          Collez l&apos;URL de votre site. En 30 secondes : un score sur 100, les points qui bloquent,
          et par quoi commencer.
        </p>
      </div>
      <AuditTool />
      <p className="tool-note" style={{ marginTop: 16 }}>
        14 vérifications : balises title et description, H1, indexabilité, canonical, Open Graph, données structurées,
        attributs alt, robots.txt, sitemap, HTTPS et performance mobile via l&apos;API PageSpeed Insights.
        Limité à 6 audits par heure. Aucune donnée conservée.
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
