import { useEffect, useState } from 'react';

const CONSENT_KEY = 'cookie-consent';
const GA_ID = 'G-XXXXXXXXXX';

type Consent = 'granted' | 'denied' | null;

function readConsent(): Consent {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(CONSENT_KEY);
  return v === 'granted' || v === 'denied' ? v : null;
}

function loadGA4(id: string) {
  if (!id || id === 'G-XXXXXXXXXX') return;
  if (document.getElementById('ga4-script')) return;
  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  const inline = document.createElement('script');
  inline.id = 'ga4-inline';
  inline.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${id}', { anonymize_ip: true });
  `;
  document.head.appendChild(inline);
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const c = readConsent();
    setConsent(c);
    if (c === 'granted') loadGA4(GA_ID);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    setConsent('granted');
    loadGA4(GA_ID);
  };

  const refuse = () => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    setConsent('denied');
  };

  if (!mounted || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[min(560px,calc(100%-2rem))]"
    >
      <div className="glass-card p-5 text-sm text-slate-300 shadow-2xl">
        <p className="mb-3">
          Ce site utilise des cookies statistiques anonymes (Google Analytics 4)
          pour comprendre l'audience et améliorer le contenu. Aucune donnée
          personnelle n'est partagée avec des tiers publicitaires.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <button onClick={refuse} type="button" className="btn btn-secondary text-xs px-4 py-2">
            Refuser
          </button>
          <button onClick={accept} type="button" className="btn btn-primary text-xs px-4 py-2">
            Accepter
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Voir la{' '}
          <a href="/privacy" className="text-primary-400 hover:underline">
            politique de confidentialité
          </a>
          .
        </p>
      </div>
    </div>
  );
}
