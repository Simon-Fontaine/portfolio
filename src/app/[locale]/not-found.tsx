import Link from "next/link";
import { getLocale } from "next-intl/server";
import { loadMessages } from "@/i18n/generated/messages";

export default async function NotFound() {
  const locale = await getLocale();
  const m = await loadMessages(locale);
  return (
    <div className="min-h-svh flex flex-col justify-center items-center gap-6 px-6 text-center">
      <h1 className="section-title">{m.errors.notFoundTitle}</h1>
      <p className="text-muted-foreground">{m.errors.notFoundDescription}</p>
      <Link className="underline underline-offset-4" href={`/${locale}`}>
        {m.errors.home}
      </Link>
    </div>
  );
}
