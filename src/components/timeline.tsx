import type { ReactNode } from "react";

/**
 * Vertical timeline. The line fills and each marker lights up as the visitor
 * scrolls past it (CSS scroll-driven animations, see globals.css → "Motion").
 * On wide screens the date sits in its own column and stays pinned while its
 * entry is being read.
 */
export function Timeline({ children }: { children: ReactNode }) {
  return (
    <div className="timeline">
      <span className="timeline-fill" aria-hidden="true" />
      <ol className="timeline-list">{children}</ol>
    </div>
  );
}

export function TimelineItem({
  date,
  children,
}: {
  date: string;
  children: ReactNode;
}) {
  return (
    <li className="timeline-item">
      <span className="timeline-dot" aria-hidden="true" />
      <p className="timeline-date">{date}</p>
      <article className="reading">{children}</article>
    </li>
  );
}
