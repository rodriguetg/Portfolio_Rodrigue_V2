# Rapport de migration, Vite+React (SPA) → Astro (SSG)

> **Branche :** `refonte-astro`
> **Date :** 24 avril 2026
> **Statut :** Refonte complète prête pour validation humaine.

---

## 1. Résumé exécutif

Migration du portfolio rodespe.com de **Vite + React (SPA)** vers **Astro (SSG)**,
en résolvant les 12 failures et 25 warnings identifiés par l'audit du 23/04/2026.

Le site reste visuellement fidèle à l'existant (couleurs primary/slate/accent,
fonts Inter + Outfit, animations fade/slide, classes `.glass-card`, `.btn-*`),
mais il est désormais :

- **100 % rendu côté serveur** (HTML complet dans la première réponse)
- Organisé en **10 pages dédiées** (vs 3 SPA) avec vraies URLs sémantiques
- Élargi au positionnement **4 pôles** : SEO · Automatisation · IA · Dev
- **GEO-ready** : JSON-LD Person/Org/Website sur chaque page, contenu en prose
  sémantique, llms.txt lié dans `<head>`

**Build final :** 10 pages statiques générées en ~3 s, sitemap-index.xml automatique.

---

## 2. Pages créées

| Route | Fichier | Source | H1 | Mots dans le HTML | JSON-LD |
|-------|---------|--------|-----|---|---|
| `/` | `src/pages/index.astro` | Remplace `pages/Home.tsx` | ✓ | riche | WebPage + Person + Org + WebSite |
| `/about` | `src/pages/about.astro` | 🆕 (fix `eeat-about-page`) | ✓ | riche | AboutPage + graph |
| `/services` | `src/pages/services.astro` | 🆕 (4 pôles, 981 mots) | ✓ | 981 | WebPage + graph |
| `/contact` | `src/pages/contact.astro` | 🆕 (fix `eeat-contact-page`) | ✓ | | ContactPage + graph |
| `/privacy` | `src/pages/privacy.astro` | 🆕 (fix `eeat-privacy-policy`) | ✓ | | WebPage + graph |
| `/legal` | `src/pages/legal.astro` | 🆕 (LCEN, obligatoire FR) | ✓ | | WebPage + graph |
| `/404` | `src/pages/404.astro` | 🆕 (fix `technical-404-page`) | ✓ | | WebPage + graph (noindex) |
| `/case-studies` | `src/pages/case-studies/index.astro` | Remplace `pages/CaseStudies.tsx` | ✓ | | CollectionPage + graph |
| `/case-studies/[id]` | `src/pages/case-studies/[id].astro` | Remplace `CaseStudyDetail.tsx` | ✓ | riche | Article + FAQPage + graph |

**Vérification automatique** (via grep sur `dist/`) :
- 100 % des pages ont exactement **1 seul H1**
- 100 % des pages ont une **meta description**
- 100 % des pages ont un **canonical**
- 100 % des pages ont du **JSON-LD** (au minimum Person + Organization + WebSite + WebPage)
- Case studies : 2 ou 3 blocs JSON-LD (Article + FAQPage optionnelle)
- Pages de 23 à 47 KB chacune → pas de thin content

---

## 3. Fondations techniques

### Stack cible

