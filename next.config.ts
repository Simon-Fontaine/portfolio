import type { NextConfig } from "next";
import { locales } from "./src/i18n/config";
import { CV_PUBLIC_DIR, cvHref } from "./src/lib/cv";

// React's development build uses eval() for debugging features (for example
// to rebuild server stack traces in the browser), so `next dev` needs
// 'unsafe-eval'. Production builds never call eval(): the policy stays strict.
const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()",
  },
  {
    // No third-party resources are loaded. Inline scripts stay allowed for the
    // static pages Next.js prerenders (a nonce would force dynamic rendering).
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Do not let `next dev` write an AGENTS.md file into the repository.
  agentRules: false,
  experimental: {
    globalNotFound: true,
    // Import only the icons actually used (the package re-exports 113 icons).
    optimizePackageImports: ["@getpapillon/papicons"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Generated CVs: downloadable, but kept out of search results.
        source: `/${CV_PUBLIC_DIR}/:file*`,
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
  async redirects() {
    // Old CV URLs (before the CVs were generated) keep working.
    return locales.map((locale) => ({
      source: `/api/cv/${locale}`,
      destination: cvHref(locale),
      permanent: true,
    }));
  },
};

export default nextConfig;
