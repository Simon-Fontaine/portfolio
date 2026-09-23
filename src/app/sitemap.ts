import type { MetadataRoute } from "next";
import { locales } from "@/i18n/generated/locales";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(
      locales.map((locale) => [locale, `${SITE_CONFIG.url}/${locale}`]),
    ),
    "x-default": SITE_CONFIG.url,
  };
  return [
    ...locales.map((locale) => ({
      url: `${SITE_CONFIG.url}/${locale}`,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages },
    })),
    ...locales.map((locale) => ({
      url: `${SITE_CONFIG.url}/${locale}/privacy`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_CONFIG.url}/${l}/privacy`]),
        ),
      },
    })),
  ];
}
