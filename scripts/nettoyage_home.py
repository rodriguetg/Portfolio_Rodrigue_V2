import pathlib, re


def edit(path, fn):
    p = pathlib.Path(path)
    t = p.read_text()
    n = fn(t)
    assert n != t, f"rien change dans {path}"
    p.write_text(n)
    print("OK", path)


def line_starting(t, prefix):
    s = t.index(prefix)
    return t[s:t.index("\n", s)]


def site(t):
    for title in ["Love Chat Assistant", "Anime Quotes Generator", "Nails Generator", "Bande Annonce · Projet Vidéo"]:
        s = t.index("  { title: `" + title + "`")
        e = min(i for i in (t.find("\n  { ", s + 5), t.find("\n];", s)) if i != -1)
        t = t[:s] + t[e + 1:]
    t = re.sub(
        r"export const projectFilters = \[[\s\S]*?\];",
        "export const projectFilters = [\n  { key: `all`, label: `Tout` }, { key: `cs`, label: `Case Study` }, { key: `biz`, label: `Business Tool` },\n];",
        t,
    )
    t = t.replace("title: `Marketing Automation Engineer`", "title: `SEO/GEO & Marketing Automation`")
    t = t.replace(
        "J'aide les équipes marketing à arrêter de perdre du temps sur les tâches répétitives. SEO technique, automatisation no code, intégrations API et IA.",
        "J'aide les équipes marketing à gagner en visibilité sur Google et dans les IA, et à arrêter de perdre du temps sur les tâches répétitives. SEO/GEO, automatisation no code, intégrations API et IA.",
    )
    t = t.replace(
        line_starting(t, "  `J'accompagne les entreprises, agences et créateurs"),
        "  `J'aide les annonceurs et les PME à gagner en visibilité sur Google et dans les moteurs IA (GEO), et à transformer leurs tâches répétitives en workflows automatisés : connexion des outils (site, CRM, réseaux sociaux), process marketing optimisés et données mieux exploitées.`,",
    )
    t = t.replace(
        line_starting(t, "  `Habitué au travail en équipe"),
        "  `Habitué au travail en équipe (startups, agence, associatif), je recherche aujourd'hui un CDI en SEO/GEO et marketing automation chez un annonceur ou une PME, à Paris.`,",
    )
    t = t.replace(
        "achievements: [`Workflows no code (n8n, Make, Zapier) pour automatiser des tâches SEO récurrentes`",
        "achievements: [`SEO et relocalisation de contenus pour des clients comme Allianz et Manutan`, `Workflows no code (n8n, Make, Zapier) pour automatiser des tâches SEO récurrentes`",
    )
    return t


def page(t):
    t = re.sub(r'<div className="tabs"[\s\S]*?</div>\s*', "", t, count=1)
    s = t.index('<div className="tabpane" data-pane="soft">')
    e = t.index("</section>", s)
    t = t[:s] + "</div>\n      " + t[e:]
    t = re.sub(r",\s*softSkills\b|\bsoftSkills\s*,\s*", "", t, count=1)
    t = t.replace(
        "Disponible pour un CDI ou un CDD en marketing automation et SEO technique, et ouvert aux collaborations freelance sur des projets d'automatisation.",
        "Disponible pour un CDI en SEO/GEO et marketing automation, à Paris. Ouvert aussi aux collaborations sur des projets d'automatisation.",
    )
    return t


def rename(t):
    return t.replace("Marketing Automation Engineer", "SEO/GEO & Marketing Automation").replace(
        "SEO technique, automatisation no code", "SEO/GEO, automatisation no code"
    )


edit("src/data/site.ts", site)
edit("src/app/page.tsx", page)
for f in ["src/app/layout.tsx", "src/components/Footer.tsx", "src/components/SerpSimulator.tsx"]:
    edit(f, rename)
