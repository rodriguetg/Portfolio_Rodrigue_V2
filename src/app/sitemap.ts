import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rodespe.com";
  const lastModified = new Date();
  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/outils`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/outils/simulateur-serp`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/outils/audit-seo`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/outils/generateur-schema`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/outils/generateur-title-meta`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/outils/checker-geo`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/etudes-de-cas`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudies.map((c) => ({
      url: `${base}/etudes-de-cas/${c.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
