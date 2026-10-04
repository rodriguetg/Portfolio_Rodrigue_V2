import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteScripts from "@/components/SiteScripts";

const desc =
  "Portfolio de Rodrigue GBADOU, SEO/GEO & Marketing Automation. SEO/GEO, automatisation no code, intégrations API et IA.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rodespe.com"),
  title: "Rodrigue GBADOU, SEO/GEO & Marketing Automation | Paris",
  description: desc,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rodrigue GBADOU, SEO/GEO & Marketing Automation | Paris",
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
  verification: { google: "-rSQUZNJjSMhVqP7-8BNBxD777MMHU_OY-6zOlrVdek" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://rodespe.com/#person",
      name: "Rodrigue GBADOU",
      url: "https://rodespe.com",
      image: "https://rodespe.com/rodrigue-gbadou.webp",
      jobTitle: "SEO/GEO & Marketing Automation",
      email: "mailto:rodrigue.gbadou@gmail.com",
      description: desc,
      address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
      knowsAbout: [
        "SEO technique", "SEO programmatique", "Automatisation no-code", "n8n", "Make", "Zapier",
        "AirOps", "Intégrations API", "IA générative", "Model Context Protocol", "TypeScript",
        "Python", "WordPress", "Docker", "Web scraping",
      ],
      sameAs: [
        "https://www.linkedin.com/in/rodrigue-gbadou/",
        "https://github.com/rodriguetg",
        "https://x.com/EsperantRodrigu",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://rodespe.com/#website",
      url: "https://rodespe.com",
      name: "Rodrigue GBADOU Portfolio",
      inLanguage: "fr-FR",
      publisher: { "@id": "https://rodespe.com/#person" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
          <head>
      <link rel="preload" as="image" href="/rodrigue-gbadou.webp" type="image/webp" fetchPriority="high" />
      <link rel="alternate" type="text/markdown" href="/llms.txt" />
      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preload" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" as="style" />
      <script
        dangerouslySetInnerHTML={{
          __html: "var l=document.createElement('link');l.rel='stylesheet';l.href='https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap';document.head.appendChild(l);",
        }}
      />
      <noscript><link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" /></noscript>
    </head>
    <body id="top">
        <a href="#main-content" className="skip-link">Aller au contenu</a>
        <canvas id="canvas" />
        <div className="grid-bg" />
        <div className="top-glow" />
        <Nav />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <Footer />
        <SiteScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics 4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZZ8NVXV9RS" strategy="lazyOnload" />
        <Script id="ga4" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZZ8NVXV9RS');`}
        </Script>
      </body>
    </html>
  );
}
