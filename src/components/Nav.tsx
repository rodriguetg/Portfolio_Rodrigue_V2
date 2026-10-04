export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="logo" href="/"><i>&lt;/&gt;</i> Rodrigue</a>
        <nav className="nav-links" id="nav-links">
          <a href="/">Accueil</a>
          <a href="/outils">Outils</a>
          <a href="/#projets">Projets</a>
          <a href="/#a-propos">À propos</a>
          <a href="/#parcours">Parcours</a>
          <a href="/#competences">Compétences</a>
          <a href="/etudes-de-cas">Études de Cas</a>
          <a href="/blog">Blog</a>
          <a href="/#contact">Contact</a>
        </nav>
        <a className="pill" href="/#contact">Me contacter →</a>
        <button className="burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-links">☰</button>
      </div>
    </header>
  );
}
