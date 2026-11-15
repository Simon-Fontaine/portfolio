"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import {
  CloseIcon,
  DownloadIcon,
  MenuIcon,
  type StepId,
  sectionIcons,
} from "./icons";
import { LanguageSwitch } from "./language-switch";
import { ThemeToggle } from "./theme-toggle";

export interface Step {
  id: StepId;
  label: string;
}

/**
 * Interpolates between section start positions at a reading line placed at
 * 30% of the viewport, so the progress track fills continuously while scrolling.
 */
export function getScrollProgress(
  starts: number[],
  scroll: number,
  viewport: number,
  page: number,
) {
  if (starts.length === 0 || scroll <= 1) return { active: 0, progress: 0 };
  if (scroll + viewport >= page - 2)
    return { active: starts.length - 1, progress: 1 };
  const marker = scroll + viewport * 0.3;
  let active = 0;
  for (let i = 0; i < starts.length; i++) if (marker >= starts[i]) active = i;
  const next = starts[active + 1];
  const fraction =
    next === undefined
      ? 0
      : Math.min(
          1,
          Math.max(0, (marker - starts[active]) / (next - starts[active])),
        );
  return {
    active,
    progress: starts.length < 2 ? 1 : (active + fraction) / (starts.length - 1),
  };
}

function useScrollProgress(idList: string, enabled: boolean) {
  const [state, setState] = useState({ active: 0, progress: 0 });
  useEffect(() => {
    if (!enabled) return setState({ active: 0, progress: 0 });
    const ids = idList.split(",");
    let frame = 0;
    let starts: number[] = [];
    const measure = () => {
      starts = ids.flatMap((id) => {
        const el = document.getElementById(id);
        return el ? [el.getBoundingClientRect().top + window.scrollY] : [];
      });
    };
    const update = () => {
      frame = 0;
      const next = getScrollProgress(
        starts,
        window.scrollY,
        window.innerHeight,
        document.documentElement.scrollHeight,
      );
      setState((prev) =>
        prev.active === next.active &&
        Math.abs(prev.progress - next.progress) < 0.002
          ? prev
          : next,
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
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
    };
  }, [idList, enabled]);
  return state;
}

function Steps({
  steps,
  locale,
  home,
  active,
  progress,
  onNavigate,
}: {
  steps: Step[];
  locale: Locale;
  home: boolean;
  active: number;
  progress: number;
  onNavigate?: (id: string) => void;
}) {
  return (
    <div className="steps">
      <span className="steps-track" aria-hidden="true">
        <span style={{ transform: `scaleY(${home ? progress : 0})` }} />
      </span>
      <ol>
        {steps.map((step, index) => {
          const Icon = sectionIcons[step.id];
          return (
            <li key={step.id}>
              <a
                href={`/${locale}#${step.id}`}
                aria-current={home && index === active ? "location" : undefined}
                onClick={() => onNavigate?.(step.id)}
              >
                <Icon aria-hidden="true" />
                {step.label}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function Journey({
  locale,
  name,
  steps,
  cv,
  labels,
}: {
  locale: Locale;
  name: string;
  steps: Step[];
  cv: { href: string; label: string };
  labels: {
    nav: string;
    open: string;
    close: string;
    menu: string;
    theme: string;
    language: string;
  };
}) {
  const pathname = usePathname();
  const home = pathname === `/${locale}`;
  const { active, progress } = useScrollProgress(
    steps.map((step) => step.id).join(","),
    home,
  );
  const dialog = useRef<HTMLDialogElement>(null);
  const brand = (
    <a href={`/${locale}`} className="brand">
      {name}
    </a>
  );
  const download = (
    <a href={cv.href} download className="btn btn-secondary">
      <DownloadIcon aria-hidden="true" />
      {cv.label}
    </a>
  );

  const closeAndFocus = (id: string) => {
    dialog.current?.close();
    // Move focus to the section so keyboard users continue from there.
    setTimeout(
      () => document.getElementById(id)?.focus({ preventScroll: true }),
      0,
    );
  };

  return (
    <>
      {/* Large screens: fixed rail */}
      <aside className="rail">
        {brand}
        <nav aria-label={labels.nav}>
          <Steps
            steps={steps}
            locale={locale}
            home={home}
            active={active}
            progress={progress}
          />
        </nav>
        <div className="grid gap-2">
          {download}
          <div className="flex items-center justify-between">
            <LanguageSwitch locale={locale} label={labels.language} />
            <ThemeToggle label={labels.theme} />
          </div>
        </div>
      </aside>

      {/* Smaller screens: sticky top bar with a progress line */}
      <header className="topbar">
        <div className="container-page flex h-full items-center">
          <span className="-ml-3">{brand}</span>
          <div className="-mr-3 ml-auto flex items-center">
            <LanguageSwitch locale={locale} label={labels.language} compact />
            <ThemeToggle label={labels.theme} />
            <button
              type="button"
              className="btn btn-icon btn-ghost"
              aria-label={labels.open}
              aria-haspopup="dialog"
              onClick={() => dialog.current?.showModal()}
            >
              <MenuIcon aria-hidden="true" />
            </button>
          </div>
        </div>
        <span className="topbar-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${home ? progress : 0})` }} />
        </span>
      </header>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click is a mouse shortcut; keyboard users have Escape (native) and the close button. */}
      <dialog
        ref={dialog}
        className="menu-dialog"
        aria-label={labels.menu}
        onClick={(event) => {
          // A click on the backdrop (outside the panel) closes the menu.
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="flex h-full flex-col gap-6 p-5">
          <div className="flex items-center justify-between">
            <span className="-ml-3">{brand}</span>
            <button
              type="button"
              className="btn btn-icon btn-ghost -mr-2"
              aria-label={labels.close}
              onClick={() => dialog.current?.close()}
            >
              <CloseIcon aria-hidden="true" />
            </button>
          </div>
          <nav aria-label={labels.nav}>
            <Steps
              steps={steps}
              locale={locale}
              home={home}
              active={active}
              progress={progress}
              onNavigate={closeAndFocus}
            />
          </nav>
          <div className="mt-auto grid">{download}</div>
        </div>
      </dialog>
    </>
  );
}
