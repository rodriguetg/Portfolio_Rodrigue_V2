"use client";

import { useMemo, useState } from "react";

type SchemaType = "faq" | "local" | "article" | "breadcrumb";

const TYPES: { key: SchemaType; label: string }[] = [
  { key: "faq", label: "FAQ" },
  { key: "local", label: "Entreprise locale" },
  { key: "article", label: "Article" },
  { key: "breadcrumb", label: "Fil d'Ariane" },
];

const BUSINESS_TYPES = [
  "LocalBusiness", "Restaurant", "Store", "ProfessionalService", "MedicalBusiness",
  "HomeAndConstructionBusiness", "AutoRepair", "BeautySalon", "RealEstateAgent",
];

export default function SchemaGenerator() {
  const [type, setType] = useState<SchemaType>("faq");
  const [copied, setCopied] = useState(false);

  // FAQ
  const [faqs, setFaqs] = useState([{ q: "Quels sont vos délais de livraison ?", a: "Comptez 2 à 3 jours ouvrés en France métropolitaine." }]);
  // LocalBusiness
  const [biz, setBiz] = useState({ btype: "LocalBusiness", name: "", street: "", city: "", zip: "", phone: "", url: "", hours: "" });
  // Article
  const [art, setArt] = useState({ headline: "", description: "", author: "", publisher: "", date: "", image: "", url: "" });
  // Breadcrumb
  const [crumbs, setCrumbs] = useState([{ name: "Accueil", url: "https://exemple.fr/" }, { name: "", url: "" }]);

  const json = useMemo(() => {
    const clean = (o: Record<string, unknown>) =>
      Object.fromEntries(Object.entries(o).filter(([, v]) => v !== "" && v !== null && v !== undefined));

    let data: Record<string, unknown>;
    if (type === "faq") {
      data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs
          .filter((f) => f.q.trim() && f.a.trim())
          .map((f) => ({
            "@type": "Question",
            name: f.q.trim(),
            acceptedAnswer: { "@type": "Answer", text: f.a.trim() },
          })),
      };
    } else if (type === "local") {
      data = clean({
        "@context": "https://schema.org",
        "@type": biz.btype,
        name: biz.name,
        telephone: biz.phone,
        url: biz.url,
        openingHours: biz.hours,
        address: clean({
          "@type": "PostalAddress",
          streetAddress: biz.street,
          addressLocality: biz.city,
          postalCode: biz.zip,
          addressCountry: "FR",
        }),
      });
    } else if (type === "article") {
      data = clean({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: art.headline,
        description: art.description,
        image: art.image,
        url: art.url,
        datePublished: art.date,
        author: art.author ? { "@type": "Person", name: art.author } : "",
        publisher: art.publisher ? { "@type": "Organization", name: art.publisher } : "",
      });
    } else {
      data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs
          .filter((c) => c.name.trim() && c.url.trim())
          .map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name.trim(), item: c.url.trim() })),
      };
    }
    return JSON.stringify(data, null, 2);
  }, [type, faqs, biz, art, crumbs]);

  const snippet = `<script type="application/ld+json">\n${json}\n</script>`;

  function copy() {
    navigator.clipboard?.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div>
      <div className="sg-tabs">
        {TYPES.map((t) => (
          <button key={t.key} className={type === t.key ? "on" : ""} onClick={() => setType(t.key)}>{t.label}</button>
        ))}
      </div>

      <div className="sg-grid">
        <div className="panel">
          {type === "faq" && (
            <>
              {faqs.map((f, i) => (
                <div key={i} className="sg-block">
                  <div className="field">
                    <label htmlFor={`q${i}`}>Question {i + 1}</label>
                    <input id={`q${i}`} value={f.q} onChange={(e) => setFaqs(faqs.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} />
                  </div>
                  <div className="field">
                    <label htmlFor={`a${i}`}>Réponse {i + 1}</label>
                    <textarea id={`a${i}`} rows={2} value={f.a} onChange={(e) => setFaqs(faqs.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))} />
                  </div>
                  {faqs.length > 1 && (
                    <button className="sg-remove" onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}>Supprimer cette question</button>
                  )}
                </div>
              ))}
              <button className="btn btn-ghost sg-add" onClick={() => setFaqs([...faqs, { q: "", a: "" }])}>+ Ajouter une question</button>
            </>
          )}

          {type === "local" && (
            <>
              <div className="field"><label htmlFor="bt">Type d&apos;activité</label>
                <select id="bt" value={biz.btype} onChange={(e) => setBiz({ ...biz, btype: e.target.value })}>
                  {BUSINESS_TYPES.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="field"><label htmlFor="bn">Nom de l&apos;entreprise</label><input id="bn" placeholder="Boulangerie Martin" value={biz.name} onChange={(e) => setBiz({ ...biz, name: e.target.value })} /></div>
              <div className="field"><label htmlFor="bs">Adresse</label><input id="bs" placeholder="12 rue de la République" value={biz.street} onChange={(e) => setBiz({ ...biz, street: e.target.value })} /></div>
              <div className="sg-row">
                <div className="field"><label htmlFor="bz">Code postal</label><input id="bz" placeholder="45000" value={biz.zip} onChange={(e) => setBiz({ ...biz, zip: e.target.value })} /></div>
                <div className="field"><label htmlFor="bc">Ville</label><input id="bc" placeholder="Orléans" value={biz.city} onChange={(e) => setBiz({ ...biz, city: e.target.value })} /></div>
              </div>
              <div className="sg-row">
                <div className="field"><label htmlFor="bp">Téléphone</label><input id="bp" placeholder="+33 2 38 00 00 00" value={biz.phone} onChange={(e) => setBiz({ ...biz, phone: e.target.value })} /></div>
                <div className="field"><label htmlFor="bu">Site web</label><input id="bu" placeholder="https://exemple.fr" value={biz.url} onChange={(e) => setBiz({ ...biz, url: e.target.value })} /></div>
              </div>
              <div className="field"><label htmlFor="bh">Horaires (format Schema.org, optionnel)</label><input id="bh" placeholder="Mo-Fr 09:00-19:00" value={biz.hours} onChange={(e) => setBiz({ ...biz, hours: e.target.value })} /></div>
            </>
          )}

          {type === "article" && (
            <>
              <div className="field"><label htmlFor="ah">Titre de l&apos;article</label><input id="ah" placeholder="Comment automatiser sa veille SEO" value={art.headline} onChange={(e) => setArt({ ...art, headline: e.target.value })} /></div>
              <div className="field"><label htmlFor="ad">Description</label><textarea id="ad" rows={2} placeholder="Résumé de l'article en une ou deux phrases." value={art.description} onChange={(e) => setArt({ ...art, description: e.target.value })} /></div>
              <div className="sg-row">
                <div className="field"><label htmlFor="aa">Auteur</label><input id="aa" placeholder="Rodrigue GBADOU" value={art.author} onChange={(e) => setArt({ ...art, author: e.target.value })} /></div>
                <div className="field"><label htmlFor="ap">Éditeur (site)</label><input id="ap" placeholder="rodespe.com" value={art.publisher} onChange={(e) => setArt({ ...art, publisher: e.target.value })} /></div>
              </div>
              <div className="sg-row">
                <div className="field"><label htmlFor="adt">Date de publication</label><input id="adt" type="date" value={art.date} onChange={(e) => setArt({ ...art, date: e.target.value })} /></div>
                <div className="field"><label htmlFor="au">URL de l&apos;article</label><input id="au" placeholder="https://exemple.fr/article" value={art.url} onChange={(e) => setArt({ ...art, url: e.target.value })} /></div>
              </div>
              <div className="field"><label htmlFor="ai">Image (URL, optionnel)</label><input id="ai" placeholder="https://exemple.fr/cover.jpg" value={art.image} onChange={(e) => setArt({ ...art, image: e.target.value })} /></div>
            </>
          )}

          {type === "breadcrumb" && (
            <>
              {crumbs.map((c, i) => (
                <div key={i} className="sg-row">
                  <div className="field"><label htmlFor={`cn${i}`}>Niveau {i + 1} — nom</label><input id={`cn${i}`} placeholder="Catégorie" value={c.name} onChange={(e) => setCrumbs(crumbs.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} /></div>
                  <div className="field"><label htmlFor={`cu${i}`}>URL</label><input id={`cu${i}`} placeholder="https://exemple.fr/categorie" value={c.url} onChange={(e) => setCrumbs(crumbs.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))} /></div>
                  {crumbs.length > 2 && (
                    <button className="sg-remove" style={{ alignSelf: "center" }} onClick={() => setCrumbs(crumbs.filter((_, j) => j !== i))}>✕</button>
                  )}
                </div>
              ))}
              <button className="btn btn-ghost sg-add" onClick={() => setCrumbs([...crumbs, { name: "", url: "" }])}>+ Ajouter un niveau</button>
            </>
          )}
        </div>

        <div>
          <pre className="sg-code" aria-live="polite">{snippet}</pre>
          <div className="sg-actions">
            <span className="shine"><button onClick={copy}>{copied ? "✓ Copié !" : "Copier le code"}</button></span>
            <a className="btn btn-ghost" href={`https://search.google.com/test/rich-results`} target="_blank" rel="noopener">Tester dans Google ↗</a>
          </div>
          <p className="tool-note">Collez ce bloc dans le <code>&lt;head&gt;</code> de votre page (ou via votre plugin SEO). Google peut alors afficher un résultat enrichi.</p>
        </div>
      </div>
    </div>
  );
}
