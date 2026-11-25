import { profile } from "@/content/master";
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
