import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ACTIVITY_TYPE_LABELS,
  type Activity,
  type Theme,
} from "@/types/competences";

function formatDate(date: Activity["date"]): string {
  if (typeof date === "string") return date;
  if (date.start && date.end) return `${date.start} – ${date.end}`;
  return date.start || date.end || "";
}

interface ActivityCardProps {
  activity: Activity;
  theme: Theme | undefined;
  onClick: () => void;
}

export function ActivityCard({ activity, theme, onClick }: ActivityCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left w-full group"
      aria-label={`Voir les détails de l'activité : ${activity.title}`}
    >
      <Card className="h-full gap-3 py-4 transition-all duration-200 hover:shadow-md hover:border-primary/30 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
        <CardHeader className="px-5 pb-0">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {theme && (
              <Badge
                className={cn(
                  "text-xs",
                  theme.colorClasses.bg,
                  theme.colorClasses.text,
                  theme.colorClasses.border,
                  "border",
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
          <CardTitle className="text-sm leading-snug group-hover:text-primary transition-colors">
            {activity.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pt-0">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3" aria-hidden="true" />
              {activity.hours}h
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="size-3" aria-hidden="true" />
              <span className="truncate">{formatDate(activity.date)}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
