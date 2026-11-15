/**
 * Supported languages. The first entry is the default (used when the
 * visitor's browser language is not supported).
 */
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = locales[0];

/** Human-readable metadata for each language (used by the language switch and SEO). */
export const localeInfo: Record<Locale, { name: string; ogLocale: string }> = {
  fr: { name: "Français", ogLocale: "fr_BE" },
  en: { name: "English", ogLocale: "en_GB" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

/**
 * Pick the best supported locale from an `Accept-Language` header.
 * Respects quality values (`q=`) and falls back to the default locale.
 */
export function negotiateLocale(header: string | null | undefined): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const quality = q ? Number.parseFloat(q.trim().slice(2)) : 1;
      return {
        language: tag.toLowerCase().split("-")[0],
        quality: Number.isNaN(quality) ? 0 : quality,
        index,
      };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);
  return (
    (ranked.find((entry) => isLocale(entry.language))?.language as
      | Locale
      | undefined) ?? defaultLocale
  );
}
