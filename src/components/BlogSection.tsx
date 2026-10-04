import { getBlogPosts, formatPostDate } from "@/lib/blog";

// Section accueil : 3 derniers articles d'ai.rodespe.com. Masquée si le flux est vide/indisponible.
export default async function BlogSection() {
  const posts = await getBlogPosts(3);
  if (posts.length === 0) return null;
  return (
    <section className="wrap section" id="blog">
      <div className="section-head reveal">
        <span className="eyebrow">Blog</span>
        <h2>Les derniers <span className="grad">articles</span></h2>
        <p>Publiés sur ai.rodespe.com, mon pipeline de contenu automatisé, et remontés ici via l&apos;API WordPress.</p>
      </div>
      <div className="cards c3 reveal">
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
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <a className="btn btn-ghost" href="/blog">Tous les articles →</a>
      </div>
    </section>
  );
}
