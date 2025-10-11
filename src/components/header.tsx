"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
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
        <Link
          href="#hero"
          className={`font-bold text-xl transition-colors ${
            activeSection === "#hero" ? "text-primary" : "text-foreground"
          }`}
        >
          {SITE_CONFIG.name.split(" ")[0]}
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                activeSection === item.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </a>
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
