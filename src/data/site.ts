// rodespe.com v3 — données réelles (source : site rodespe.com + repo Portfolio_Rodrigue_V2)
export const personalInfo = {
  name: `Rodrigue GBADOU`,
  title: `Chargé de marketing digital`,
  bio: `J'aide les équipes marketing à gagner en visibilité sur Google et dans les IA, et à arrêter de perdre du temps sur les tâches répétitives. SEO/GEO, automatisation no code, intégrations API et IA.`,
  email: `rodrigue.gbadou@gmail.com`,
  phone: `07 53 98 24 80`,
  location: `Noisy-le-Grand / Paris`,
  avatar: `/rodrigue-gbadou.webp`,
  socials: {
    github: `https://github.com/rodriguetg`,
    linkedin: `https://www.linkedin.com/in/rodrigue-gbadou/`,
    twitter: `https://x.com/EsperantRodrigu`,
  },
};

export const aboutParagraphs = [
  `Diplômé d'un Master Brand Content & Management de la Paris École de Management (2026), je me spécialise dans la stratégie marketing digitale, l'automatisation no code et l'innovation technologique.`,
  `Avec plus de 5 ans d'expérience en freelance et en entreprise, j'ai développé une expertise opérationnelle en SEO, automatisation (Airops, n8n, Make, Zapier), développement web no code et création de contenus orientés performance.`,
  `J'aide les annonceurs et les PME à gagner en visibilité sur Google et dans les moteurs IA (GEO), et à transformer leurs tâches répétitives en workflows automatisés : connexion des outils (site, CRM, réseaux sociaux), process marketing optimisés et données mieux exploitées.`,
  `Habitué au travail en équipe (startups, agence, associatif), je recherche aujourd'hui un CDI de chargé de marketing digital (SEO, GEO, contenu, automatisation) chez un annonceur ou une PME, à Noisy-le-Grand / Paris.`,
];

export const languages = [
  { name: `Français`, level: `Langue maternelle` },
  { name: `Anglais`, level: `Débutant` },
];

export const certifications = [
  { title: `n8n Certified Creator`, issuer: `n8n`, date: `2025`, featured: true,
    logo: `/images/logos/n8n.png`,
    url: `https://n8n.io/creators/gbadou/`,
    description: `Créateur certifié et contributeur actif avec plus de 9 workflows publiés pour aider la communauté à automatiser leurs processus et gagner en productivité.` },
  { title: `Content Engineer`, issuer: `AirOps`, date: `2025`,
    logo: `/images/logos/airops.png`,
    url: `https://www.airops.com/` },
  { title: `Les principes fondamentaux du marketing digital`, issuer: `Google`, date: `2023`,
    logo: `/images/logos/google.png`,
    url: `https://skillshop.exceedlms.com/student/award/tsmesvD8nLuC6BwhyvymtXFV` },
  { title: `Préparer votre carrière dans l'IA générative`, issuer: `Microsoft & LinkedIn`, date: `2024`,
    logo: `/images/logos/linkedin.png`,
    url: `https://www.linkedin.com/learning/certificates/764acfebc5a4477b1ce7ce7f4f07d4d4ec228148bfe2439ec618ea8b2f5510ea` },
];

export type Project = {
  title: string; description: string; image: string; tags: string[];
  category: string; cat: string; url?: string; caseStudy?: string;
};

export const projects: Project[] = [
  { title: `Générateur de Blog IA Autonome`, category: `Case Study`, cat: `cs`,
    description: `De la recherche de mots clés à la publication WordPress : un pipeline de contenu SEO entièrement automatisé.`,
    image: `/images/cover-blog-automation.webp`,
    tags: [`n8n`, `OpenAI (GPT-4)`, `WordPress API`, `Perplexity`], caseStudy: `blog-content-automation` },
  { title: `Générateur de contenu Bluesky`, category: `Case Study`, cat: `cs`,
    description: `Un système de veille et de publication automatique qui détecte les tendances tech et publie sur Bluesky & Twitter sans intervention.`,
    image: `/images/cover-bluesky-generator.webp`,
    tags: [`n8n`, `OpenAI`, `Bluesky API`, `Twitter API`], caseStudy: `bluesky-content-generator` },
  { title: `Moteur de SEO Programmatique`, category: `Case Study`, cat: `cs`,
    description: `Combiner un template structuré, une base de données et une couche IA pour générer en masse des pages SEO ciblées sur des longues traînes peu concurrentielles.`,
    image: `/images/cover-pseo-engine.webp`,
    tags: [`n8n`, `WordPress REST API`, `OpenAI / Claude`, `Google Sheets`], caseStudy: `programmatic-seo-engine` },
  { title: `Audit SEO en continu`, category: `Case Study`, cat: `cs`,
    description: `Crawl planifié, monitoring des Core Web Vitals et détection de régressions techniques. Le rapport hebdomadaire arrive directement dans Slack.`,
    image: `/images/cover-seo-audit.webp`,
    tags: [`n8n`, `Google Search Console API`, `PageSpeed Insights API`, `Firecrawl`], caseStudy: `continuous-seo-audit` },
  { title: `Générateur de Persona Marketing`, category: `Business Tool`, cat: `biz`,
    description: `Outil automatisé qui génère des personas marketing complets et détaillés avec export PDF professionnel pour optimiser les stratégies marketing.`,
    image: `/images/cover-persona-generator.webp`,
    tags: [`Python`, `Flask`, `Bootstrap`, `fpdf2`], url: `https://generateur-de-persona.onrender.com/` },
];

