import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { defaultLocale, type Locale, localeInfo, locales } from "@/i18n/config";

/** Canonical origin, taken from the content so there is a single place to change it. */
export const siteUrl = new URL(profile.website);

/** Section anchors of the home page, in display order (also used by the navigation). */
export const sectionIds = [
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
] as const;

/**
 * hreflang alternates and canonical URL for a page available in every locale.
 * `path` is the part after the locale, e.g. "" or "/privacy".
 */
export function alternates(locale: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
      // "/" picks the visitor's language (see src/proxy.ts).
      "x-default": path ? `/${defaultLocale}${path}` : "/",
    },
  };
}

export function openGraphLocales(locale: Locale) {
  return {
    locale: localeInfo[locale].ogLocale,
    alternateLocale: locales
      .filter((l) => l !== locale)
      .map((l) => localeInfo[l].ogLocale),
  };
}
