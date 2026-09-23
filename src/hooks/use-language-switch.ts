"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { locales } from "@/i18n/generated/locales";
import { setSessionPreference } from "@/lib/preferences";

export function useLanguageSwitch(locale: string) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [failure, setFailure] = useState(false);
  const languageHref = (value: string) =>
    pathname.replace(/^\/[^/]+/, `/${value}`);

  const switchLanguage = (value: string) => {
    if (pending || value === locale || !locales.includes(value)) return;
    setFailure(false);
    setSessionPreference("NEXT_LOCALE", value);
    const next = languageHref(value) + location.search + location.hash;
    startTransition(async () => {
      try {
        router.replace(next, { scroll: false });
      } catch {
        setFailure(true);
      }
    });
  };

  return { languageHref, switchLanguage, pending, failure };
}
