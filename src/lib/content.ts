import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import type { Locale } from "@/i18n/config";
import { localize } from "@/i18n/localize";

/** All content (career data + interface text) resolved for one language. */
export function getContent(locale: Locale) {
  return {
    locale,
    profile: localize(profile, locale),
    t: localize(ui, locale),
  };
}

export type Content = ReturnType<typeof getContent>;
export type LocalizedProfile = Content["profile"];
export type UiText = Content["t"];

/** Entries shown on the CV (everything unless `cv: false`). */
export function forCv<T extends { cv?: boolean }>(items: T[]) {
  return items.filter((item) => item.cv !== false);
}
