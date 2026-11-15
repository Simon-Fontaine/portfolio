"use client";

import { usePathname } from "next/navigation";
import { type Locale, localeInfo, locales } from "@/i18n/config";
import { GlobeIcon } from "./icons";

/** The section currently being read (the last one that starts above 30% of the viewport). */
function currentSectionId() {
  let current = "";
  for (const section of document.querySelectorAll("main section[id]")) {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.3)
      current = section.id;
  }
  return current;
}

/**
 * Links to the same page in the other language(s). The visitor stays on the
 * section they were reading instead of being sent back to the top.
 * `compact` shows the language code ("EN") instead of its name ("English").
 */
export function LanguageSwitch({
  locale,
  label,
  compact,
}: {
  locale: Locale;
  label: string;
  compact?: boolean;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(/^\/[^/]+/, "");
  return locales
    .filter((other) => other !== locale)
    .map((other) => (
      <a
        key={other}
        href={`/${other}${rest}`}
        hrefLang={other}
        lang={other}
        aria-label={label}
        className="btn btn-ghost px-3"
        onClick={(event) => {
          const id = currentSectionId();
          if (id && id !== "top")
            event.currentTarget.href = `/${other}${rest}#${id}`;
        }}
      >
        <GlobeIcon aria-hidden="true" />
        {compact ? other.toUpperCase() : localeInfo[other].name}
      </a>
    ));
}
