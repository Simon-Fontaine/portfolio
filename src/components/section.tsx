import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowOutIcon, type StepId, sectionIcons } from "./icons";

/** A chapter of the page: its icon (the same as in the navigation), title and content. */
export function Section({
  id,
  title,
  children,
}: {
  id: Exclude<StepId, "top">;
  title: string;
  children: ReactNode;
}) {
  const Icon = sectionIcons[id];
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className="section"
    >
      <div className="container-page">
        <header className="section-head">
          <span className="icon-tile" aria-hidden="true">
            <Icon />
          </span>
          <h2 id={`${id}-title`}>{title}</h2>
        </header>
        {children}
      </div>
    </section>
  );
}

/** Technologies as a sentence ("TypeScript, Vue.js, …"). */
export function TechList({
  items,
  label,
  className,
}: {
  items: string[];
  label: string;
  className?: string;
}) {
  return (
    <ul aria-label={label} className={cn("inline-list meta", className)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** External link with an arrow, announced as opening in a new tab. */
export function ExternalLink({
  href,
  children,
  newTabLabel,
  className,
}: {
  href: string;
  children: ReactNode;
  newTabLabel: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("link", className)}
    >
      {children}
      <ArrowOutIcon aria-hidden="true" />
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
