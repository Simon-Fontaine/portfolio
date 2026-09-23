"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguageSwitch } from "@/hooks/use-language-switch";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { localeOptions } from "@/i18n/generated/locales";
import type { Messages } from "@/i18n/messages";
import { SECTION_IDS, SITE_CONFIG } from "@/lib/constants";

export function JourneyNavigation({
  locale,
  labels,
  languageLabels,
}: {
  locale: string;
  labels: Messages["navigation"];
  languageLabels: Pick<Messages["settings"], "pending" | "error">;
}) {
  const { languageHref, switchLanguage, pending, failure } =
    useLanguageSwitch(locale);
  const pathname = usePathname();
  const { active, progress } = useScrollProgress(pathname);
  const home = pathname === `/${locale}`;
  const [open, setOpen] = useState(false);
  const target = useRef<string | null>(null);
  const href = (id: string) => (home ? `#${id}` : `/${locale}#${id}`);
  const languageLinks = localeOptions
    .filter((option) => option.code !== locale)
    .map((option) => (
      <a
        key={option.code}
        className="text-link language-link"
        href={languageHref(option.code)}
        lang={option.lang}
        hrefLang={option.lang}
        aria-disabled={pending || undefined}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            return;
          event.preventDefault();
          switchLanguage(option.code);
        }}
      >
        {option.name}
      </a>
    ));
  const steps = (mobile = false) => (
    <div className="journey-steps">
      <span className="journey-track" aria-hidden="true">
        <span style={{ transform: `scaleY(${home ? progress : 0})` }} />
      </span>
      <ol>
        {SECTION_IDS.map((id, index) => (
          <li
            key={id}
            data-state={
              home
                ? index === active
                  ? "active"
                  : index < active
                    ? "complete"
                    : "upcoming"
                : "upcoming"
            }
          >
            <a
              href={href(id)}
              aria-current={home && index === active ? "location" : undefined}
              onClick={() => {
                if (mobile) {
                  target.current = id;
                  setOpen(false);
                }
              }}
            >
              <span className="journey-dot" aria-hidden="true" />
              <span>{labels[id]}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
  return (
    <>
      <aside className="journey-rail">
        <a href={href("hero")} className="brand-link">
          {SITE_CONFIG.name.split(" ")[0]}
          <span>.</span>
        </a>
        <nav aria-label={labels.label}>{steps()}</nav>
        <div className="flex flex-col items-start gap-2">{languageLinks}</div>
      </aside>
      <header className="mobile-header">
        <a href={href("hero")} className="brand-link">
          Simon<span>.</span>
        </a>
        <span className="mobile-current">
          {home ? labels[SECTION_IDS[active]] : labels.menu}
        </span>
        <div className="navigation-languages">{languageLinks}</div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={labels.open}>
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent
            closeLabel={labels.close}
            onCloseAutoFocus={(event) => {
              if (target.current && home) {
                event.preventDefault();
                const section = document.getElementById(target.current);
                section?.focus({ preventScroll: true });
                target.current = null;
              }
            }}
          >
            <SheetHeader>
              <SheetTitle>{labels.menu}</SheetTitle>
              <SheetDescription>{labels.mobile}</SheetDescription>
            </SheetHeader>
            <nav className="p-6" aria-label={labels.label}>
              {steps(true)}
            </nav>
          </SheetContent>
        </Sheet>
        <span
          className="mobile-progress"
          aria-hidden="true"
          style={{ transform: `scaleX(${home ? progress : 0})` }}
        />
      </header>
      <output className="sr-only" aria-live="polite">
        {pending ? languageLabels.pending : failure ? languageLabels.error : ""}
      </output>
      <noscript>
        <nav className="no-script-nav" aria-label={labels.label}>
          {SECTION_IDS.map((id) => (
            <a key={id} href={href(id)}>
              {labels[id]}
            </a>
          ))}
        </nav>
      </noscript>
    </>
  );
}
