"use client";

import { Calendar, Clock, ExternalLink, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ACTIVITY_TYPE_LABELS,
  type Activity,
  type Proof,
  type Theme,
} from "@/types/competences";

function formatDate(date: Activity["date"]): string {
  if (typeof date === "string") return date;
  if (date.start && date.end) return `${date.start} – ${date.end}`;
  return date.start || date.end || "";
}

function real(value: string): string | null {
  return value && !value.startsWith("TODO") ? value : null;
}

function ProofItem({ proof }: { proof: Proof }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const url =
    mounted && resolvedTheme === "dark" && proof.darkUrl
      ? proof.darkUrl
      : proof.url;

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-primary hover:underline underline-offset-2"
      >
        <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
        {proof.label}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <FileText className="size-3.5 shrink-0" aria-hidden="true" />
      <span>{proof.label}</span>
      {proof.description && (
        <span className="text-xs opacity-70">— {proof.description}</span>
      )}
    </div>
  );
}

interface ActivityModalProps {
  activity: Activity | null;
  theme: Theme | undefined;
  open: boolean;
  onClose: () => void;
}

export function ActivityModal({
  activity,
  theme,
  open,
  onClose,
}: ActivityModalProps) {
  if (!activity) return null;

  const realSkills = activity.skills.filter((s) => !s.startsWith("TODO"));
  const realStrengths = activity.strengths.filter((s) => !s.startsWith("TODO"));
  const realWeaknesses = activity.weaknesses.filter(
    (w) => !w.startsWith("TODO"),
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto gap-0 p-0">
        <div
          className={cn(
            "px-6 pt-6 pb-4",
            theme?.colorClasses.bg ?? "bg-muted/50",
          )}
        >
          <DialogHeader>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {theme && (
                <Badge
                  className={cn(
                    "text-xs border",
                    theme.colorClasses.bg,
                    theme.colorClasses.text,
                    theme.colorClasses.border,
                  )}
                  variant="outline"
                >
                  {theme.title}
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {ACTIVITY_TYPE_LABELS[activity.type]}
              </Badge>
            </div>
            <DialogTitle className="text-lg leading-snug pr-8">
              {activity.title}
            </DialogTitle>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" />
                {activity.hours}h
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" aria-hidden="true" />
                {formatDate(activity.date)}
              </span>
              {activity.proofs.map((proof) => (
                <ProofHeaderLink key={proof.label} proof={proof} />
              ))}
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 py-4 space-y-5">
          {real(activity.context) && (
            <Section title="Contexte">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activity.context}
              </p>
            </Section>
          )}

          {real(activity.learnings) && (
            <Section title="Ce que j'ai appris">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activity.learnings}
              </p>
            </Section>
          )}

          {realSkills.length > 0 && (
            <Section title="Compétences travaillées">
              <div className="flex flex-wrap gap-1.5">
                {realSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Section>
          )}

          {real(activity.professionalProjectLink) && (
            <Section title="Lien avec mon projet professionnel">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activity.professionalProjectLink}
              </p>
            </Section>
          )}

          {real(activity.reflection) && (
            <>
              <Separator />
              <Section title="Analyse réflexive">
                <div className="space-y-3">
                  {activity.reflection.split("\n\n").map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm text-muted-foreground leading-relaxed italic"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Section>
            </>
          )}

          {(realStrengths.length > 0 || realWeaknesses.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {realStrengths.length > 0 && (
                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 space-y-1.5">
                  <p className="text-xs font-semibold text-green-700 dark:text-green-400">
                    Points forts
                  </p>
                  <ul className="space-y-1">
                    {realStrengths.map((s) => (
                      <li key={s} className="text-xs text-muted-foreground">
                        + {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {realWeaknesses.length > 0 && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 space-y-1.5">
                  <p className="text-xs font-semibold text-red-700 dark:text-red-400">
                    Points à travailler
                  </p>
                  <ul className="space-y-1">
                    {realWeaknesses.map((w) => (
                      <li key={w} className="text-xs text-muted-foreground">
                        − {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activity.proofs.length > 0 && (
            <Section title="Preuves et références">
              <div className="space-y-2">
                {activity.proofs.map((proof) => (
                  <ProofItem key={proof.label} proof={proof} />
                ))}
              </div>
            </Section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProofHeaderLink({ proof }: { proof: Proof }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const url =
    mounted && resolvedTheme === "dark" && proof.darkUrl
      ? proof.darkUrl
      : proof.url;

  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 hover:text-primary transition-colors"
      title={proof.label}
    >
      <ExternalLink className="size-4" aria-hidden="true" />
      <span className="text-xs">{proof.label}</span>
    </a>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}
