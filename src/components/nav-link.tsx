"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const isPath = href.startsWith("/");
  const isActive = isPath ? pathname === href : activeSection === href;
  // When on a non-root page, anchor links need the root prefix to navigate back
  const resolvedHref = !isPath && pathname !== "/" ? `/${href}` : href;

  const linkClass = cn(
    "text-sm transition-colors duration-200 hover:text-foreground",
    isActive ? "text-primary font-medium" : "text-muted-foreground",
    className,
  );

  if (isPath) {
    return (
      <Link
        href={href}
        className={linkClass}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <a href={resolvedHref} onClick={onClick} className={linkClass} {...props}>
      {children}
    </a>
  );
}
