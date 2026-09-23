"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations("errors");
  const locale = useLocale();
  return (
    <div className="min-h-svh flex flex-col justify-center items-center gap-6 px-6 text-center">
      <h1 className="section-title">{t("errorTitle")}</h1>
      <p className="text-muted-foreground">{t("errorDescription")}</p>
      <Button onClick={reset}>{t("retry")}</Button>
      <Link href={`/${locale}`} className="underline underline-offset-4">
        {t("home")}
      </Link>
    </div>
  );
}
