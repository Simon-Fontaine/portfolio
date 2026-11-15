import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getContent } from "@/lib/content";
import { alternates, openGraphLocales } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { t } = getContent(locale);
  return {
    title: t.privacy.title,
    description: t.privacy.description,
    alternates: alternates(locale, "/privacy"),
    openGraph: {
      title: t.privacy.title,
      description: t.privacy.description,
      url: `/${locale}/privacy`,
      ...openGraphLocales(locale),
    },
  };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { profile: p, t } = getContent(locale);
  const { sections } = t.privacy;
  const blocks = [
    {
      id: "owner",
      title: sections.owner.title,
      text: sections.owner.text(p.email),
    },
    sections.preferences,
    sections.hosting,
    sections.contact,
    sections.rights,
  ];

  return (
    <article className="container-page py-16 sm:py-24">
      <div className="reading">
        <h1 className="text-4xl sm:text-5xl">{t.privacy.title}</h1>
        <p className="mt-6 text-lg text-muted-foreground">{t.privacy.intro}</p>
        <div className="mt-12 grid gap-10">
          {blocks.map((block) => (
            <section key={block.title}>
              <h2 className="text-2xl">{block.title}</h2>
              <p className="mt-3 text-muted-foreground">{block.text}</p>
            </section>
          ))}
          <section>
            <h2 className="text-2xl">{t.privacy.resourcesTitle}</h2>
            <ul className="mt-3 grid gap-2">
              <li>
                <a
                  className="link"
                  href="https://www.autoriteprotectiondonnees.be/"
                  hrefLang={locale}
                >
                  {t.privacy.authority}
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href="https://vercel.com/legal/privacy-policy"
                  hrefLang="en"
                >
                  {t.privacy.host}
                </a>
              </li>
              <li>
                <a className="link" href={`mailto:${p.email}`}>
                  {p.email}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
