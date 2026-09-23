import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionContainerProps {
  id?: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
  background?: "default" | "muted";
  ariaLabel?: string;
}
export function SectionContainer({
  id,
  children,
  className,
  fullHeight = false,
  background = "default",
  ariaLabel,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "content-section flex items-center justify-center",
        fullHeight && "min-h-svh",
        background === "muted" && "bg-muted/30",
        className,
      )}
      aria-label={ariaLabel}
      tabIndex={-1}
    >
      <div className="content-width">{children}</div>
    </section>
  );
}
