import pathlib, re

assert pathlib.Path("public/cv-rodrigue-gbadou.pdf").exists(), "CV manquant dans public/"


def rep(t, old, new):
    assert old in t, "introuvable : " + old[:60]
    return t.replace(old, new)


def block(t, org):
    m = re.search(r"  \{ type: `work`, title: `[^`]*`, org: `" + org + r"`[\s\S]*?`\] \},\n", t)
    assert m, "bloc introuvable : " + org
    return m


def entry(title, org, when, desc, items):
    ach = ", ".join("`" + i + "`" for i in items)
    return "  { type: `work`, title: `" + title + "`, org: `" + org + "`, when: `" + when + "`,\n    description: `" + desc + "`,\n    achievements: [" + ach + "] },\n"


def site(t):
    t = rep(t, "title: `SEO/GEO & Marketing Automation`", "title: `Chargé de marketing digital`")
    t = rep(t, "location: `Paris, France`", "location: `Noisy-le-Grand / Paris`")
    t = rep(t, "level: `Professionnel`", "level: `Débutant`")
    t = rep(t, "je recherche aujourd'hui un CDI en SEO/GEO et marketing automation chez un annonceur ou une PME, à Paris.",
            "je recherche aujourd'hui un CDI de chargé de marketing digital (SEO, GEO, contenu, automatisation) chez un annonceur ou une PME, à Noisy-le-Grand / Paris.")
    prim = entry("Alternance · Automatisation & Développement no-code", "Primelis", "Sept. 2025 → Août 2026",
        "Alternance de 12 mois en agence SEO/MarTech : automatisation des processus SEO et intégration de contenus à grande échelle.",
        ["Intégration de contenu multi-CMS, dont WordPress et AEM, et optimisation à grande échelle", "Conception de workflows no-code avec n8n, Make et Zapier pour automatiser les processus SEO", "Prompt engineering pour accélérer la production de contenu avec l'IA", "Contribution à un outil interne d'automatisation et aux livrables clients"])
    hask = entry("Stage · Automatisation & Développement no-code", "Haskn", "Avr. → Août 2025",
        "Stage de 5 mois : automatisation des processus SEO et intégration de contenus.",
        ["Intégration de contenu multi-CMS et optimisation à grande échelle", "Conception de workflows no-code pour automatiser les processus SEO", "Contribution à un outil interne d'automatisation et aux livrables clients"])
    innov = entry("Stage · Chargé de SEO", "InnovQube", "Févr. → Avr. 2025",
        "Optimisation SEO on-page, suivi des positions et reporting.",
        ["Optimisation on-page et intégration de contenus sur WordPress", "Recherche de mots-clés et étude des positions", "Participation à la stratégie de communication et de contenu", "Reporting et analyse des performances SEO"])
    mark = entry("Stage · Chargé de SEO", "Marketkit", "Mai → Déc. 2024",
        "Optimisation SEO, création de contenu et suivi des performances.",
        ["Recherche de mots-clés et optimisation on-page pour améliorer la visibilité", "Création de contenu optimisé pour le web et les réseaux sociaux", "Audit technique du site et optimisation des médias", "Stratégie de maillage interne et externe, suivi des performances avec Google Analytics et veille SEO"])
    stud = entry("Stage · Chef de projet social media et communication", "StudHelp", "Janv. → Mai 2024",
        "Création de contenu, analyse de données et suivi de campagnes.",
        ["Création et publication de contenu sur WordPress et les réseaux sociaux", "Analyse des données pour orienter les actions marketing", "Support sur les campagnes et suivi des performances"])
    old_innov = block(t, "InnovQube").group(0)
    t = t.replace(old_innov, "")
    for org, new in (("Primelis", prim), ("Haskn", hask), ("Marketkit", innov + mark), ("StudHelp", stud)):
        t = t.replace(block(t, org).group(0), new)
    return t


def page(t):
    t = rep(t, "Disponible : CDI ou CDD en marketing automation", "Disponible immédiatement : CDI en marketing digital, SEO/GEO et automatisation")
    t = rep(t, '<a className="btn btn-ghost" href="#contact">Me contacter</a>',
            '<a className="btn btn-ghost" href="#contact">Me contacter</a>\n          <a className="btn btn-ghost" href="/cv-rodrigue-gbadou.pdf" target="_blank" rel="noopener">Télécharger mon CV</a>')
    t = rep(t, "Disponible pour un CDI en SEO/GEO et marketing automation, à Paris. Ouvert aussi aux collaborations sur des projets d'automatisation.",
            "Disponible immédiatement pour un CDI de chargé de marketing digital (SEO, GEO, contenu, automatisation), à Noisy-le-Grand / Paris.")
    t = rep(t, '<a className="btn btn-ghost" href={socials.linkedin}',
            '<a className="btn btn-ghost" href="/cv-rodrigue-gbadou.pdf" target="_blank" rel="noopener" style={{ padding: "10px 16px", fontSize: 14 }}>CV (PDF)</a>\n              <a className="btn btn-ghost" href={socials.linkedin}')
    return t


def rename(t):
    return t.replace("SEO/GEO & Marketing Automation", "Chargé de marketing digital SEO/GEO")


def footer(t):
    t = rename(t)
    return rep(t, "SEO/GEO · Paris", "SEO/GEO · Noisy-le-Grand / Paris") if "SEO/GEO · Paris" in t else t


def edit(path, fn):
    p = pathlib.Path(path)
    t = p.read_text()
    n = fn(t)
    assert n != t, "rien change : " + path
    p.write_text(n)
    print("OK", path)


edit("src/data/site.ts", site)
edit("src/app/page.tsx", page)
edit("src/app/layout.tsx", rename)
edit("src/components/SerpSimulator.tsx", rename)
edit("src/components/Footer.tsx", footer)
