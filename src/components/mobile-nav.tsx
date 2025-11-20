"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/constants";

export function MobileNav() {
  const [open, setOpen] = useState(false);

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
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium py-2"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
