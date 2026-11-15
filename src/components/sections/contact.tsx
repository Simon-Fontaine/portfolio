import { CopyButton } from "@/components/copy-button";
import { DownloadIcon } from "@/components/icons";
import { ExternalLink, Section } from "@/components/section";
import type { Content } from "@/lib/content";
import { cvHref } from "@/lib/cv";

export function ContactSection({ content }: { content: Content }) {
  const { profile: p, t, locale } = content;
  const linkedin = p.social.find((link) => link.id === "linkedin");
  return (
    <Section id="contact" title={t.sections.contact}>
      <p className="reading text-lg">{t.contact.text}</p>
      <p className="mt-7">
        <a
          href={`mailto:${p.email}`}
          className="link font-display text-[clamp(1.5rem,5.4vw,2.75rem)] leading-tight font-bold tracking-[-0.02em] break-all"
        >
          {p.email}
        </a>
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        <CopyButton
          value={p.email}
          label={t.actions.copyEmail}
          copiedLabel={t.actions.copied}
        />
        <a href={cvHref(locale)} download className="btn btn-secondary">
          <DownloadIcon aria-hidden="true" />
          {t.actions.downloadCv}
        </a>
      </div>
      {linkedin && (
        <p className="mt-7 text-muted-foreground">
          {t.contact.linkedin}{" "}
          <ExternalLink
            href={linkedin.url}
            newTabLabel={t.labels.newTab}
            className="font-semibold text-foreground"
          >
            LinkedIn
          </ExternalLink>
        </p>
      )}
    </Section>
  );
}
