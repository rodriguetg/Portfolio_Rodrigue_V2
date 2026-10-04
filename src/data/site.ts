// rodespe.com v3 — données réelles (source : site rodespe.com + repo Portfolio_Rodrigue_V2)
export const personalInfo = {
  name: `Rodrigue GBADOU`,
  title: `SEO/GEO & Marketing Automation`,
  bio: `J'aide les équipes marketing à gagner en visibilité sur Google et dans les IA, et à arrêter de perdre du temps sur les tâches répétitives. SEO/GEO, automatisation no code, intégrations API et IA.`,
  email: `rodrigue.gbadou@gmail.com`,
  phone: `07 53 98 24 80`,
  location: `Paris, France`,
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
  `Habitué au travail en équipe (startups, agence, associatif), je recherche aujourd'hui un CDI en SEO/GEO et marketing automation chez un annonceur ou une PME, à Paris.`,
];

export const languages = [
  { name: `Français`, level: `Langue maternelle` },
  { name: `Anglais`, level: `Professionnel` },
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
  { type: `work`, title: `Alternance · Automatisation no code / low code & Développement Web`, org: `Primelis`, when: `Sept. 2025 → Août 2026`,
    description: `Alternance de 12 mois en agence SEO : conception de workflows d'automatisation et d'outils internes pour réduire le temps passé sur les tâches répétitives des équipes.`,
    achievements: [`SEO et relocalisation de contenus pour des clients comme Allianz et Manutan`, `Workflows no code (n8n, Make, Zapier) pour automatiser des tâches SEO récurrentes`, `Intégration WordPress et AEM`, `Scripts Python/JS et appels d'API pour industrialiser la collecte et le traitement de données`, `Documentation des workflows et transfert aux équipes`] },
  { type: `work`, title: `Stage · Automatisation no code / low code & Développement Web`, org: `Haskn`, when: `Avr. → Août 2025`,
    description: `Stage de 5 mois : prise en main des outils d'automatisation et premiers développements web, avec une montée en autonomie sur les workflows no code.`,
    achievements: [`Prise en main de WordPress et AEM`, `Premiers workflows Zapier, Make et n8n`, `Développement HTML/CSS/JS et scripts Python`, `Connexion d'outils via API`] },
  { type: `work`, title: `Stage · Marketing Digital & SEO`, org: `Marketkit`, when: `2024`,
    description: `Optimisation SEO, analyses de mots clés et utilisation d'IA pour le marketing digital.`,
    achievements: [`Analyses approfondies de mots clés`, `Optimisation de contenus SEO`, `Intégration d'IA dans les stratégies marketing`, `Amélioration du référencement naturel`] },
  { type: `work`, title: `Stage · SEO Specialist`, org: `InnovQube`, when: `2024`,
    description: `Optimisation SEO avancée et suivi analytique avec Google Analytics.`,
    achievements: [`Optimisation technique SEO`, `Suivi et analyses Google Analytics`, `Amélioration des performances web`, `Rapports de performance détaillés`] },
  { type: `work`, title: `Stage · Chef de Projet Social Media`, org: `StudHelp`, when: `2024`,
    description: `Communication digitale, gestion de partenariats et production vidéo.`,
    achievements: [`Gestion de projets social media`, `Développement de partenariats`, `Production de contenus vidéo`, `Stratégie de communication digitale`] },
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
