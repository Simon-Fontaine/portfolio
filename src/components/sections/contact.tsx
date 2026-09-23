import { Mail } from "lucide-react";
import { CvDownload } from "@/components/cv-download";
import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";
import type { Messages } from "@/i18n/messages";
import { SITE_CONFIG } from "@/lib/constants";

export function ContactSection({ m, locale }: { m: Messages; locale: string }) {
  return (
    <SectionContainer
      id="contact"
      background="muted"
      ariaLabel={m.common.contact}
    >
      <div className="section-layout">
        <SectionHeading title={m.contact.title} />
        <div className="flex flex-col gap-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {m.contact.description}
          </p>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-link text-base sm:text-xl break-all"
          >
            <Mail className="size-5 shrink-0" aria-hidden="true" />
            {SITE_CONFIG.email}
          </a>
          <div className="flex flex-wrap items-center gap-5">
            <CvDownload
              locale={locale}
              label={m.common.download}
              variant="outline"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
