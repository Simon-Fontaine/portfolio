import { ArrowDown, Mail, MapPin } from "lucide-react";
import { CvDownload } from "@/components/cv-download";
import { SectionContainer } from "@/components/section-container";
import { Button } from "@/components/ui/button";
import type { Messages } from "@/i18n/messages";
import { SITE_CONFIG } from "@/lib/constants";

export function HeroSection({ m, locale }: { m: Messages; locale: string }) {
  return (
    <SectionContainer
      id="hero"
      fullHeight
      className="hero-section"
      ariaLabel={m.hero.label}
    >
      <div className="max-w-4xl flex flex-col gap-8 sm:flex flex-col gap-10">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          {m.common.location}
        </p>
        <div className="flex flex-col gap-5">
          <h1 className="hero-title">
            {SITE_CONFIG.name}
            <span className="text-primary">.</span>
          </h1>
          <p className="text-xl sm:text-3xl font-medium">{m.common.role}</p>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {m.hero.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <CvDownload locale={locale} label={m.common.download} />
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">
              <Mail aria-hidden="true" />
              {m.common.contact}
            </a>
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 max-w-2xl pt-2">
          <a className="text-link" href="#projects">
            {m.common.projects}
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </SectionContainer>
  );
}
