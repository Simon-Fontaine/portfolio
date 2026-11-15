"use client";

import { useParams } from "next/navigation";
import { ui } from "@/content/ui";
import { defaultLocale, isLocale } from "@/i18n/config";

// Shown if rendering fails unexpectedly. Must be a client component.
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : defaultLocale;
  const e = ui.errors;
  return (
    <div className="container-page flex min-h-[60svh] flex-col items-center justify-center gap-6 py-24 text-center">
      <h1 className="text-4xl sm:text-5xl">{e.errorTitle[locale]}</h1>
      <p className="max-w-md text-muted-foreground">{e.errorText[locale]}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" className="btn btn-primary" onClick={reset}>
          {e.retry[locale]}
        </button>
        <a href={`/${locale}`} className="btn btn-secondary">
          {e.home[locale]}
        </a>
      </div>
    </div>
  );
}
