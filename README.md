# rodespe.com v3 — portfolio Next.js (design AURORA)

Refonte du portfolio en **Next.js 14 (App Router) + TypeScript + Tailwind**, design « AURORA » (sombre, traînées néon au curseur, dégradé violet→teal). Contenu **fidèle au site actuel** (repris de rodespe.com + repo `Portfolio_Rodrigue_V2`).

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production (validé)
```

## Structure

- `src/app/layout.tsx` — layout global : métadonnées/OG, fond (canvas + grille + glow), Nav, Footer, scripts.
- `src/app/page.tsx` — accueil : hero, certifications, projets (filtre), à propos, parcours (timeline alternée), compétences (onglets), contact.
- `src/app/etudes-de-cas/page.tsx` — liste des études de cas.
- `src/app/etudes-de-cas/[slug]/page.tsx` — détail (SSG, `generateStaticParams`) : défi, solution, process, FAQ réelles, CTA.
- `src/app/sitemap.ts`, `src/app/robots.ts` — SEO.
- `src/components/` — `Nav`, `Footer`, `SiteScripts` (interactions client : trails, filtres, onglets, reveal, burger, to-top).
- `src/data/site.ts` — données réelles : profil, réseaux, certifications, 9 projets, 9 entrées parcours, compétences (15 tech + 8 soft), langues.
- `src/data/caseStudies.ts` — 4 études de cas complètes (vraies FAQ).
- `src/app/globals.css` — design system AURORA.

## Assets

Site autonome : photo, `og-image.png`, `llms.txt` et les images d'études de cas sont dans `public/`. Les autres visuels de projets viennent de Pexels (externe). Les logos de certifs sont des monogrammes (pas de dépendance externe). `robots.txt` et `sitemap.xml` sont générés par Next (`robots.ts`, `sitemap.ts`).

## Reste

- Bouton « Télécharger CV » : placer `cv.pdf` dans `public/` puis remplacer le `href="#"` du bouton (hero) par `/cv.pdf`.
- Formulaire de contact : déjà branché sur Formspree (`https://formspree.io/f/xojndkoe`).

## Déploiement (VPS Docker + Traefik, remplace la v2)

Fichiers fournis : `Dockerfile` (multi-stage, `output: standalone`), `docker-compose.prod.yml` (réseau `traefik_public`, resolver `mytlschallenge`, Host `rodespe.com` + redirect `www` + HTTP→HTTPS, port interne 3000), `deploy.sh`.

```bash
# 1. Pousser le projet sur le VPS (git ou rsync) dans ~/rodespe-v3
# 2. ARRÊTER la v2 d'abord (sinon conflit de route Traefik sur rodespe.com)
cd ~/portfolio && docker compose -f docker-compose.prod.yml down
# 3. Lancer la v3
cd ~/rodespe-v3 && ./deploy.sh
```

⚠️ Vérifier que les **entrypoints Traefik** s'appellent bien `web` (80) et `websecure` (443) sur ton VPS ; sinon adapter dans `docker-compose.prod.yml`. Le resolver TLS est `mytlschallenge` (comme la v2).
