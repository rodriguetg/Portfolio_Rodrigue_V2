import {
  personalInfo, aboutParagraphs, certifications, projects, projectFilters,
  experiences, techSkills, softSkills,
} from "@/data/site";

function cloudSize(level: number) {
  if (level >= 90) return "s4";
  if (level >= 85) return "s3";
  if (level >= 80) return "s2";
  return "s1";
}

export default function Home() {
  const { socials, email, phone } = personalInfo;
  return (
    <main>
      {/* HERO */}
      <section className="wrap hero">
        <span className="badge"><span className="live" />Disponible : CDI ou CDD en marketing automation</span>
        <p style={{ color: "var(--mut)", fontSize: 16, marginTop: 26 }}>Bonjour, je suis</p>
        <div className="frame">
          <span className="plus p1" /><span className="plus p2" /><span className="plus p3" /><span className="plus p4" />
          <h1>{personalInfo.name}<br /><span className="grad" style={{ fontSize: ".62em" }}>{personalInfo.title}</span></h1>
        </div>
        <p className="intro">{personalInfo.bio}</p>
        <div className="cta">
          <span className="shine"><a href="/outils">🧰 Essayer mes outils SEO gratuits</a></span>
          <a className="btn btn-ghost" href="#contact">Me contacter</a>
        </div>
        <div className="tools-strip">
          <a className="tchip" href="/outils/simulateur-serp">🔍 Simulateur SERP</a>
          <a className="tchip" href="/outils/audit-seo">⚡ Audit SEO express</a>
          <a className="tchip" href="/outils">🤖 Générateur title &amp; meta</a>
        </div>
        <a href="#outils" style={{ marginTop: 54, color: "var(--mut)", fontSize: 12, letterSpacing: ".2em", textDecoration: "none" }}>DÉCOUVRIR ↓</a>
      </section>

      {/* OUTILS SEO */}
      <section className="wrap section" id="outils">
        <div className="section-head reveal">
          <span className="eyebrow">Nouveau</span>
          <h2>Des outils SEO <span className="grad">gratuits</span>, pas juste des promesses</h2>
          <p>Le meilleur moyen de montrer ce que je fais, c&apos;est de vous laisser l&apos;essayer. Sans inscription, résultats immédiats.</p>
        </div>
        <div className="cards c3 reveal">
          <a className="card" href="/outils/simulateur-serp">
            <span className="go">↗</span>
            <span className="ico">🔍</span>
            <h3>Simulateur SERP</h3>
            <p>Prévisualisez votre résultat Google en temps réel. Largeur en pixels, troncature, aperçu desktop.</p>
            <span className="tag" style={{ marginTop: 14 }}>Disponible</span>
          </a>
          <a className="card" href="/outils/audit-seo">
            <span className="go">↗</span>
            <span className="ico">⚡</span>
            <h3>Audit SEO express</h3>
            <p>Collez une URL, obtenez un score /100 en 30 secondes : balises, indexabilité, performance PageSpeed.</p>
            <span className="tag" style={{ marginTop: 14 }}>Disponible</span>
          </a>
          <a className="card" href="/outils/generateur-title-meta">
            <span className="go">↗</span>
            <span className="ico">🤖</span>
            <h3>Générateur title &amp; meta</h3>
            <p>Un mot-clé, un type de page : des titles et metas calibrés en pixels, vérifiés et prêts à copier.</p>
            <span className="tag" style={{ marginTop: 14 }}>Disponible</span>
          </a>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="wrap section" id="certifications">
        <div className="section-head reveal">
          <span className="eyebrow">Reconnaissance Professionnelle</span>
          <h2>Mes <span className="grad">Certifications</span></h2>
          <p>Validation continue de mes compétences à travers des formations reconnues. Ces certifications renforcent mon profil pour un poste en marketing digital et automatisation.</p>
        </div>
        <div className="reveal">
          {certifications.filter((c) => c.featured).map((c) => (
            <div className="cert-feature" style={{ marginBottom: 16 }} key={c.title}>
              <span className="flogo"><img src={c.logo} alt={c.issuer} /></span>
              <span className="star">★ Featured · {c.date}</span>
              <div><h3>{c.title}</h3><p>{c.description}</p></div>
              <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
                <a className="btn btn-ghost" href={c.url} target="_blank" rel="noopener" style={{ padding: "10px 18px", fontSize: 14 }}>Voir les détails</a>
                <a className="btn btn-ghost" href={c.url} target="_blank" rel="noopener" style={{ padding: "10px 18px", fontSize: 14 }}>Lien direct ↗</a>
              </div>
            </div>
          ))}
          <div className="cards c3">
            {certifications.filter((c) => !c.featured).map((c) => (
              <a className="cert" href={c.url} target="_blank" rel="noopener" style={{ textDecoration: "none", color: "inherit" }} key={c.title}>
                <div className="ic mono">{c.issuer.charAt(0)}</div>
                <b>{c.title}</b><span>{c.issuer} · {c.date}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section className="wrap section" id="projets">
        <div className="section-head reveal">
          <span className="eyebrow">Portfolio</span>
          <h2>Projets <span className="grad">Réalisés</span></h2>
          <p>Une sélection de mes travaux récents en automatisation, SEO et développement web.</p>
        </div>
        <div className="filters reveal">
          {projectFilters.map((f, i) => (
            <button className={"filter" + (i === 0 ? " active" : "")} data-pfilter={f.key} key={f.key}>{f.label}</button>
          ))}
        </div>
        <div className="proj-grid reveal">
          {projects.map((p, i) => {
            const inner = (
              <>
                <div className="proj-thumb" style={{ backgroundImage: `url('${p.image}')` }}>
                  <span className="cat-badge">{p.category}</span>
                  <span className="mark">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="proj-body">
                  <h3>{p.title}</h3><p>{p.description}</p>
                  <div className="chips">{p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
                </div>
              </>
            );
            return p.caseStudy ? (
              <a className="proj-card" data-cat={p.cat} href={`/etudes-de-cas/${p.caseStudy}`} key={p.title}>{inner}</a>
            ) : (
              <a className="proj-card" data-cat={p.cat} href={p.url} target="_blank" rel="noopener" key={p.title}>{inner}</a>
            );
          })}
        </div>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <a className="btn btn-ghost" href={socials.github} target="_blank" rel="noopener">Voir plus sur GitHub ↗</a>
        </div>
      </section>

      {/* À PROPOS */}
      <section className="wrap section" id="a-propos">
        <div className="section-head reveal"><span className="eyebrow">À propos de moi</span><h2>Mon <span className="grad">Histoire</span></h2></div>
        <div className="about reveal">
          <div className="avatar" style={{ padding: 0, overflow: "hidden" }}>
            <img src={personalInfo.avatar} alt={personalInfo.name} fetchPriority="high" loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="body">
            {aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            <div className="mini">
              <div className="mini-card"><div className="k">Localisation</div><div className="v">{personalInfo.location}</div></div>
              <a className="mini-card" href={`mailto:${email}`} style={{ textDecoration: "none", color: "inherit" }}><div className="k">Email</div><div className="v">{email}</div></a>
              <a className="mini-card" href={`tel:+33${phone.replace(/\s/g, "").replace(/^0/, "")}`} style={{ textDecoration: "none", color: "inherit" }}><div className="k">Téléphone</div><div className="v">{phone}</div></a>
            </div>
          </div>
        </div>
      </section>

      {/* PARCOURS */}
      <section className="wrap section" id="parcours">
        <div className="section-head reveal"><span className="eyebrow">Parcours</span><h2>Mon <span className="grad">Parcours</span></h2></div>
        <div className="filters reveal">
          <button className="filter active" data-filter="all">Tout</button>
          <button className="filter" data-filter="exp">Expériences</button>
          <button className="filter" data-filter="formation">Formation</button>
          <button className="filter" data-filter="certif">Certifications</button>
        </div>
        <div className="timeline reveal">
          {experiences.map((e, i) => (
            <div className={"tl-item " + (i % 2 === 0 ? "tl-left" : "tl-right")} data-cat={e.type === "education" ? "formation" : "exp"} key={i}>
              <span className="dot" />
              <div className="tl-card">
                <div className="tl-head">
                  <span className="tl-ic">{e.type === "education" ? "🎓" : "💼"}</span>
                  <span className="tl-pill">{e.type === "education" ? "Formation" : "Expérience"}</span>
                </div>
                <h3>{e.title}</h3>
                <div className="org">{e.org}</div>
                <div className="when">📅 {e.when}</div>
                <p>{e.description}</p>
                <ul className="tl-reals">{e.achievements.map((a) => <li key={a}>{a}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPÉTENCES */}
      <section className="wrap section" id="competences">
        <div className="section-head reveal" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
          <span className="eyebrow">Expertise</span><h2>Mes <span className="grad">Compétences</span></h2>
        </div>
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="tabs" style={{ justifyContent: "center" }}>
            <button className="tab active" data-tab="tech">Compétences Techniques</button>
            <button className="tab" data-tab="soft">Soft Skills</button>
          </div>
          <div className="tabpane active" data-pane="tech">
            <div className="cloud">
              {techSkills.map((s) => <span className={"w " + cloudSize(s.level)} key={s.name}>{s.name}</span>)}
            </div>
          </div>
          <div className="tabpane" data-pane="soft">
            <div className="bars" style={{ margin: "0 auto", textAlign: "left" }}>
              {softSkills.map((s) => (
                <div className="bar" key={s.name}>
                  <div className="top"><span>{s.name}</span><span>{s.level}%</span></div>
                  <div className="track"><div className="fill" data-w={`${s.level}%`} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CONTACT */}
      <section className="wrap section" id="contact">
        <div className="contact reveal">
          <div className="info">
            <span className="eyebrow">Contact</span>
            <h2 style={{ marginTop: 14 }}>Me <span className="grad">Contacter</span></h2>
            <p className="lead">Disponible pour un CDI ou un CDD en marketing automation et SEO technique, et ouvert aux collaborations freelance sur des projets d'automatisation.</p>
            <div className="rows">
              <a className="crow" href={`mailto:${email}`}><span className="ic">✉</span><span><span className="k">Email</span><span className="v">{email}</span></span></a>
              <a className="crow" href={`tel:+33${phone.replace(/\s/g, "").replace(/^0/, "")}`}><span className="ic">☎</span><span><span className="k">Téléphone</span><span className="v">{phone}</span></span></a>
              <div className="crow"><span className="ic">📍</span><span><span className="k">Localisation</span><span className="v">{personalInfo.location}</span></span></div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
              <a className="btn btn-ghost" href={socials.linkedin} target="_blank" rel="noopener" style={{ padding: "10px 16px", fontSize: 14 }}>LinkedIn</a>
              <a className="btn btn-ghost" href={socials.github} target="_blank" rel="noopener" style={{ padding: "10px 16px", fontSize: 14 }}>GitHub</a>
              <a className="btn btn-ghost" href={socials.twitter} target="_blank" rel="noopener" style={{ padding: "10px 16px", fontSize: 14 }}>X (@EsperantRodrigu)</a>
            </div>
          </div>
          <form className="form" action="https://formspree.io/f/xojndkoe" method="POST">
            <div className="field"><label htmlFor="cf-name">Nom</label><input id="cf-name" type="text" name="name" autoComplete="name" placeholder="Votre nom" required /></div>
            <div className="field"><label htmlFor="cf-email">Email</label><input id="cf-email" type="email" name="email" autoComplete="email" placeholder="vous@exemple.com" required /></div>
            <div className="field"><label htmlFor="cf-message">Message</label><textarea id="cf-message" name="message" placeholder="Votre message…" required /></div>
            <button type="submit" className="btn" style={{ width: "100%", background: "linear-gradient(100deg,var(--accent),var(--accent2))", color: "#07090c", fontWeight: 700, justifyContent: "center" }}>Envoyer</button>
          </form>
        </div>
      </section>
    </main>
  );
}
