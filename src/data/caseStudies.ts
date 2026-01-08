export interface CaseStudy {
    id: string;
    title: string;
    subtitle: string;
    excerpt: string;
    image: string;
    technologies: string[];
    // Nouveaux champs structurés
    stats: { label: string; value: string }[];
    challenge: string;
    solution: string;
    process: { step: number; title: string; description: string }[];
    faq?: { question: string; answer: string }[];
    downloadUrl?: string;
}

export const caseStudies: CaseStudy[] = [
    {
        id: 'blog-content-automation',
        title: 'Générateur de Blog IA Autonome',
        subtitle: 'Une machine à contenu SEO qui tourne toute seule',
        excerpt: 'De la recherche de mots-clés à la publication WordPress : un pipeline de contenu SEO entièrement automatisé.',
        image: '/images/blog-automation.png',
        technologies: ['n8n', 'OpenAI (GPT-4)', 'WordPress API', 'Perplexity', 'Midjourney'],
        stats: [
            { label: 'Gain de Temps', value: '-90%' },
            { label: 'Volume', value: '5 arts/sem' },
            { label: 'Coût', value: 'Divisé par 10' }
        ],
        challenge: "Maintenir un blog actif avec du contenu pertinent et optimisé SEO demande des heures de recherche, de rédaction, et d'intégration. Faire appel à des rédacteurs humains est coûteux et lent.",
        solution: "Un workflow n8n entièrement autonome qui agit comme une équipe éditoriale complète. Il ne se contente pas de rédiger : il recherche l'information fraîche, structure le propos, génère des illustrations uniques et publie directement sur le CMS.",
        process: [
            {
                step: 1,
                title: 'Veille & Recherche',
                description: 'Le workflow récupère automatiquement des sources (RSS, APIs, Google Sheets) puis détecte les sujets pertinents. Un agent IA analyse ces données et sélectionne les thèmes exploitables pour un article de blog.'
            },
            {
                step: 2,
                title: 'Planification',
                description: 'Un agent GPT génère le titre, le slug et les métadonnées SEO. Ensuite, un second agent crée un plan structuré (H2, H3) afin d\'assurer cohérence, lisibilité et optimisation SEO.'
            },
            {
                step: 3,
                title: 'Rédaction & Illustration',
                description: 'L’IA rédige l’article section par section, puis recherche ou génère une image adaptée (via Pexels ou modèle d\'image). L’image est ensuite uploadée automatiquement dans WordPress.'
            },
            {
                step: 4,
                title: 'Publication',
                description: 'Le contenu HTML est nettoyé, mis en forme, l’image est assignée comme "featured image" puis le workflow crée automatiquement le brouillon WordPress prêt à être relu et publié.'
            }
        ],
        faq: [
            {
                question: "Le contenu est-il détectable comme IA ?",
                answer: "Le prompt engineering avancé et le processus multi-étapes (planification puis rédaction) garantissent un style naturel et une structure logique souvent absente des générations brutes."
            },
            {
                question: "Puis-je choisir les sujets ?",
                answer: "Oui, le système peut fonctionner en mode 'Pilote Automatique' sur la base de veille, ou en mode 'Commande' à partir d'une liste de mots-clés fournie."
            }
        ],
        downloadUrl: '#'
    },
    // On garde le second exemple en placeholder pour l'instant, adapté a minima pour éviter les erreurs TS
    {
        id: 'bluesky-content-generator',
        title: 'Générateur de contenu Bluesky',
        subtitle: 'Votre veille tech transformée en posts viraux automatiquement',
        excerpt: 'Un système de veille et de publication automatique qui détecte les tendances tech et publie sur Bluesky & Twitter sans intervention.',
        image: '/images/bluesky-generator.png',
        technologies: ['n8n', 'OpenAI', 'Bluesky API', 'Twitter API', 'RSS'],
        stats: [
            { label: 'Veille', value: '24/7' },
            { label: 'Posts/jour', value: 'Auto' },
            { label: 'Engagement', value: '+300%' }
        ],
        challenge: "Suivre l'actualité Tech et IA en temps réel est chronophage. Transformer cette veille en contenu engageant pour les réseaux sociaux demande encore plus d'efforts créatifs et une régularité sans faille, difficile à maintenir manuellement.",
        solution: "Ce workflow automatise toute la chaîne de valeur : de la détection de l'information à sa diffusion. Il agit comme un community manager personnel qui ne dort jamais, capable d'analyser des centaines d'articles pour n'en garder que la quintessence.",
        process: [
            {
                step: 1,
                title: 'Veille & Détection d’Opportunités',
                description: 'Chaque jour, le système analyse automatiquement les meilleures sources tech et IA du web. Il détecte les tendances émergentes, identifie les idées à fort potentiel et repère les sujets qui génèrent déjà de l’engagement.'
            },
            {
                step: 2,
                title: 'Sélection & Stratégie',
                description: 'L’IA analyse les contenus récoltés, les compare entre eux et sélectionne ceux qui ont le plus de chances de performer. Elle priorise les sujets en fonction de leur actualité, originalité et potentiel viral.'
            },
            {
                step: 3,
                title: 'Rédaction & Format Social',
                description: 'Le message final est conçu pour capturer l’attention en quelques secondes : un résumé percutant, une accroche forte et une sélection précise de hashtags. Tout est optimisé pour booster la visibilité sur Bluesky ou Twitter.'
            },
            {
                step: 4,
                title: 'Publication Automatique',
                description: 'Après validation par l’IA, le post est envoyé directement sur Bluesky/Twitter via une connexion sécurisée. Le tout se fait sans intervention humaine, au moment optimal pour maximiser l’engagement.'
            }
        ],
        faq: [
            {
                question: "Puis-je valider les posts avant publication ?",
                answer: "Oui, une option 'Human-in-the-loop' peut être activée pour recevoir une notification (Slack/Telegram) avec un bouton d'approbation."
            },
            {
                question: "Est-ce compatible avec LinkedIn ?",
                answer: "Le core du système est identique. Il suffit d'ajouter un nœud LinkedIn dans n8n et d'adapter le prompt de rédaction pour un ton plus 'corporate'."
            }
        ],
        downloadUrl: '#'
    }
];
