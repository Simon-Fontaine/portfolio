import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Keep local development from overwriting the build used by production tests.
  distDir:
    process.env.NODE_ENV === "development" ? ".next" : ".next-production",
  poweredByHeader: false,
  outputFileTracingIncludes: { "/api/cv/*": ["./documents/*.pdf"] },
  experimental: { optimizePackageImports: ["lucide-react"] },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Restrict embedded content without forcing dynamic nonce rendering for static pages.
          {
            key: "Content-Security-Policy",
            value:
              "object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; frame-src 'none'; connect-src 'self'; font-src 'self'; img-src 'self' data: blob:",
          },
        ],
      },
    ];
  },
};
export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
