"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLanguageSwitch } from "@/hooks/use-language-switch";
import { localeOptions } from "@/i18n/generated/locales";
import type { Messages } from "@/i18n/messages";
import {
  applyTheme,
  isTheme,
  readTheme,
  setSessionPreference,
  type Theme,
} from "@/lib/preferences";

export function Preferences({
  locale,
  labels,
}: {
  locale: string;
  labels: Messages["settings"];
}) {
  const [theme, setTheme] = useState<Theme>("system");
  const { switchLanguage, pending, failure } = useLanguageSwitch(locale);
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (!pathname) return;
    const initial = readTheme();
    applyTheme(initial);
    setTheme(initial);
  }, [pathname]);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      applyTheme(readTheme());
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <div className="preferences">
      <div className="flex flex-col gap-3">
        <p id="language-label" className="control-label">
          {labels.language}
        </p>
        <ToggleGroup
          type="single"
          variant="outline"
          value={locale}
          disabled={pending}
          aria-labelledby="language-label"
          onValueChange={switchLanguage}
        >
          {localeOptions.map((option) => (
            <ToggleGroupItem
              key={option.code}
              value={option.code}
              lang={option.lang}
            >
              {option.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-3">
        <p id="theme-label" className="control-label">
          {labels.theme}
        </p>
        <ToggleGroup
          type="single"
          variant="outline"
          value={theme}
          aria-labelledby="theme-label"
          onValueChange={(value) => {
            if (!isTheme(value)) return;
            setTheme(value);
            setSessionPreference("theme", value);
            applyTheme(value);
          }}
        >
          <ToggleGroupItem value="light">
            <Sun aria-hidden="true" />
            {labels.light}
          </ToggleGroupItem>
          <ToggleGroupItem value="dark">
            <Moon aria-hidden="true" />
            {labels.dark}
          </ToggleGroupItem>
          <ToggleGroupItem value="system">
            <Monitor aria-hidden="true" />
            {labels.system}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <p className="text-sm text-muted-foreground max-w-prose">
        {labels.session}
      </p>
      <output className="sr-only" aria-live="polite">
        {pending ? labels.pending : failure ? labels.error : ""}
      </output>
    </div>
  );
}
