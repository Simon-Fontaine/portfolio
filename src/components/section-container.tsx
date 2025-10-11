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
  fullHeight = true,
  background = "default",
  ariaLabel,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20",
        fullHeight && "min-h-screen",
        background === "muted" && "bg-muted/30",
        className,
      )}
      aria-label={ariaLabel}
    >
      <div className="container max-w-7xl w-full mx-auto">{children}</div>
    </section>
  );
}
