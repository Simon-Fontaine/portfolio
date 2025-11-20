"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export function NavLink({
  href,
  children,
  className,
  onClick,
  ...props
}: NavLinkProps) {
  const activeSection = useActiveSection();
  const isActive = activeSection === href;

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm transition-colors duration-200 hover:text-foreground",
        isActive ? "text-primary font-medium" : "text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
