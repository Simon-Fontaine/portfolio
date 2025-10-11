"use client";

import { SiGithub, SiLinkedin } from "react-icons/si";
import { SOCIAL_LINKS } from "@/lib/constants";

const iconMap = {
  github: SiGithub,
  linkedin: SiLinkedin,
} as const;

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <nav className={className} aria-label="Liens réseaux sociaux">
      {SOCIAL_LINKS.map((link) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap];
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center size-12 rounded-lg border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={link.label}
          >
            <Icon className="size-5" aria-hidden="true" />
          </a>
        );
      })}
    </nav>
  );
}
