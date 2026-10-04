import type { Metadata } from "next";
import { getBlogPosts, formatPostDate } from "@/lib/blog";

const desc =
  "Journal d'automatisation : SEO technique, workflows n8n, IA et marketing automation. Articles publiés sur ai.rodespe.com.";

export const metadata: Metadata = {
  title: "Blog : SEO, automatisation & IA | Rodrigue GBADOU",
  description: desc,
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog : SEO, automatisation & IA | Rodrigue GBADOU", description: desc, url: "https://rodespe.com/blog" },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts(12);
  return (
    <main className="wrap" style={{ paddingBottom: "8vh" }}>
      <div className="tool-head">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Blog</span>
        <h1>Journal d&apos;<span className="grad">automatisation</span></h1>
        <p>
          Les articles sont publiés sur <b style={{ color: "var(--ink)" }}>ai.rodespe.com</b>, mon pipeline
          de contenu automatisé (n8n + WordPress + IA), et remontés ici automatiquement. Une seule source, deux vitrines.
        </p>
      </div>
      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--mut)" }}>
          Le flux est momentanément indisponible. Retrouvez tous les articles sur{" "}
          <a href="https://ai.rodespe.com" target="_blank" rel="noopener" style={{ color: "var(--accent2)" }}>ai.rodespe.com</a>.
        </p>
      ) : (
        <div className="cards c3">
          {posts.map((p) => (
            <a className="card blog-card" href={p.link} target="_blank" rel="noopener" key={p.id}>
              <span className="go">↗</span>
              <div className="bmeta">
                {p.category && (<><span className="cat">{p.category}</span><span>·</span></>)}
                <span>{formatPostDate(p.date)}</span>
              </div>
              <h3 style={{ fontSize: 19 }}>{p.title}</h3>
              <p>{p.excerpt}</p>
            </a>
          ))}
        </div>
      )}
      <div className="blog-src">
        <span>Ce blog tourne tout seul : contenu généré et publié par un workflow n8n, servi ici en ISR. <a href="/etudes-de-cas/blog-content-automation" style={{ color: "var(--accent2)" }}>Voir comment ça marche →</a></span>
      </div>
    </main>
  );
}
