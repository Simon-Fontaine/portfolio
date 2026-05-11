"use client";

import {
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
} from "lucide-react";
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

function proofCount(activity: Activity): number {
  return activity.proofs.filter((p) => p.url || p.darkUrl).length;
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
    <div>
      <div className="space-y-4 sm:hidden">
        {themes.map((theme) => {
          const themeActivities = activities.filter(
            (a) => a.themeId === theme.id,
          );
          if (themeActivities.length === 0) return null;

          const themeTotal = themeActivities.reduce((s, a) => s + a.hours, 0);
          const capped = Math.min(themeTotal, 10);

          return (
            <section
              key={theme.id}
              className="overflow-hidden rounded-lg border bg-card"
              aria-labelledby={`theme-${theme.id}`}
            >
              <div
                className={cn(
                  "flex items-start justify-between gap-3 px-4 py-3",
                  theme.colorClasses.bg,
                  theme.colorClasses.text,
                )}
              >
                <h3 id={`theme-${theme.id}`} className="text-sm font-semibold">
                  {theme.title}
                </h3>
                <div className="shrink-0 text-right text-xs font-mono tabular-nums">
                  <span className="font-semibold">{themeTotal}h</span>
                  {themeTotal > 10 && (
                    <span className="block opacity-70">
                      {capped}h comptabilisées
                    </span>
                  )}
                </div>
              </div>

              <div className="divide-y">
                {themeActivities.map((activity) => {
                  const visibleProofCount = proofCount(activity);

                  return (
                    <button
                      key={activity.id}
                      type="button"
                      onClick={() => onActivityClick(activity)}
                      className="group flex w-full items-start gap-3 bg-background px-4 py-4 text-left transition-all duration-200 hover:bg-muted/50 active:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                      aria-label={`Voir les détails de l'activité : ${activity.title}`}
                    >
                      <div className="min-w-0 flex-1 space-y-2.5">
                        <div className="space-y-1.5">
                          <p className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                            {activity.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Badge variant="secondary" className="text-xs">
                              {ACTIVITY_TYPE_LABELS[activity.type]}
                            </Badge>
                            {visibleProofCount > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {visibleProofCount} preuve
                                {visibleProofCount > 1 ? "s" : ""}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3.5" aria-hidden="true" />
                            <span className="font-mono tabular-nums">
                              {activity.hours}h
                            </span>
                          </span>
                          <span className="flex min-w-0 items-center gap-1">
                            <Calendar
                              className="size-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span className="truncate">
                              {formatDate(activity.date)}
                            </span>
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}

        <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3 text-sm">
          <div>
            <p className="font-semibold">Total déclaré</p>
            <p className="text-xs text-muted-foreground">
              max 10h/thème (règle EPHEC)
            </p>
          </div>
          <span className="font-mono font-semibold tabular-nums">
            {totalHours}h
          </span>
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-lg border sm:block">
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
                <th className="w-10 px-3 py-2.5">
                  <span className="sr-only">Ouvrir</span>
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
                        colSpan={6}
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
                          "group border-b cursor-pointer transition-all duration-200 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                          i === themeActivities.length - 1 &&
                            "border-b-2 border-b-border/50",
                        )}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onActivityClick(activity);
                          }
                        }}
                        aria-label={`Voir les détails de l'activité : ${activity.title}`}
                      >
                        <td className="px-4 py-3 font-medium leading-snug transition-colors group-hover:text-primary">
                          {activity.title}
                        </td>
                        <td className="px-3 py-3">
                          <Badge variant="secondary" className="text-xs">
                            {ACTIVITY_TYPE_LABELS[activity.type]}
                          </Badge>
                        </td>
                        <td className="px-3 py-3 text-right tabular-nums font-mono text-muted-foreground">
                          {activity.hours}h
                        </td>
                        <td className="px-3 py-3 text-muted-foreground hidden md:table-cell text-xs">
                          {formatDate(activity.date)}
                        </td>
                        <td className="px-3 py-3">
                          <ProofCell activity={activity} />
                        </td>
                        <td className="px-3 py-3 text-right">
                          <ChevronRight
                            className="ml-auto size-4 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                            aria-hidden="true"
                          />
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
                  className="px-4 py-2.5 font-semibold text-xs text-muted-foreground"
                >
                  Total déclaré
                </td>
                <td className="px-3 py-2.5 text-right font-semibold tabular-nums font-mono">
                  {totalHours}h
                </td>
                <td
                  colSpan={2}
                  className="px-3 py-2.5 text-xs text-muted-foreground md:hidden"
                >
                  max 10h/thème
                </td>
                <td
                  colSpan={3}
                  className="px-3 py-2.5 text-xs text-muted-foreground hidden md:table-cell"
                >
                  max 10h/thème (règle EPHEC)
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
