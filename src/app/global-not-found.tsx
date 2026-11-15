import type { Metadata } from "next";
import { ui } from "@/content/ui";
import { defaultLocale, locales } from "@/i18n/config";
import { themeScript } from "@/lib/theme";
import { fontVariables } from "./fonts";
import "./globals.css";

/*
 * 404 page for every unknown URL (including /fr/… and /en/…).
 * The site's root layout lives under the dynamic [locale] segment, so Next.js
 * cannot server-render a localized not-found there; this page is bilingual.
 */
export const metadata: Metadata = {
  title: locales.map((l) => ui.errors.notFoundTitle[l]).join(" · "),
  robots: { index: false },
};

export default function GlobalNotFound() {
  const e = ui.errors;
  return (
    <html
      lang={defaultLocale}
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap (no user input). */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main className="container-page flex min-h-svh flex-col items-center justify-center gap-12 py-16 text-center">
          <p className="font-display text-xl font-bold text-accent">404</p>
          {locales.map((locale, index) => {
            const Heading = index === 0 ? "h1" : "h2";
            return (
              <div
                key={locale}
                lang={locale}
                className="flex flex-col items-center gap-4"
              >
                <Heading className="text-4xl sm:text-5xl">
                  {e.notFoundTitle[locale]}
                </Heading>
                <p className="max-w-md text-muted-foreground">
                  {e.notFoundText[locale]}
                </p>
                <a
                  href={`/${locale}`}
                  className={
                    index === 0 ? "btn btn-primary" : "btn btn-secondary"
                  }
                >
                  {e.home[locale]}
                </a>
              </div>
            );
          })}
        </main>
      </body>
    </html>
  );
}
