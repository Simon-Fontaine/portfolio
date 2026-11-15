import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Journey } from "@/components/journey";
import { SiteFooter } from "@/components/site-footer";
import { isLocale, locales } from "@/i18n/config";
import { getContent } from "@/lib/content";
import { cvHref } from "@/lib/cv";
import { alternates, openGraphLocales, sectionIds, siteUrl } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import { fontVariables } from "../fonts";
import "../globals.css";

// Only /fr and /en exist: any other first segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1917" },
  ],
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { profile: p, t } = getContent(locale);
  const title = `${p.name} | ${p.headline}`;
  return {
    metadataBase: siteUrl,
    title: { default: title, template: `%s | ${p.name}` },
    description: p.summary,
    applicationName: `${p.name} – ${t.meta.siteName}`,
    authors: [{ name: p.name, url: siteUrl.href }],
    creator: p.name,
    alternates: alternates(locale),
    openGraph: {
      type: "profile",
      firstName: p.name.split(" ")[0],
      lastName: p.name.split(" ").slice(1).join(" "),
      siteName: `${p.name} – ${t.meta.siteName}`,
      title,
      description: p.summary,
      url: `/${locale}`,
      ...openGraphLocales(locale),
    },
    twitter: { card: "summary_large_image", title, description: p.summary },
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const { profile: p, t } = content;

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap (no user input), must run before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="btn btn-primary fixed top-2 left-2 z-50 -translate-y-24 focus:translate-y-0"
        >
          {t.nav.skip}
        </a>
        <Journey
          locale={locale}
          name={p.name}
          steps={(["top", ...sectionIds] as const).map((id) => ({
            id,
            label: t.navItems[id],
          }))}
          cv={{ href: cvHref(locale), label: t.actions.downloadCv }}
          labels={{
            nav: t.nav.label,
            open: t.nav.open,
            close: t.nav.close,
            menu: t.nav.menu,
            theme: t.theme.toggle,
            language: t.nav.language,
          }}
        />
        <div className="page-shell flex flex-1 flex-col">
          <main id="main" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <SiteFooter content={content} />
        </div>
      </body>
    </html>
  );
}
