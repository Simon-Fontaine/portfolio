"use client";

import { ExternalLink, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ACTIVITY_TYPE_LABELS,
  type Activity,
  type Proof,
  type Theme,
} from "@/types/competences";

function formatDate(date: Activity["date"]): string {
  if (typeof date === "string") return date;
  if (date.end && date.end !== date.start) return `${date.start} – ${date.end}`;
  return date.start;
}

function ProofLink({ proof }: { proof: Proof }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const url =
    mounted && resolvedTheme === "dark" && proof.darkUrl
      ? proof.darkUrl
      : proof.url;

  if (!url) {
    return (
      <span
        title={proof.label}
        className="inline-flex items-center text-muted-foreground/50"
      >
        <FileText className="size-3" aria-hidden="true" />
        <span className="sr-only">{proof.label}</span>
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      title={proof.label}
      className="inline-flex items-center gap-1 text-xs text-primary hover:underline underline-offset-2"
    >
      <ExternalLink className="size-3" aria-hidden="true" />
      <span className="sr-only">{proof.label}</span>
    </a>
  );
}

function ProofCell({ activity }: { activity: Activity }) {
  const visibleProofs = activity.proofs.filter((p) => p.url || p.darkUrl);

  if (visibleProofs.length === 0) {
    return <span className="text-muted-foreground/30">—</span>;
  }

  return (
    <div className="flex items-center gap-1.5">
      {visibleProofs.map((p) => (
        <ProofLink key={p.label} proof={p} />
      ))}
    </div>
  );
}

interface ActivitiesTableProps {
  themes: Theme[];
  activities: Activity[];
  onActivityClick: (activity: Activity) => void;
}

export function ActivitiesTable({
  themes,
  activities,
  onActivityClick,
}: ActivitiesTableProps) {
  const totalHours = activities.reduce((s, a) => s + a.hours, 0);

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="text-left font-medium text-muted-foreground px-4 py-2.5">
                Activité
              </th>
              <th className="text-left font-medium text-muted-foreground px-3 py-2.5 hidden sm:table-cell">
                Type
              </th>
              <th className="text-right font-medium text-muted-foreground px-3 py-2.5 tabular-nums w-16">
                Heures
              </th>
              <th className="text-left font-medium text-muted-foreground px-3 py-2.5 hidden md:table-cell w-40">
                Date
              </th>
              <th className="text-left font-medium text-muted-foreground px-3 py-2.5 w-16">
                Preuves
              </th>
            </tr>
          </thead>
          <tbody>
            {themes.map((theme) => {
              const themeActivities = activities.filter(
                (a) => a.themeId === theme.id,
              );
              if (themeActivities.length === 0) return null;

              const themeTotal = themeActivities.reduce(
                (s, a) => s + a.hours,
                0,
              );
              const capped = Math.min(themeTotal, 10);

              return (
                <Fragment key={theme.id}>
                  <tr className={cn("border-b", theme.colorClasses.bg)}>
                    <td
                      colSpan={5}
                      className={cn(
                        "px-4 py-2 font-medium text-xs",
                        theme.colorClasses.text,
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span>{theme.title}</span>
                        <span className="tabular-nums font-mono shrink-0">
                          {themeTotal}h
                          {themeTotal > 10 && (
                            <span className="ml-1 opacity-70">
                              → {capped}h comptabilisées
                            </span>
                          )}
                        </span>
                      </div>
                    </td>
                  </tr>

                  {themeActivities.map((activity, i) => (
                    <tr
                      key={activity.id}
                      onClick={() => onActivityClick(activity)}
                      className={cn(
                        "border-b cursor-pointer transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                        i === themeActivities.length - 1 &&
                          "border-b-2 border-b-border/50",
                      )}
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && onActivityClick(activity)
                      }
                      aria-label={`Voir les détails : ${activity.title}`}
                    >
                      <td className="px-4 py-2.5 font-medium leading-snug">
                        {activity.title}
                        <Badge
                          variant="secondary"
                          className="ml-2 text-xs sm:hidden"
                        >
                          {ACTIVITY_TYPE_LABELS[activity.type]}
                        </Badge>
                      </td>
                      <td className="px-3 py-2.5 hidden sm:table-cell">
                        <Badge variant="secondary" className="text-xs">
                          {ACTIVITY_TYPE_LABELS[activity.type]}
                        </Badge>
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums font-mono text-muted-foreground">
                        {activity.hours}h
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground hidden md:table-cell text-xs">
                        {formatDate(activity.date)}
                      </td>
                      <td className="px-3 py-2.5">
                        <ProofCell activity={activity} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-muted/40 border-t-2">
              <td
                colSpan={2}
                className="px-4 py-2.5 font-semibold text-xs text-muted-foreground hidden sm:table-cell"
              >
                Total déclaré
              </td>
              <td className="px-4 py-2.5 font-semibold text-xs text-muted-foreground sm:hidden">
                Total déclaré
              </td>
              <td className="px-3 py-2.5 text-right font-semibold tabular-nums font-mono">
                {totalHours}h
              </td>
              <td
                colSpan={2}
                className="px-3 py-2.5 text-xs text-muted-foreground hidden md:table-cell"
              >
                max 10h/thème (règle EPHEC)
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
