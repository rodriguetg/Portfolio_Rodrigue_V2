import type { Metadata } from "next";
import SchemaGenerator from "@/components/SchemaGenerator";

const desc =
  "Générateur de données structurées Schema.org gratuit : FAQ, entreprise locale, article, fil d'Ariane. JSON-LD généré en direct, prêt à coller dans votre page pour obtenir des résultats enrichis Google.";

export const metadata: Metadata = {
  title: "Générateur Schema.org gratuit : FAQ, LocalBusiness, Article | Rodrigue GBADOU",
  description: desc,
  alternates: { canonical: "/outils/generateur-schema" },
  openGraph: {
    title: "Générateur Schema.org gratuit | Rodrigue GBADOU",
    description: desc,
    url: "https://rodespe.com/outils/generateur-schema",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Générateur Schema.org",
  url: "https://rodespe.com/outils/generateur-schema",
  applicationCategory: "SEOApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: { "@id": "https://rodespe.com/#person" },
};

export default function SchemaPage() {
  return (
    <main className="wrap tool-shell" style={{ paddingBottom: "8vh" }}>
      <div className="tool-head">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Outil gratuit</span>
        <h1>Générateur <span className="grad">Schema.org</span></h1>
        <p>
          Remplissez le formulaire, le JSON-LD se génère en direct. Copiez, collez dans votre page,
          et visez les résultats enrichis Google.
        </p>
      </div>
      <SchemaGenerator />
      <p className="tool-note" style={{ marginTop: 26 }}>
        Besoin d&apos;un balisage plus poussé (produits, avis, événements) ou déployé sur des centaines de pages ?{" "}
        <a href="/#contact" style={{ color: "var(--accent2)" }}>Parlons-en</a>.
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
