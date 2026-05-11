import { Mail } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export function ContactSection() {
  return (
    <SectionContainer id="contact" ariaLabel="Me contacter">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Me contacter
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            N&apos;hésitez pas à me contacter par email ou via mes réseaux
            sociaux.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            <a href={`mailto:${SITE_CONFIG.email}`}>
              <Mail className="mr-2 size-4" aria-hidden="true" />
              {SITE_CONFIG.email}
            </a>
          </Button>
        </div>

        <SocialLinks className="flex items-center justify-center gap-4" />
      </div>
    </SectionContainer>
  );
}
