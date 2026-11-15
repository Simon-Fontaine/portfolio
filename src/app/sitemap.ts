import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

const pages = [
  { path: "", priority: 1 },
  { path: "/privacy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (locale: string, path: string) =>
    new URL(`/${locale}${path}`, siteUrl).href;
  return pages.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: url(locale, path),
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, url(l, path)])),
      },
    })),
  );
}
