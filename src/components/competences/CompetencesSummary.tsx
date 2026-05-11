interface CompetencesSummaryProps {
  professionalProject: { title: string; description: string };
  strengths: string[];
  weaknesses: string[];
}

export function CompetencesSummary({
  professionalProject,
  strengths,
  weaknesses,
}: CompetencesSummaryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Projet professionnel &amp; bilan
      </h2>

      <div className="rounded-lg border bg-card p-5 space-y-1.5">
        <p className="font-medium text-sm">{professionalProject.title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {professionalProject.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {strengths.length > 0 && (
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 space-y-2">
            <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
              Points forts
            </p>
            <ul className="space-y-1.5">
              {strengths.map((s) => (
                <li
                  key={s}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span
                    className="text-green-600 dark:text-green-400 mt-0.5 shrink-0"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {weaknesses.length > 0 && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 space-y-2">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide">
              Points à améliorer
            </p>
            <ul className="space-y-1.5">
              {weaknesses.map((w) => (
                <li
                  key={w}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span
                    className="text-red-600 dark:text-red-400 mt-0.5 shrink-0"
                    aria-hidden="true"
                  >
                    −
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
