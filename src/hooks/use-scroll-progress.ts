"use client";

import { useEffect, useState } from "react";
import { SECTION_IDS } from "@/lib/constants";
import { getScrollProgress } from "@/lib/scroll-progress";

export function useScrollProgress(pathname: string) {
  const [state, setState] = useState({ active: 0, progress: 0 });
  useEffect(() => {
    if (!pathname) return;
    let frame = 0;
    let starts: number[] = [];
    const measure = () => {
      starts = SECTION_IDS.flatMap((id) => {
        const section = document.getElementById(id);
        return section
          ? [section.getBoundingClientRect().top + window.scrollY]
          : [];
      });
    };
    const update = () => {
      frame = 0;
      setState(
        getScrollProgress(
          starts,
          window.scrollY,
          window.innerHeight,
          document.documentElement.scrollHeight,
        ),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      measure();
      schedule();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    resize();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, [pathname]);
  return state;
}
