/** @type {import('next').NextConfig} */

// CSP permissive mais utile : autorise self + les tiers réellement utilisés
// (polices Fontshare, images distantes, envoi Formspree). À durcir après test.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "img-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
  "font-src 'self' data: https://cdn.fontshare.com",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Content-Security-Policy', value: csp },
];

const nextConfig = {
  poweredByHeader: false,
  output: 'standalone',
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: 'static.cdnlogo.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|woff2|woff)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      { source: '/:path*', headers: securityHeaders }
    ];
  },
};
export default nextConfig;
