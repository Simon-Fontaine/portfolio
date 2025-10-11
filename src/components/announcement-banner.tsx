"use client";

import { Rocket, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AnnouncementBannerProps {
  icon?: React.ReactNode;
  message: string;
  dismissible?: boolean;
  variant?: "default" | "primary" | "success" | "warning" | "error";
  ctaLabel?: string;
  ctaHref?: string;
}

const variantStyles = {
  default: "bg-muted/95 border-border text-foreground",
  primary: "bg-primary/15 border-primary/20 text-foreground",
  success:
    "bg-green-500/15 border-green-500/20 text-green-700 dark:text-green-400",
  warning:
    "bg-yellow-500/15 border-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  error: "bg-red-500/15 border-red-500/20 text-red-700 dark:text-red-400",
};

export function AnnouncementBanner({
  icon,
  message,
  dismissible = false,
  variant = "primary",
  ctaLabel,
  ctaHref,
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-16 left-0 right-0 z-40 border-b backdrop-blur-sm ${variantStyles[variant]}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-3 sm:py-4">
          {/* Icon and message group */}
          <div className="flex items-center gap-3 justify-center">
            {icon && (
              <span className="flex-shrink-0" aria-hidden="true">
                {icon}
              </span>
            )}
            <p className="text-sm sm:text-base font-medium text-center">
              {message}
            </p>
          </div>

          {/* Actions group */}
          <div className="flex items-center gap-2">
            {ctaLabel && ctaHref && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="bg-background/50 hover:bg-background"
              >
                <a href={ctaHref}>{ctaLabel}</a>
              </Button>
            )}
            {dismissible && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible(false)}
                aria-label="Fermer l'annonce"
                className="size-8 cursor-pointer"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function InternshipAnnouncementBanner() {
  return (
    <AnnouncementBanner
      icon={<Rocket className="size-5" />}
      message="À la recherche d'un stage de fin d'études (février - mai 2026)"
      variant="warning"
      ctaLabel="En savoir plus"
      ctaHref="#stage"
      dismissible
    />
  );
}
