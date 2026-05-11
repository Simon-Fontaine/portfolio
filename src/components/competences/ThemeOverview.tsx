import { cn } from "@/lib/utils";
import type { Activity, Theme } from "@/types/competences";

interface ThemeCardProps {
  theme: Theme;
  activities: Activity[];
  isSelected: boolean;
  onSelect: (themeId: string | null) => void;
}

function ThemeCard({
  theme,
  activities,
  isSelected,
  onSelect,
}: ThemeCardProps) {
  const themeActivities = activities.filter((a) => a.themeId === theme.id);
  const totalHours = themeActivities.reduce((sum, a) => sum + a.hours, 0);
  const cappedHours = Math.min(totalHours, 10);
  const progressPercent = (cappedHours / 10) * 100;

  return (
    <button
      type="button"
      onClick={() => onSelect(isSelected ? null : theme.id)}
      className={cn(
        "text-left w-full rounded-xl border p-5 transition-all duration-200 hover:shadow-md",
        isSelected
          ? cn("shadow-md", theme.colorClasses.bg, theme.colorClasses.border)
          : "bg-card border-border hover:border-primary/30",
      )}
      aria-pressed={isSelected}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3
            className={cn(
              "font-semibold text-sm leading-tight",
              isSelected ? theme.colorClasses.text : "text-foreground",
            )}
          >
            {theme.title}
          </h3>
          <span
            className={cn(
              "shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border",
              theme.colorClasses.bg,
              theme.colorClasses.text,
              theme.colorClasses.border,
            )}
          >
            {themeActivities.length} act.
          </span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {theme.description}
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Heures</span>
            <span
              className={cn(
                "font-medium",
                cappedHours >= 8
                  ? theme.colorClasses.text
                  : "text-muted-foreground",
              )}
            >
              {cappedHours} / 10h
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isSelected ? "bg-current" : "bg-primary/60",
              )}
              style={{ width: `${progressPercent}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </button>
  );
}

interface ThemeOverviewProps {
  themes: Theme[];
  activities: Activity[];
  selectedTheme: string | null;
  onThemeSelect: (themeId: string | null) => void;
}

export function ThemeOverview({
  themes,
  activities,
  selectedTheme,
  onThemeSelect,
}: ThemeOverviewProps) {
  const totalHours = activities.reduce((sum, a) => sum + a.hours, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Vue d&apos;ensemble</h2>
        <span className="text-sm text-muted-foreground">
          {totalHours}h au total · {activities.length} activités
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            activities={activities}
            isSelected={selectedTheme === theme.id}
            onSelect={onThemeSelect}
          />
        ))}
      </div>
    </div>
  );
}
