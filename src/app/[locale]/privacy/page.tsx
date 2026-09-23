import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/generated/locales";
import { loadMessages } from "@/i18n/generated/messages";
import { message } from "@/i18n/messages";
import { SITE_CONFIG } from "@/lib/constants";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = await loadMessages(locale);
  return {
    title: `${m.privacy.title} | ${SITE_CONFIG.name}`,
    description: m.privacy.description,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/privacy`])),
    },
    openGraph: {
      title: `${m.privacy.title} | ${SITE_CONFIG.name}`,
      description: m.privacy.description,
      url: `/${locale}/privacy`,
    },
    twitter: {
      title: `${m.privacy.title} | ${SITE_CONFIG.name}`,
      description: m.privacy.description,
    },
  };
}
export default async function Privacy({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { privacy: m } = await loadMessages(locale);
  return (
    <article className="content-section legal-page">
      <div className="content-width max-w-prose flex flex-col gap-10">
        <h1 className="section-title">{m.title}</h1>
        <p className="text-lg">{m.intro}</p>
        <section>
          <h2>{m.ownerTitle}</h2>
          <p>{message(m.owner, { email: SITE_CONFIG.email })}</p>
          <a className="text-link" href={`mailto:${SITE_CONFIG.email}`}>
            {SITE_CONFIG.email}
          </a>
        </section>
        <section>
          <h2>{m.preferencesTitle}</h2>
          <p>{m.preferences}</p>
        </section>
        <section>
          <h2>{m.hostingTitle}</h2>
          <p>{m.hosting}</p>
        </section>
        <section>
          <h2>{m.contactTitle}</h2>
          <p>{m.contact}</p>
        </section>
        <section>
          <h2>{m.rightsTitle}</h2>
          <p>{m.rights}</p>
        </section>
        <section>
          <h2>{m.resourcesTitle}</h2>
          <ul>
            <li>
              <a
                className="text-link"
                href="https://www.autoriteprotectiondonnees.be/cookies-et-autres-traceurs"
              >
                {m.authority}
              </a>
            </li>
            <li>
              <a
                className="text-link"
                href="https://vercel.com/legal/privacy-policy"
              >
                {m.host}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
