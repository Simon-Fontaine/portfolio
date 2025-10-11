"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";

const navItems = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#formation", label: "Formation" },
  { href: "#projets", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Menu de navigation principal du site
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1.5 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`text-lg font-medium py-2 transition-colors ${
                activeSection === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
