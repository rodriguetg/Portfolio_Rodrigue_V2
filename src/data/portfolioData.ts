import type { Experience, Project, Skill, Language, PersonalInfo, Certification } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Rodrigue GBADOU",
  title: "No-Code Automation Specialist & Content Creator",
  bio: "J'aide les entreprises et les équipes à gagner en efficacité grâce à l'automatisation et des solutions digitales créatives : chaque organisation mérite des outils modernes et une stratégie de contenu adaptée.",
  email: "rodrigue.gbadou@gmail.com",
  phone: "07 53 98 24 80",
  location: "Paris, France",
  avatar: "/rodrigue gbadou.webp",
  socialLinks: {
    github: "https://github.com/rodriguetg",
    linkedin: "https://www.linkedin.com/in/rodrigue-gbadou/",
    twitter: "https://twitter.com/EsperantRodrigu",
  }
};

export const aboutText = `Étudiant en Master Brand Content & Management à Paris École de Management, je me spécialise dans la stratégie marketing digitale, l’automatisation no-code et l’innovation technologique.

Avec plus de 3 ans d’expérience en freelance et en entreprise, j’ai développé une expertise opérationnelle en SEO, automatisation (Airops, n8n, Make, Zapier), développement web no code et création de contenus orientés performance.

J’accompagne les entreprises, agences et créateurs à transformer leurs tâches répétitives en workflows automatisés : connexion des outils (site, CRM, réseaux sociaux), optimisation des process marketing et meilleure exploitation de leurs données.

Habitué au travail en équipe (associatif, agences, startups), je suis aujourd’hui ouvert à un CDI et à des partenariats sur des projets d’automatisation, de contenu et de marketing digital.`;

export const languages: Language[] = [
  { name: "Français", level: "Langue maternelle" },
  { name: "Anglais", level: "Professionnel" }
];

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Master Brand Content & Management",
    company: "Paris École de Management (PEM)",
    period: "2024 - 2026",
    description: "Formation spécialisée en stratégie marketing, communication digitale et management de contenu.",
    achievements: [
      "Stratégie marketing et communication",
      "SEO/SEA avancé",
      "Créativité et automatisation",
      "Droit de la propriété intellectuelle"
    ],
    type: "education"
  },
  {
    id: "2",
    title: "Alternance - Automatisation No code / low code & Développement Web",
    company: "Primelis",
    period: "2026",
    description: "Intégration WordPress/AEM, développement de workflows no-code et automatisation d'API.",
    achievements: [
      "Intégration WordPress et AEM",
      "Workflows avec Zapier, Make, N8N",
      "Développement HTML/CSS/JS/Python",
      "Automatisation de processus via API"
    ],
    type: "work"
  },
  {
    id: "3",
    title: "Stage - Automatisation No code / low code & Développement Web",
    company: "Haskn",
    period: "2026",
    description: "Intégration WordPress/AEM, développement de workflows no-code et automatisation d'API.",
    achievements: [
      "Intégration WordPress et AEM",
      "Workflows avec Zapier, Make, N8N",
      "Développement HTML/CSS/JS/Python",
      "Automatisation de processus via API"
    ],
    type: "work"
  },
  {
    id: "4",
    title: "Stage - Marketing Digital & SEO",
    company: "Marketkit",
    period: "2024",
    description: "Optimisation SEO, analyses de mots-clés et utilisation d'IA pour le marketing digital.",
    achievements: [
      "Analyses approfondies de mots-clés",
      "Optimisation de contenus SEO",
      "Intégration d'IA dans les stratégies marketing",
      "Amélioration du référencement naturel"
    ],
    type: "work"
  },
  {
    id: "5",
    title: "Stage - SEO Specialist",
    company: "InnovQube",
    period: "2024",
    description: "Optimisation SEO avancée et suivi analytique avec Google Analytics.",
    achievements: [
      "Optimisation technique SEO",
      "Suivi et analyses Google Analytics",
      "Amélioration des performances web",
      "Rapports de performance détaillés"
    ],
    type: "work"
  },
  {
    id: "6",
    title: "Stage - Chef de Projet Social Media",
    company: "StudHelp",
    period: "2024",
    description: "Communication digitale, gestion de partenariats et production vidéo.",
    achievements: [
      "Gestion de projets social media",
      "Développement de partenariats",
      "Production de contenus vidéo",
      "Stratégie de communication digitale"
    ],
    type: "work"
  },
  {
    id: "7",
    title: "Licence Lettres Modernes",
    company: "Université de Strasbourg",
    period: "2021 - 2023",
    description: "Formation en littérature française et grammaire, développement de compétences rédactionnelles.",
    achievements: [
      "Maîtrise de la littérature française",
      "Compétences rédactionnelles avancées",
      "Analyse critique et synthèse",
      "Communication écrite professionnelle"
    ],
    type: "education"
  },
  {
    id: "8",
    title: "Secrétaire Général",
    company: "Association des Étudiants Béninois de Strasbourg (AEBS)",
    period: "2023 - 2024",
    description: "Gestion administrative et coordination des activités associatives.",
    achievements: [
      "Coordination d'équipes bénévoles",
      "Organisation d'événements culturels",
      "Gestion administrative et financière",
      "Développement de partenariats institutionnels"
    ],
    type: "work"
  },
  {
    id: "9",
    title: "Freelance - Créateur de contenu",
    company: "Indépendant",
    period: "2021 - 2024",
    description: "Création de contenus audio/vidéo, gestion de partenariats et animation de communautés sur les réseaux sociaux.",
    achievements: [
      "Création de contenus multimedia engageants",
      "Gestion de partenariats stratégiques",
      "Croissance organique des communautés",
      "Développement de calendriers éditoriaux"
    ],
    type: "work"
  }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Love Chat Assistant",
    description: "IA de coaching amoureux : chatbot intelligent qui donne des conseils personnalisés sur les relations amoureuses avec une approche empathique et moderne.",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    technologies: ["Python", "Flask", "IA", "SQLite", "Web"],
    category: "IA/ML",
    codeUrl: "https://github.com/rodriguetg/love-chat-assistant",
    highlight: "Innovation en IA conversationnelle"
  },
  {
    id: "2",
    title: "Anime Quotes Generator",
    description: "Générateur de citations d'anime avec interface interactive, citations aléatoires et fonctionnalité de partage sur les réseaux sociaux pour les fans d'anime.",
    image: "https://images.pexels.com/photos/7991316/pexels-photo-7991316.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Material UI"],
    category: "Web App",
    codeUrl: "https://github.com/rodriguetg/anime-quotes-generator",
    highlight: "Communauté & Entertainment"
  },
  {
    id: "3",
    title: "Générateur de Persona Marketing",
    description: "Outil automatisé qui génère des personas marketing complets et détaillés avec export PDF professionnel pour optimiser les stratégies marketing.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    technologies: ["Python", "Flask", "Bootstrap", "fpdf2"],
    category: "Business Tool",
    codeUrl: "https://github.com/rodriguetg/Generateur-de-Persona",
    demoUrl: "https://generateur-de-persona.onrender.com/",
    highlight: "Automatisation Marketing"
  },
  {
    id: "4",
    title: "Nails Generator",
    description: "Générateur d'art d'ongles par IA avec prompts personnalisés et adaptation automatique aux différents formats de réseaux sociaux pour nail artists.",
    image: "https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    technologies: ["React", "TypeScript", "Tailwind", "API IA"],
    category: "Creative AI",
    codeUrl: "https://github.com/rodriguetg/nails-generator",
    highlight: "IA Créative & Beauté"
  },
  {
    id: "5",
    title: "Bande Annonce - Projet Vidéo",
    description: "Création collaborative d'une bande annonce captivante, démontrant nos compétences en production vidéo et storytelling.",
    image: "https://images.pexels.com/photos/7991310/pexels-photo-7991310.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    technologies: ["Production Vidéo", "Montage", "Storytelling", "Travail d'équipe"],
    category: "Production Vidéo",
    demoUrl: "https://www.youtube.com/watch?v=hLpx2YvBJ6k",
    highlight: "Storytelling Visuel"
  }
];

