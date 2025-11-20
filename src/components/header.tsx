"use client";

import { motion } from "motion/react";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

export function Header() {
  const activeSection = useActiveSection();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-sm"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between max-w-7xl">
        <NavLink
          href="#hero"
          className={`font-bold text-xl transition-colors ${
            activeSection === "#hero" ? "text-primary" : "text-foreground"
          }`}
        >
          {SITE_CONFIG.name.split(" ")[0]}
        </NavLink>

        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </motion.header>
  );
}
