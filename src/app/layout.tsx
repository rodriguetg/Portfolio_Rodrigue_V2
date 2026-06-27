import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteScripts from "@/components/SiteScripts";

const desc =
  "Portfolio de Rodrigue GBADOU, Marketing Automation Engineer. SEO technique, automatisation no code, intégrations API et IA.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rodespe.com"),
  title: "Rodrigue GBADOU, Marketing Automation Engineer | Paris",
  description: desc,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rodrigue GBADOU, Marketing Automation Engineer | Paris",
    description: desc,
    url: "https://rodespe.com",
    siteName: "Rodrigue GBADOU Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@EsperantRodrigu",
    creator: "@EsperantRodrigu",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body id="top">
        <canvas id="canvas" />
        <div className="grid-bg" />
        <div className="top-glow" />
        <Nav />
        {children}
        <Footer />
        <SiteScripts />
      </body>
    </html>
  );
}