export const projectFilters = [
  { key: `all`, label: `Tout` }, { key: `cs`, label: `Case Study` }, { key: `biz`, label: `Business Tool` },
];

export type Experience = { type: `work` | `education`; title: string; org: string; when: string; description: string; achievements: string[] };

export const experiences: Experience[] = [
  { type: `education`, title: `Master Brand Content & Management · Diplômé`, org: `Paris École de Management (PEM)`, when: `2024 → 2026`,
    description: `Formation spécialisée en stratégie marketing, communication digitale et management de contenu.`,
    achievements: [`Stratégie marketing et communication`, `SEO/SEA avancé`, `Créativité et automatisation`, `Droit de la propriété intellectuelle`] },
  { type: `work`, title: `Alternance · Automatisation & Développement no-code`, org: `Primelis`, when: `Sept. 2025 → Août 2026`,
    description: `Alternance de 12 mois en agence SEO/MarTech : automatisation des processus SEO et intégration de contenus à grande échelle.`,
    achievements: [`Intégration de contenu multi-CMS, dont WordPress et AEM, et optimisation à grande échelle`, `Conception de workflows no-code avec n8n, Make et Zapier pour automatiser les processus SEO`, `Prompt engineering pour accélérer la production de contenu avec l'IA`, `Contribution à un outil interne d'automatisation et aux livrables clients`] },
  { type: `work`, title: `Stage · Automatisation & Développement no-code`, org: `Haskn`, when: `Avr. → Août 2025`,
    description: `Stage de 5 mois : automatisation des processus SEO et intégration de contenus.`,
    achievements: [`Intégration de contenu multi-CMS et optimisation à grande échelle`, `Conception de workflows no-code pour automatiser les processus SEO`, `Contribution à un outil interne d'automatisation et aux livrables clients`] },
  { type: `work`, title: `Stage · Chargé de SEO`, org: `InnovQube`, when: `Févr. → Avr. 2025`,
    description: `Optimisation SEO on-page, suivi des positions et reporting.`,
    achievements: [`Optimisation on-page et intégration de contenus sur WordPress`, `Recherche de mots-clés et étude des positions`, `Participation à la stratégie de communication et de contenu`, `Reporting et analyse des performances SEO`] },
  { type: `work`, title: `Stage · Chargé de SEO`, org: `Marketkit`, when: `Mai → Déc. 2024`,
    description: `Optimisation SEO, création de contenu et suivi des performances.`,
    achievements: [`Recherche de mots-clés et optimisation on-page pour améliorer la visibilité`, `Création de contenu optimisé pour le web et les réseaux sociaux`, `Audit technique du site et optimisation des médias`, `Stratégie de maillage interne et externe, suivi des performances avec Google Analytics et veille SEO`] },
  { type: `work`, title: `Stage · Chef de projet social media et communication`, org: `StudHelp`, when: `Janv. → Mai 2024`,
    description: `Création de contenu, analyse de données et suivi de campagnes.`,
    achievements: [`Création et publication de contenu sur WordPress et les réseaux sociaux`, `Analyse des données pour orienter les actions marketing`, `Support sur les campagnes et suivi des performances`] },
  { type: `education`, title: `Licence Lettres Modernes`, org: `Université de Strasbourg`, when: `2021 → 2023`,
    description: `Formation en littérature française et grammaire, développement de compétences rédactionnelles.`,
    achievements: [`Maîtrise de la littérature française`, `Compétences rédactionnelles avancées`, `Analyse critique et synthèse`, `Communication écrite professionnelle`] },
  { type: `work`, title: `Secrétaire Général`, org: `Association des Étudiants Béninois de Strasbourg (AEBS)`, when: `2023 → 2024`,
    description: `Gestion administrative et coordination des activités associatives.`,
    achievements: [`Coordination d'équipes bénévoles`, `Organisation d'événements culturels`, `Gestion administrative et financière`, `Développement de partenariats institutionnels`] },
  { type: `work`, title: `Freelance · Créateur de contenu`, org: `Indépendant`, when: `2021 → 2024`,
    description: `Création de contenus audio/vidéo, gestion de partenariats et animation de communautés sur les réseaux sociaux.`,
    achievements: [`Création de contenus multimedia engageants`, `Gestion de partenariats stratégiques`, `Croissance organique des communautés`, `Développement de calendriers éditoriaux`] },
];

export const techSkills = [
  { name: `SEO/SEA`, level: 90 }, { name: `WordPress/AEM`, level: 85 }, { name: `Automatisation No-Code`, level: 88 },
  { name: `Python`, level: 75 }, { name: `HTML/CSS/JavaScript`, level: 82 }, { name: `Google Analytics`, level: 85 },
  { name: `Zapier/Make/N8N`, level: 90 }, { name: `Web Scraping`, level: 80 }, { name: `Semrush`, level: 85 },
  { name: `AirOps`, level: 90 }, { name: `Prompt Engineering`, level: 88 }, { name: `API Integration`, level: 78 },
  { name: `Content Management`, level: 92 }, { name: `Créatomate`, level: 85 }, { name: `Fal.ai`, level: 80 },
];

export const softSkills = [
  { name: `Proactivité`, level: 95 }, { name: `Autonomie`, level: 92 }, { name: `Adaptabilité`, level: 90 },
  { name: `Veille digitale`, level: 90 }, { name: `Communication`, level: 88 }, { name: `Créativité`, level: 88 },
  { name: `Relationnel`, level: 85 }, { name: `Gestion de projet`, level: 82 },
];
