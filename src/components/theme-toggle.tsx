"use client";

import { useEffect } from "react";
import { THEME_STORAGE_KEY as STORAGE_KEY } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./icons";

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function setDark(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

export function ThemeToggle({ label }: { label: string }) {
  // Follow the operating system until the visitor makes an explicit choice.
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      if (!readStored()) setDark(media.matches);
    };
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <button
      type="button"
      className="theme-toggle btn btn-icon btn-ghost"
      aria-label={label}
      onClick={() => {
        const dark = !document.documentElement.classList.contains("dark");
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        // Cross-fade between themes where the browser supports it.
        if (document.startViewTransition && !reduced)
          document.startViewTransition(() => setDark(dark));
        else setDark(dark);
        try {
          localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
        } catch {
          // Storage can be blocked: the choice then lasts for this page only.
        }
      }}
    >
      {/* The visible icon is chosen in CSS from the `.dark` class (globals.css). */}
      <MoonIcon aria-hidden="true" className="moon" />
      <SunIcon aria-hidden="true" className="sun" />
    </button>
  );
}
