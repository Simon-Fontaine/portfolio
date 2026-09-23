"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cvFileName, cvUrl } from "@/lib/constants";

let celebrated = false;
export function CvDownload({
  locale,
  label,
  variant = "default",
}: {
  locale: string;
  label: string;
  variant?: "default" | "outline";
}) {
  return (
    <Button size="lg" variant={variant} asChild>
      <a
        href={cvUrl(locale)}
        download={cvFileName(locale)}
        onClick={(event) => {
          if (
            celebrated ||
            event.metaKey ||
            event.ctrlKey ||
            matchMedia("(prefers-reduced-motion: reduce)").matches
          )
            return;
          celebrated = true;
          const bounds = event.currentTarget.getBoundingClientRect();
          const origin = {
            x: (bounds.left + bounds.width / 2) / innerWidth,
            y: (bounds.top + bounds.height / 2) / innerHeight,
          };
          void import("canvas-confetti")
            .then(({ default: confetti }) => {
              if (matchMedia("(prefers-reduced-motion: reduce)").matches)
                return;
              void confetti({
                particleCount: 36,
                spread: 55,
                startVelocity: 22,
                ticks: 80,
                gravity: 1.1,
                scalar: 0.75,
                colors: ["#cf602c", "#efae75", "#a8613e"],
                origin,
                disableForReducedMotion: true,
              });
            })
            .catch(() => {
              /* The native download remains available if the optional effect fails. */
            });
        }}
      >
        <Download aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}
