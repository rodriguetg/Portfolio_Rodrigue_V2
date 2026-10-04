// rodespe.com v3 — données réelles (source : site rodespe.com + repo Portfolio_Rodrigue_V2)
export const personalInfo = {
  name: `Rodrigue GBADOU`,
  title: `Marketing Automation Engineer`,
  bio: `J'aide les équipes marketing à arrêter de perdre du temps sur les tâches répétitives. SEO technique, automatisation no code, intégrations API et IA.`,
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
  `En Master Brand Content & Management à Paris École de Management (fin août 2026), je me spécialise dans la stratégie marketing digitale, l'automatisation no code et l'innovation technologique.`,
  `Avec plus de 5 ans d'expérience en freelance et en entreprise, j'ai développé une expertise opérationnelle en SEO, automatisation (Airops, n8n, Make, Zapier), développement web no code et création de contenus orientés performance.`,
  `J'accompagne les entreprises, agences et créateurs à transformer leurs tâches répétitives en workflows automatisés : connexion des outils (site, CRM, réseaux sociaux), optimisation des process marketing et meilleure exploitation de leurs données.`,
  `Habitué au travail en équipe (associatif, agences, startups), je suis aujourd'hui ouvert à un CDI et à des partenariats sur des projets d'automatisation, de contenu et de marketing digital.`,
];

export const languages = [
  { name: `Français`, level: `Langue maternelle` },
  { name: `Anglais`, level: `Professionnel` },
];

export const certifications = [
  { title: `n8n Certified Creator`, issuer: `n8n`, date: `2025`, featured: true,
    logo: `https://static.cdnlogo.com/logos/n/6/n8n_800.png`,
    url: `https://n8n.io/creators/gbadou/`,
    description: `Créateur certifié et contributeur actif avec plus de 9 workflows publiés pour aider la communauté à automatiser leurs processus et gagner en productivité.` },
  { title: `Content Engineer`, issuer: `AirOps`, date: `2025`,
    logo: `https://logo.clearbit.com/airops.com`,
    url: `https://www.airops.com/` },
  { title: `Les principes fondamentaux du marketing digital`, issuer: `Google`, date: `2023`,
    logo: `https://logo.clearbit.com/google.com`,
    url: `https://skillshop.exceedlms.com/student/award/tsmesvD8nLuC6BwhyvymtXFV` },
  { title: `Préparer votre carrière dans l'IA générative`, issuer: `Microsoft & LinkedIn`, date: `2024`,
    logo: `https://logo.clearbit.com/linkedin.com`,
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
  { title: `Love Chat Assistant`, category: `IA/ML`, cat: `iaml`,
    description: `IA de coaching amoureux : chatbot intelligent qui donne des conseils personnalisés sur les relations amoureuses avec une approche empathique et moderne.`,
    image: `/images/cover-love-chat.webp`,
    tags: [`Python`, `Flask`, `IA`, `SQLite`], url: `https://love-chat-assistant.netlify.app/` },
  { title: `Anime Quotes Generator`, category: `Web App`, cat: `webapp`,
    description: `Générateur de citations d'anime avec interface interactive, citations aléatoires et fonctionnalité de partage sur les réseaux sociaux pour les fans d'anime.`,
    image: `/images/cover-anime-quotes.webp`,
    tags: [`React`, `Node.js`, `MongoDB`, `Material UI`], url: `https://github.com/rodriguetg/anime-quotes-generator` },
  { title: `Générateur de Persona Marketing`, category: `Business Tool`, cat: `biz`,
    description: `Outil automatisé qui génère des personas marketing complets et détaillés avec export PDF professionnel pour optimiser les stratégies marketing.`,
    image: `/images/cover-persona-generator.webp`,
    tags: [`Python`, `Flask`, `Bootstrap`, `fpdf2`], url: `https://generateur-de-persona.onrender.com/` },
  { title: `Nails Generator`, category: `Creative AI`, cat: `creative`,
    description: `Générateur d'art d'ongles par IA avec prompts personnalisés et adaptation automatique aux différents formats de réseaux sociaux pour nail artists.`,
    image: `/images/cover-nails-generator.webp`,
    tags: [`React`, `TypeScript`, `Tailwind`, `API IA`], url: `https://github.com/rodriguetg/nails-generator` },
  { title: `Bande Annonce · Projet Vidéo`, category: `Production Vidéo`, cat: `video`,
    description: `Création collaborative d'une bande annonce captivante, démontrant nos compétences en production vidéo et storytelling.`,
    image: `/images/cover-video-trailer.webp`,
    tags: [`Production Vidéo`, `Montage`, `Storytelling`, `Travail d'équipe`], url: `https://www.youtube.com/watch?v=hLpx2YvBJ6k` },
];

export const projectFilters = [
  { key: `all`, label: `Tout` }, { key: `cs`, label: `Case Study` }, { key: `iaml`, label: `IA/ML` },
  { key: `webapp`, label: `Web App` }, { key: `biz`, label: `Business Tool` },
  { key: `creative`, label: `Creative AI` }, { key: `video`, label: `Production Vidéo` },
];

export type Experience = { type: `work` | `education`; title: string; org: string; when: string; description: string; achievements: string[] };

export const experiences: Experience[] = [
  { type: `education`, title: `Master Brand Content & Management`, org: `Paris École de Management (PEM)`, when: `2024 → 2026`,
    description: `Formation spécialisée en stratégie marketing, communication digitale et management de contenu.`,
    achievements: [`Stratégie marketing et communication`, `SEO/SEA avancé`, `Créativité et automatisation`, `Droit de la propriété intellectuelle`] },
  { type: `work`, title: `Alternance · Automatisation no code / low code & Développement Web`, org: `Primelis`, when: `Sept. 2025 → Août 2026`,
    description: `Intégration WordPress/AEM, développement de workflows no code et automatisation d'API.`,
    achievements: [`Intégration WordPress et AEM`, `Workflows avec Zapier, Make, N8N`, `Développement HTML/CSS/JS/Python`, `Automatisation de processus via API`] },
  { type: `work`, title: `Stage · Automatisation no code / low code & Développement Web`, org: `Haskn`, when: `Avr. → Août 2025`,
    description: `Intégration WordPress/AEM, développement de workflows no code et automatisation d'API.`,
    achievements: [`Intégration WordPress et AEM`, `Workflows avec Zapier, Make, N8N`, `Développement HTML/CSS/JS/Python`, `Automatisation de processus via API`] },
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