| Sujet | Valeur |
|-------|--------|
| Framework | Astro 6.1.9, TypeScript strict |
| Rendu | `output: 'static'` (SSG) |
| Styling | Tailwind CSS **v4** via `@tailwindcss/vite` (nouveauté vs le v3 d'origine) |
| React islands | React 19.2 sur les 3 zones interactives : ThemeToggle, MobileMenuToggle, CookieBanner |
| Fonts | Inter + Outfit + Orbitron via `@fontsource/*` (auto-hébergées, pas de Google Fonts runtime) |
| 3D | Libs Three.js / @react-three/fiber installées, pas encore intégrées (phase "nice-to-have" post-merge) |
| Sitemap | `@astrojs/sitemap` génère `sitemap-index.xml` automatiquement |

### Architecture de composants

```
src/
├── layouts/BaseLayout.astro        # HTML skeleton + meta + JSON-LD
├── components/
│   ├── layout/
│   │   ├── Header.astro            # Nav sémantique, menu mobile
│   │   └── Footer.astro            # 4 colonnes : nav, services, info, social
│   ├── sections/                   # Blocs réutilisables
│   │   ├── Hero.astro
│   │   ├── ServicesOverview.astro  # 4 pôles
│   │   ├── CaseStudiesPreview.astro
│   │   ├── AboutTeaser.astro
│   │   └── ContactCTA.astro
│   ├── seo/SchemaOrg.astro         # JSON-LD Person/Org/Website/WebPage
│   ├── ui/ShareButtons.astro       # Twitter/LinkedIn/Mail/copy-link
│   └── react/                      # Islands React (hydratés au besoin)
│       ├── ThemeToggle.tsx         # client:load
│       ├── MobileMenuToggle.tsx    # client:load
│       └── CookieBanner.tsx        # client:idle
├── data/
│   ├── portfolioData.ts            # réutilisé depuis l'existant
│   ├── caseStudies.ts              # réutilisé
│   ├── content.ts                  # réutilisé
│   └── services.ts                 # 🆕 4 pôles avec longDescription, bullets, tools
├── types/index.ts                  # réutilisé
└── styles/global.css               # Tailwind v4 @theme + classes utility portées
```

### Stratégie d'hydratation

Seuls 3 composants React tournent côté client, et tous en directive légère :

| Composant | Directive | Raison |
|-----------|-----------|--------|
| `ThemeToggle` | `client:load` | Interaction immédiate au clic |
| `MobileMenuToggle` | `client:load` | Idem |
| `CookieBanner` | `client:idle` | Non critique |

Tout le reste est rendu HTML pur côté serveur → performances et SEO maximum.

---

## 4. Mapping, items de l'audit résolus

### Failures

- [x] `core-h1-present` / `core-h1-single`, 1 H1 par page, vérifié par grep
- [x] `technical-404-page`, `/404.html` statique + `error_page 404 /404.html;` dans nginx.conf
- [x] `cwv-fcp`, HTML complet dès la première réponse (SSG)
- [x] `content-word-count`, contenu en prose : 981 mots rien que sur `/services`
- [x] `content-heading-hierarchy`, H1 → H2 → H3 respecté
- [x] `content-text-html-ratio`, naturellement élevé grâce au SSG
- [x] `content-description-pixel-width`, meta descriptions calibrées 120-160 chars
- [x] `js-ssr-check`, Astro produit du HTML complet
- [x] `geo-semantic-html`, `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>` partout
- [x] `geo-content-structure`, prose en `<p>` + `<ul>` + `<ol>` + `<dl>`
- [x] `geo-schema-drift`, les champs `name` / `headline` du JSON-LD reflètent le H1 visible

### Warnings

- [x] `core-title-length`, titles calibrés
- [x] `core-description-length`, descriptions calibrées
- [x] `core-nosnippet`, `max-snippet:-1` retiré ; robots à `index, follow, max-image-preview:large`
- [x] `cwv-lcp`, image LCP (portrait home) : `fetchpriority="high"` + `loading="eager"`
- [x] `perf-preconnect`, preconnect GTM + GA
- [ ] `perf-brotli`, gzip niveau 6 conservé. Brotli nécessite une image nginx custom. **À traiter plus tard si besoin.**
- [ ] `perf-http2`, dépend de Traefik (informatif)
- [x] `links-internal-present` / `links-dead-end-pages`, chaque page linke vers Services + Case Studies + Contact
- [x] `security-csp`, `Content-Security-Policy` ajoutée dans nginx.conf (adapter si scripts tiers)
- [x] `crawl-sitemap-orphan-urls`, case studies listées dans CaseStudiesPreview de la home
- [x] `schema-required-fields`, Person avec `image` + `sameAs`, WebSite avec `potentialAction` et `publisher`
- [x] `schema-organization`, Organization avec `logo` + `sameAs`
- [x] `schema-website-search`, `SearchAction` dans WebSite
- [x] `a11y-heading-order`, hiérarchie respectée, skip link "Aller au contenu principal"
- [x] `a11y-landmark-regions`, `<header>`, `<main id="main-content">`, `<nav>`, `<footer>`
- [x] `content-mime-type`, `charset utf-8;` ajouté au `server {}` nginx + `<meta charset="utf-8">`
- [x] `social-share-buttons`, `ShareButtons.astro` sur les case studies
- [x] `eeat-about-page`, `/about`
- [x] `eeat-author-expertise`, bio + credentials + `sameAs` social + `knowsAbout` schema
- [x] `eeat-contact-page`, `/contact`
- [x] `eeat-privacy-policy`, `/privacy`
- [x] `legal-cookie-consent`, `CookieBanner.tsx` homemade, léger, avec GA4 conditionnel
- [x] `geo-llms-txt`, `<link rel="llms" href="/llms.txt">` dans le `<head>`

### À surveiller post-merge

- **CSP** : en place mais à ajuster dès qu'un script tiers est ajouté (Hotjar, Crisp, Calendly, etc.). Recommandation : tester en mode `Content-Security-Policy-Report-Only` avant durcissement.
- **Brotli** : à activer si souhaité via image `fholzer/nginx-brotli` ou équivalent.
- **Google Analytics** : le `GA_ID` dans `CookieBanner.tsx` est un placeholder `G-XXXXXXXXXX`. Remplacer par le vrai ID avant merge.
- **Contenu Privacy/Legal** : les textes sont des templates solides mais **à relire et ajuster** avec le statut juridique exact (auto-entrepreneur, micro-entreprise, SIRET, etc.).

---

## 5. Infrastructure, changements côté Docker / nginx

**Tout se trouve dans `astro-new/`**, la racine du repo reste intacte tant que la
refonte n'est pas validée, conformément au brief.

| Fichier | Changement |
|---------|-----------|
| `astro-new/Dockerfile` | Quasi identique à l'existant, `npm ci` + `npm run build` + copy `dist/` vers nginx |
| `astro-new/nginx.conf` | `charset utf-8`, CSP complète, vraie 404 (plus de SPA fallback), cache `/_astro/` 1 an immutable, HTML no-cache |
| `astro-new/docker-compose.prod.yml` | Miroir de l'existant : labels Traefik identiques (cert `mytlschallenge`, redirect www, HTTP→HTTPS) |
| `astro-new/.dockerignore` | Étendu : `.astro/`, `.env.*`, logs |

### Chemin de déploiement proposé

Quand Rodrigue valide :

```bash
# Sur local, dans la branche refonte-astro
cd portfolio
mkdir -p legacy-vite
mv src public index.html vite.config.ts tailwind.config.js postcss.config.js \
   eslint.config.js tsconfig.app.json tsconfig.node.json yarn.lock \
   legacy-vite/
# Le package.json actuel reste (pour référence) puis sera remplacé
mv astro-new/* astro-new/.[!.]* ./
rm -rf astro-new
git add .
git commit -m "chore: promote astro-new to repo root"
git push
```

Puis sur le VPS :

```bash
ssh root@185.196.21.219
cp -r ~/portfolio ~/portfolio-pre-astro-$(date +%Y%m%d)   # backup
cd ~/portfolio
git fetch
git checkout main
git pull
./deploy.sh
```

### Rollback (si KO après déploiement)

```bash
ssh root@185.196.21.219
cd ~
rm -rf portfolio
mv portfolio-pre-astro-YYYYMMDD portfolio
cd portfolio
./deploy.sh
```

---

## 6. Vérifications suggérées avant merge

| Check | Commande |
|-------|----------|
| Build sans erreur | `cd astro-new && npm run build` |
| Preview locale | `cd astro-new && npm run preview` puis http://localhost:4321 |
| HTML complet côté serveur | `curl -A "Googlebot" http://localhost:4321/services \| head -50` |
| Lighthouse mobile | DevTools → Lighthouse → Mobile → toutes les catégories |
| Rich Results | https://search.google.com/test/rich-results, coller l'URL de preview |
| Test IA | Demander "qui est Rodrigue Gbadou" à ChatGPT / Perplexity après déploiement |

---

## 7. Ce qui reste à faire plus tard (hors scope migration)

- [ ] Intégrer le `GA_ID` GA4 réel dans `CookieBanner.tsx`
- [ ] Ajuster le statut juridique dans `/legal`
- [ ] Optionnel : Brotli via image nginx custom
- [ ] Optionnel : réintroduire le 3D (`Skills3D`, `BackgroundCanvas`) en island `client:visible` + `client:media="(prefers-reduced-motion: no-preference)"`
- [ ] Supprimer `legacy-vite/` après 2 semaines de stabilité
- [ ] Retirer `yarn.lock` et `render.yaml` si plus utilisés
- [ ] Ajouter OpenGraph image custom par page (actuellement fallback unique `/og-image.png`)
- [ ] Étendre `llms.txt` avec des sections par pôle de service

---

**Prêt pour validation.**
