import type { LucideIcon } from 'lucide-react';
import { Search, Workflow, Brain, Code } from 'lucide-react';

export interface Service {
  slug: string;
  icon: LucideIcon;
  iconName: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  bullets: string[];
  tools: string[];
  cta: { label: string; href: string };
}

export const services: Service[] = [
  {
    slug: 'seo',
    icon: Search,
    iconName: 'search',
    title: 'SEO',
    tagline: 'Audits, stratégie, contenu, pSEO',
    description:
      "Audits techniques, recherche de mots-clés, analyse de la concurrence, optimisation on-page, netlinking, et stratégie de contenu programmatique pour générer des milliers de pages ciblées.",
    longDescription:
      "Le SEO n'est pas une loterie. Je pars toujours d'un audit technique complet (Core Web Vitals, indexation GSC, rendu JavaScript, maillage interne) avant de parler contenu. Une fois les fondations saines, je définis l'architecture sémantique via un clustering SERP-based (mots-clés regroupés par intention réelle, pas par similarité textuelle), puis je déroule le contenu — on-page optimisé ou programmatique (pSEO) pour les projets à fort volume. Expérience concrète en alternance chez Primelis, agence SEO de référence en France, et sur plusieurs sites personnels où je pousse pSEO + automatisation LLM.",
    bullets: [
      'Audits SEO techniques (GSC, Core Web Vitals, indexation, rendu JS)',
      'Recherche de mots-clés et clustering sémantique SERP-based',
      'pSEO : pages à grande échelle via templates + data sources',
      'Optimisation on-page (titles, meta, schema JSON-LD, maillage interne)',
      'Reporting mensuel GSC + GA4 avec actions prioritaires',
    ],
    tools: ['Semrush', 'Ahrefs', 'Screaming Frog', 'GSC', 'GA4', 'Sistrix'],
    cta: { label: 'Voir les case studies SEO', href: '/case-studies' },
  },
  {
    slug: 'automation',
    icon: Workflow,
    iconName: 'workflow',
    title: 'Automatisation',
    tagline: 'n8n, Make, scraping, workflows',
    description:
      "Création d'automatisations no-code et low-code pour libérer votre temps et scaler vos opérations. Spécialiste n8n, je connecte vos outils (CRM, emails, APIs, bases de données) avec des workflows fiables et maintenables.",
    longDescription:
      "Les tâches répétitives tuent la productivité. Je conçois des workflows n8n, Make et Zapier qui remplacent les process manuels — de la veille commerciale à la publication éditoriale multi-canal. Côté n8n, je suis Certified Creator avec plusieurs workflows publics. Je connecte vos outils métier (CRM, Notion, Airtable, Stripe, APIs custom) via des flows documentés, monitorés et versionnés. Au besoin, je déploie n8n en self-hosted sur VPS Docker pour garder le contrôle sur vos données et économiser les frais SaaS.",
    bullets: [
      'Workflows n8n auto-hébergés ou cloud, versionnés et documentés',
      'Scraping web fiable (Playwright, Browserless, anti-bot)',
      "Intégration d'APIs (Notion, Airtable, Google, Stripe, CRMs)",
      'Alerting, monitoring et retry automatisés',
      'Automatisation éditoriale (blog posts, social media, newsletters)',
    ],
    tools: ['n8n', 'Make', 'Zapier', 'Airops', 'Docker', 'Python'],
    cta: { label: 'Découvrir mes workflows', href: '/case-studies' },
  },
  {
    slug: 'ia',
    icon: Brain,
    iconName: 'brain',
    title: 'Intelligence Artificielle',
    tagline: 'LLMs, agents, prompts, Claude, OpenAI',
    description:
      "Intégration concrète de l'IA dans vos process métier. Prompt engineering, agents autonomes, RAG, assistants personnalisés. Expérience avec Claude, OpenAI, les MCP servers et Claude Code.",
    longDescription:
      "L'IA générative n'a de valeur que quand elle produit du travail réel. Je construis des agents autonomes (Claude, GPT-4) branchés sur vos données métier — RAG, MCP servers custom, tool use multi-étapes — pour automatiser la rédaction de contenu, le support client, la qualification de leads ou la veille. Je maîtrise le prompt engineering avancé (chain-of-thought, structured outputs, prompt caching) et j'intègre les LLM directement dans vos workflows n8n. Mon chantier actuel : pipelines de contenu pSEO entièrement pilotés par LLM.",
    bullets: [
      'Assistants et agents sur mesure (Claude, GPT-4, Gemini)',
      'Prompt engineering avancé (structured outputs, caching, tool use)',
      'Intégration LLM dans workflows n8n et scripts Python',
      'MCP servers custom pour outils métier spécifiques',
      'Pipelines de contenu pSEO entièrement pilotés par LLM',
    ],
    tools: ['Claude', 'OpenAI', 'Gemini', 'Airops', 'Fal.ai', 'Créatomate'],
    cta: { label: 'Voir les projets IA', href: '/case-studies' },
  },
  {
    slug: 'dev',
    icon: Code,
    iconName: 'code',
    title: 'Développement Web',
    tagline: 'Sites, MFA, WordPress, Docker/VPS',
    description:
      "Développement de sites rapides et maintenables : landing pages, sites de niche (MFA Amazon Affiliation), sites WordPress optimisés SEO, et infrastructure Docker/VPS pour héberger vos projets.",
    longDescription:
      "Le bon stack pour le bon projet. Astro ou Next.js pour les sites statiques ultra-rapides (Lighthouse 100), WordPress quand l'éditorial doit rester accessible à une équipe non-tech, templates MFA pour l'affiliation Amazon à grande échelle. Côté infra, je déploie sur VPS Docker + Traefik + Let's Encrypt — plus contrôlable et souvent plus économique qu'une plateforme managée. Je gère aussi la partie invisible : CI/CD GitHub Actions, backups, monitoring, et les petits scripts qui font la différence entre un site qu'on maintient et un site qu'on subit.",
    bullets: [
      'Sites statiques performants (Astro, Next.js, Vite)',
      'Sites WordPress optimisés SEO (pSEO, MFA Amazon)',
      'Déploiement Docker + Traefik + Let\'s Encrypt sur VPS',
      'Setup CI/CD (GitHub Actions), backups, monitoring',
      'Intégration e-commerce (Shopify, WooCommerce)',
    ],
    tools: ['Astro', 'Next.js', 'React', 'WordPress', 'Docker', 'Traefik'],
    cta: { label: 'Voir mes projets', href: '/case-studies' },
  },
];
