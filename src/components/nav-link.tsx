"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export function NavLink({ href, children, className, ...props }: NavLinkProps) {
  const activeSection = useActiveSection();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace(/.*#/, "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        `text-sm transition-colors ${
          activeSection === href
            ? "text-primary font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`,
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
