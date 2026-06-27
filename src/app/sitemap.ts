import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rodespe.com";
  return [
    { url: base, priority: 1 },
    { url: `${base}/etudes-de-cas`, priority: 0.8 },
    ...caseStudies.map((c) => ({ url: `${base}/etudes-de-cas/${c.slug}`, priority: 0.6 })),
  ];
}
