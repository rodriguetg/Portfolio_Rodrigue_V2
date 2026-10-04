// Blog : articles publiés sur ai.rodespe.com (WordPress), remontés via l'API REST.
// Une seule source de contenu, deux vitrines. Fallback silencieux si le flux est indisponible.

export type BlogPost = {
  id: number;
  title: string;
  link: string;
  date: string; // ISO
  excerpt: string;
  category: string | null;
};

const API =
  "https://ai.rodespe.com/wp-json/wp/v2/posts?_embed=wp:term&_fields=id,date,link,title,excerpt,_links,_embedded";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&rsquo;|&#8217;/g, "’")
    .replace(/&lsquo;|&#8216;/g, "‘")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;|\[&hellip;\]|\[…\]/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API}&per_page=${limit}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as any[];
    return data.map((p) => {
      const terms: any[] = p?._embedded?.["wp:term"]?.flat?.() ?? [];
      const cat = terms.find((t) => t?.taxonomy === "category" && t?.name !== "Uncategorized" && t?.name !== "Non classé");
      const excerpt = stripHtml(p?.excerpt?.rendered ?? "");
      return {
        id: p.id,
        title: stripHtml(p?.title?.rendered ?? ""),
        link: p.link,
        date: p.date,
        excerpt: excerpt.length > 180 ? excerpt.slice(0, 177).trimEnd() + "…" : excerpt,
        category: cat?.name ?? null,
      };
    });
  } catch {
    return [];
  }
}

export function formatPostDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}
