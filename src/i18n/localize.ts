import { type Locale, locales } from "./config";

/** A value translated into every supported language: `{ fr: "…", en: "…" }`. */
export type Localized<T = string> = { [L in Locale]: T };

/** Text that is either the same in every language, or translated. */
export type Text = string | Localized;

/** Recursively replaces every `Localized<T>` in `T` by `T` for a single language. */
export type Localize<T> =
  T extends Localized<infer U>
    ? U
    : T extends readonly (infer E)[]
      ? Localize<E>[]
      : T extends (...args: never[]) => unknown
        ? T
        : T extends object
          ? { [K in keyof T]: Localize<T[K]> }
          : T;

export function isLocalized(value: unknown): value is Localized<unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return (
    keys.length === locales.length &&
    locales.every((locale) => keys.includes(locale))
  );
}

/**
 * Resolve a content tree for one language.
 *
 * Every `{ fr, en }` object is replaced by the value for `locale`; everything
 * else (plain strings, numbers, arrays, nested objects) is kept as-is.
 */
export function localize<T>(value: T, locale: Locale): Localize<T> {
  if (isLocalized(value)) return value[locale] as Localize<T>;
  if (Array.isArray(value))
    return value.map((item) => localize(item, locale)) as Localize<T>;
  if (value && typeof value === "object" && typeof value !== "function")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localize(item, locale)]),
    ) as Localize<T>;
  return value as Localize<T>;
}
