import Link from "next/link";
import { ArrowUpIcon, socialNames } from "@/components/icons";
import { ExternalLink } from "@/components/section";
import type { Content } from "@/lib/content";

export function SiteFooter({ content }: { content: Content }) {
  const { profile: p, t, locale } = content;
  return (
    <footer className="container-page">
      <div className="flex flex-col gap-3 border-t-2 py-7 text-[0.9375rem] text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>{t.footer.copyright(new Date().getFullYear(), p.name)}</p>
        <nav aria-label={t.footer.links}>
          <ul className="flex flex-wrap items-center gap-x-6">
            {p.social.map((link) => (
              <li key={link.id} className="flex min-h-11 items-center">
                <ExternalLink href={link.url} newTabLabel={t.labels.newTab}>
                  {socialNames[link.id]}
                </ExternalLink>
              </li>
            ))}
            <li className="flex min-h-11 items-center">
              <Link href={`/${locale}/privacy`} className="link">
                {t.footer.privacy}
              </Link>
            </li>
            <li className="flex min-h-11 items-center">
              <a href={`/${locale}#top`} className="link">
                {t.actions.backToTop}
                <ArrowUpIcon aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
