import { personalInfo } from "@/data/site";
export default function Footer() {
  const { socials, email, phone } = personalInfo;
  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <a className="logo" href="/"><i>&lt;/&gt;</i> Rodrigue</a>
            <p className="tagline">Chargé de marketing digital SEO/GEO. SEO/GEO, automatisation no code, intégrations API et IA.</p>
          </div>
          <div className="fnav">
            <div className="fcol"><h4>Navigation</h4>
              <a href="/outils">Outils SEO</a><a href="/#certifications">Certifications</a><a href="/#projets">Projets</a><a href="/#parcours">Parcours</a><a href="/#contact">Contact</a>
            </div>
            <div className="fcol"><h4>Liens</h4>
              <a href="/etudes-de-cas">Études de cas</a>
              <a href={socials.linkedin} target="_blank" rel="noopener">LinkedIn</a>
              <a href={socials.github} target="_blank" rel="noopener">GitHub</a>
              <a href={socials.twitter} target="_blank" rel="noopener">X / Twitter</a>
            </div>
            <div className="fcol"><h4>Contact</h4>
              <a href={`mailto:${email}`}>{email}</a>
              <a href={`tel:+33${phone.replace(/\s/g, "").replace(/^0/, "")}`}>{phone}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Rodrigue GBADOU — rodespe.com</span>
          <span>Chargé de marketing digital SEO/GEO · Noisy-le-Grand / Paris</span>
        </div>
      </footer>
      <button className="to-top" aria-label="Haut de page">↑</button>
    </>
  );
}
