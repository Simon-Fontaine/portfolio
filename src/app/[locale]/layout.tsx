import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/footer";
import { JourneyNavigation } from "@/components/journey-navigation";
import { localeOptions, locales } from "@/i18n/generated/locales";
import { loadMessages } from "@/i18n/generated/messages";
import { message } from "@/i18n/messages";
import { SITE_CONFIG } from "@/lib/constants";
import { themeScript } from "@/lib/preferences";
import "../globals.css";

const geistSans = localFont({
  src: "../fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  const m = await loadMessages(locale);
  const title = message(m.metadata.title, { name: SITE_CONFIG.name });
  const description = m.metadata.description;
  const image = {
    url: `/og/${locale}.png`,
    width: 1200,
    height: 630,
    alt: `${SITE_CONFIG.name} | ${m.common.role}`,
  };
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title,
    description,
    keywords: m.metadata.keywords.split(",").map((k) => k.trim()),
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: m.locale.openGraph,
      alternateLocale: localeOptions
        .filter((o) => o.code !== locale)
        .map((o) => o.openGraph),
      url: `/${locale}`,
      title,
      description,
      siteName: message(m.metadata.siteName, { name: SITE_CONFIG.name }),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const m = await loadMessages(locale);
  return (
    <html
      lang={m.locale.lang}
      dir={m.locale.direction}
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Static theme bootstrap without user input, before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={{ errors: m.errors }}>
          <a href="#main-content" className="skip-to-main">
            {m.common.skip}
          </a>
          <JourneyNavigation
            locale={locale}
            labels={m.navigation}
            languageLabels={{
              pending: m.settings.pending,
              error: m.settings.error,
            }}
          />
          <div className="page-shell">
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer locale={locale} m={m} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
