import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object | null;
}

const BASE_URL = 'https://rodespe.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

export function useSEO(config: SEOConfig) {
  useEffect(() => {
    const { title, description, canonical, ogTitle, ogDescription, ogImage, ogType, schema } = config;

    // Title
    document.title = title;

    // Helper to upsert a meta tag
    const setMeta = (selector: string, attr: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrValue] = selector.replace('[', '').replace(']', '').replace(/"/g, '').split('=');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };

    // Helper to upsert a link tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Meta tags
    setMeta('meta[name="description"]', 'content', description);
    setLink('canonical', `${BASE_URL}${canonical}`);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', ogTitle || title);
    setMeta('meta[property="og:description"]', 'content', ogDescription || description);
    setMeta('meta[property="og:url"]', 'content', `${BASE_URL}${canonical}`);
    setMeta('meta[property="og:image"]', 'content', ogImage || DEFAULT_IMAGE);
    setMeta('meta[property="og:type"]', 'content', ogType || 'website');

    // Twitter
    setMeta('meta[name="twitter:title"]', 'content', ogTitle || title);
    setMeta('meta[name="twitter:description"]', 'content', ogDescription || description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage || DEFAULT_IMAGE);

    // Structured data — inject or update
    const schemaId = 'seo-page-schema';
    let schemaEl = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (schema) {
      if (!schemaEl) {
        schemaEl = document.createElement('script');
        schemaEl.id = schemaId;
        schemaEl.type = 'application/ld+json';
        document.head.appendChild(schemaEl);
      }
      schemaEl.textContent = JSON.stringify(schema);
    } else if (schemaEl) {
      schemaEl.remove();
    }

    // Update GA4 page view on route change
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-ZZ8NVXV9RS', {
        page_title: title,
        page_location: `${BASE_URL}${canonical}`,
      });
    }
  }, [config.title, config.canonical]);
}
