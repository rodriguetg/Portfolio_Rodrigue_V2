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
        image: '/images/blog-automation.webp',
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
        image: '/images/bluesky-generator.webp',
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
    },
    {
        id: 'programmatic-seo-engine',
        title: 'Moteur de SEO Programmatique',
        subtitle: 'Templates × données : produire mille pages SEO en une nuit',
        excerpt: "Combiner un template structuré, une base de données et une couche IA pour générer en masse des pages SEO ciblées sur des longues traînes peu concurrentielles.",
        image: 'https://images.pexels.com/photos/1181301/pexels-photo-1181301.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        technologies: ['n8n', 'WordPress REST API', 'OpenAI / Claude', 'Google Sheets', 'DataForSEO'],
        stats: [
            { label: 'Pages générées', value: '1k+/nuit' },
            { label: 'Coût par page', value: '< 0,05 €' },
            { label: 'Time to ship', value: '24 h' }
        ],
        challenge: "Le SEO sur les longues traînes est rentable mais lent : il faut produire des centaines de pages spécialisées (« meilleure table pliante pour balcon », « alternative à Asana pour freelance », « prix moyen plombier 75011 ») pour capter du trafic qualifié. À la main, un rédacteur produit 2 à 3 articles par jour. À ce rythme, un site de 500 pages prend 6 mois.",
        solution: "Un pipeline n8n qui combine un template HTML/Markdown structuré, une base de données (Sheets ou Postgres) et une couche IA contrôlée. Chaque page est générée à partir de variables (« ville », « produit », « persona ») et hydratée par l'IA pour le contenu unique (intro, comparatif, FAQ). La publication WordPress se fait par lots, avec balises SEO et schéma JSON-LD auto-injectés.",
        process: [
            {
                step: 1,
                title: 'Conception du template',
                description: "On définit un schéma de page : H1 dynamique, intro paramétrée, 3 à 5 blocs de contenu (data + IA), section FAQ générée, balises Schema.org. Le template est versionné et testable indépendamment des données."
            },
            {
                step: 2,
                title: 'Préparation du dataset',
                description: "Les variables (mots-clés, villes, produits, prix moyens) sont récupérées depuis Sheets, DataForSEO ou un scrape ciblé. Chaque ligne du dataset équivaut à une page potentielle. Un filtrage par volume de recherche et concurrence ne garde que les opportunités viables."
            },
            {
                step: 3,
                title: 'Hydratation IA',
                description: "Pour chaque ligne, n8n appelle Claude ou GPT avec un prompt structuré : « génère l'intro unique, le comparatif, la FAQ, la conclusion, en respectant ce contexte ». Le résultat est passé par un validateur (longueur min, mots-clés requis, absence d'hallucinations factuelles)."
            },
            {
                step: 4,
                title: 'Publication WordPress par lots',
                description: "Le contenu HTML est mis en forme, l'image featured est sélectionnée (banque interne ou génération IA), les métadonnées SEO sont calculées, et la page est publiée en draft via WordPress REST API. Une review manuelle valide chaque batch avant indexation publique."
            }
        ],
        faq: [
            {
                question: "Comment éviter le duplicate content entre pages ?",
                answer: "Chaque page reçoit un prompt légèrement différent et des éléments uniques (sélection aléatoire dans des pools de tournures, exemples spécifiques à la variable). Un check de similarité (TF-IDF ou embeddings) post-génération filtre les pages trop proches."
            },
            {
                question: "Google sanctionne-t-il ce type de production ?",
                answer: "Tant que le contenu apporte une réelle valeur au lecteur (data réelles, structure claire, intent satisfait), non. Le risque vient des pages générées sans hydratation factuelle ou sans contrôle qualité. Le pipeline inclut une étape de validation pour cela."
            },
            {
                question: "Quel CMS supporte ce système ?",
                answer: "Le workflow est CMS-agnostique. Implémentation native pour WordPress (REST API), adaptable en quelques heures pour Webflow, Sanity, Strapi ou un static site generator (Astro, Next.js)."
            }
        ],
        downloadUrl: '#'
    },
    {
        id: 'continuous-seo-audit',
        title: 'Audit SEO en continu',
        subtitle: 'Un radar qui surveille votre site et alerte quand quelque chose lâche',
        excerpt: "Crawl planifié, monitoring des Core Web Vitals et détection de régressions techniques. Le rapport hebdomadaire arrive directement dans Slack.",
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        technologies: ['n8n', 'Google Search Console API', 'PageSpeed Insights API', 'Firecrawl', 'Slack / Telegram'],
        stats: [
            { label: 'Pages surveillées', value: '10k+' },
            { label: 'Fréquence', value: 'Quotidienne' },
            { label: 'Délai d\'alerte', value: '< 1 h' }
        ],
        challenge: "Un site SEO sain peut perdre 30 % de son trafic en une semaine : une balise canonique qui part en vrille, une catégorie qui passe en noindex après un déploiement, des Core Web Vitals qui régressent. Les agences font des audits tous les trimestres — c'est trois mois trop tard pour rattraper la chute.",
        solution: "Un pipeline qui crawle le site quotidiennement, interroge GSC et PageSpeed Insights, compare avec la veille, et déclenche une alerte ciblée si une métrique sort des bornes. Le rapport hebdomadaire compile les évolutions de trafic, les erreurs d'indexation, les régressions CWV et les opportunités détectées (mots-clés en page 2, snippets perdus).",
        process: [
            {
                step: 1,
                title: 'Crawl & inventaire',
                description: "Chaque nuit, un crawl léger (Firecrawl ou Screaming Frog headless) parcourt le sitemap et un échantillon des pages clés. Il enregistre : status HTTP, balises title/description, canonical, noindex, structured data, taille HTML."
            },
            {
                step: 2,
                title: 'Pull des signaux externes',
                description: "n8n récupère les métriques GSC (impressions, clics, position) sur les 30 derniers jours, les Core Web Vitals via PageSpeed Insights, et les changements d'indexation (Coverage report). Tout est stocké dans une base time-series (Postgres ou Sheets)."
            },
            {
                step: 3,
                title: 'Détection d\'anomalies',
                description: "Un comparateur quotidien repère les régressions : balise title qui change, page qui passe en 404, LCP qui dépasse 2,5 s, perte de position sur un mot-clé top 10. Les seuils sont configurables par catégorie de page."
            },
            {
                step: 4,
                title: 'Reporting & alertes',
                description: "Les régressions critiques déclenchent une alerte immédiate sur Slack ou Telegram avec la page concernée et le diff. Le rapport hebdomadaire (PDF ou doc partagé) consolide les tendances, les top opportunités et les actions recommandées par l'IA."
            }
        ],
        faq: [
            {
                question: "Quelle différence avec un outil comme Sitebulb ou Screaming Frog ?",
                answer: "Les outils classiques sont conçus pour des audits ponctuels lancés à la main. Ce système est continu, time-series, alerting natif. Vous ne perdez pas trois mois à découvrir qu'un canonical a sauté après une mise à jour de plugin."
            },
            {
                question: "Combien coûte le système à faire tourner ?",
                answer: "Sur un site de 10k pages, environ 20 €/mois en API costs (PageSpeed gratuit, GSC gratuit, Firecrawl ~15 €/mois, n8n self-hosted). À comparer aux 800-1500 € d'un audit trimestriel par une agence."
            },
            {
                question: "Quelles alertes sont les plus utiles en pratique ?",
                answer: "Top 3 : pages clés passant en 404 ou redirect imprévu, balises noindex/canonical changeantes après déploiement, Core Web Vitals régressant de plus de 20 % sur les pages génératrices de trafic."
            }
        ],
        downloadUrl: '#'
    }
];
