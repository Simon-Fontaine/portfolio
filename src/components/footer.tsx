import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { Preferences } from "@/components/preferences";
import { Separator } from "@/components/ui/separator";
import { type Messages, message } from "@/i18n/messages";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

export function Footer({ locale, m }: { locale: string; m: Messages }) {
  return (
    <footer id="footer" className="site-footer">
      <div className="content-width flex flex-col gap-10">
        <div className="footer-heading">
          <div>
            <p className="text-2xl font-semibold">
              {SITE_CONFIG.name}
              <span className="text-primary">.</span>
            </p>
            <p className="text-muted-foreground mt-2">{m.common.role}</p>
          </div>
          <a className="text-link" href={`/${locale}#hero`}>
            {m.footer.back}
            <ArrowUp aria-hidden="true" />
          </a>
        </div>
        <Separator />
        <div className="footer-body">
          <nav
            aria-label={m.common.social}
            className="flex flex-col items-start gap-2"
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                className="text-link"
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <span className="sr-only"> {m.common.newTab}</span>
              </a>
            ))}
            <Link className="text-link" href={`/${locale}/privacy`}>
              {m.footer.privacy}
            </Link>
          </nav>
          <Preferences locale={locale} labels={m.settings} />
        </div>
        <p className="text-sm text-muted-foreground">
          {message(m.common.footer, {
            name: SITE_CONFIG.name,
            year: new Date().getFullYear(),
          })}
        </p>
      </div>
    </footer>
  );
}