export const skills: Skill[] = [
  // Compétences techniques
  { name: "SEO/SEA", level: 90, category: "technical" },
  { name: "WordPress/AEM", level: 85, category: "technical" },
  { name: "Automatisation No-Code", level: 88, category: "technical" },
  { name: "Python", level: 75, category: "technical" },
  { name: "HTML/CSS/JavaScript", level: 82, category: "technical" },
  { name: "Google Analytics", level: 85, category: "technical" },
  { name: "Zapier/Make/N8N", level: 90, category: "technical" },
  { name: "Web Scraping", level: 80, category: "technical" },
  { name: "Semrush", level: 85, category: "technical" },
  { name: "AirOps", level: 90, category: "technical" },
  { name: "Prompt Engineering", level: 88, category: "technical" },
  { name: "API Integration", level: 78, category: "technical" },
  { name: "Content Management", level: 92, category: "technical" },

  // Soft skills
  { name: "Proactivité", level: 95, category: "soft" },
  { name: "Adaptabilité", level: 90, category: "soft" },
  { name: "Communication", level: 88, category: "soft" },
  { name: "Autonomie", level: 92, category: "soft" },
  { name: "Relationnel", level: 85, category: "soft" },
  { name: "Créativité", level: 88, category: "soft" },
  { name: "Veille digitale", level: 90, category: "soft" },
  { name: "Gestion de projet", level: 82, category: "soft" }
];



export const certifications: Certification[] = [
  {
    id: "n8n-creator",
    title: "n8n Certified Creator",
    issuer: "n8n",
    date: "2025",
    image: "https://static.cdnlogo.com/logos/n/6/n8n_800.png",
    credentialUrl: "https://n8n.io/creators/gbadou/",
    featured: true,
    description: "Créateur certifié et contributeur actif avec plus de 9 workflows publiés pour aider la communauté à automatiser leurs processus et gagner en productivité."
  },
  {
    id: "3",
    title: "Content Engineer",
    issuer: "AirOps",
    date: "2025",
    image: "/images/certifications/airops-content-engineer.png",
    credentialUrl: "/images/certifications/airops-content-engineer.png"
  },
  {
    id: "1",
    title: "Les principes fondamentaux du marketing digital",
    issuer: "Google",
    date: "2023",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    credentialUrl: "https://skillshop.exceedlms.com/student/award/tsmesvD8nLuC6BwhyvymtXFV"
  },
  {
    id: "2",
    title: "Préparer votre carrière dans l'IA générative",
    issuer: "Microsoft & LinkedIn",
    date: "2024",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/1200px-Linkedin.svg.png",
    credentialUrl: "https://www.linkedin.com/learning/certificates/764acfebc5a4477b1ce7ce7f4f07d4d4ec228148bfe2439ec618ea8b2f5510ea"
  }
];
