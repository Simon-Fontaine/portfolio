"use client";

import { Rocket, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("banner-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    } else {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    if (dismissible) {
      sessionStorage.setItem("banner-dismissed", "true");
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-16 left-0 right-0 z-40 border-b backdrop-blur-sm ${variantStyles[variant]}`}
        >
          <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl">
            <div className="relative flex items-center justify-between gap-2 py-2.5 sm:py-3">
              {/* Contenu principal */}
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {icon && (
                  <span
                    className="flex-shrink-0 hidden xs:block"
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                )}
                <p className="text-xs sm:text-sm font-medium leading-tight flex-1 min-w-0">
                  <span className="block sm:inline">{message}</span>
                  {ctaLabel && ctaHref && (
                    <a
                      href={ctaHref}
                      className="block sm:inline sm:ml-2 mt-1 sm:mt-0 text-primary hover:underline underline-offset-2 font-semibold"
                    >
                      {ctaLabel} →
                    </a>
                  )}
                </p>
              </div>

              {/* Bouton de fermeture */}
              {dismissible && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDismiss}
                  aria-label="Masquer pour cette session"
                  title="Masquer pour cette session"
                  className="size-7 sm:size-8 flex-shrink-0 hover:bg-background/50"
                >
                  <X className="size-3.5 sm:size-4" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function InternshipAnnouncementBanner() {
  return (
    <AnnouncementBanner
      icon={<Rocket className="size-4 sm:size-5" />}
      message="À la recherche d'un stage de fin d'études (février - mai 2026)"
      variant="warning"
      ctaLabel="En savoir plus"
      ctaHref="#internship"
      dismissible
    />
  );
}
