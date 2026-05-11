"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ACTIVITY_TYPE_LABELS,
  type ActivityType,
  type Theme,
} from "@/types/competences";

interface ActivityFiltersProps {
  themes: Theme[];
  availableTypes: ActivityType[];
  selectedTheme: string | null;
  selectedType: ActivityType | null;
  searchQuery: string;
  onThemeSelect: (themeId: string | null) => void;
  onTypeSelect: (type: ActivityType | null) => void;
  onSearchChange: (query: string) => void;
}

export function ActivityFilters({
  themes,
  availableTypes,
  selectedTheme,
  selectedType,
  searchQuery,
  onThemeSelect,
  onTypeSelect,
  onSearchChange,
}: ActivityFiltersProps) {
  const hasActiveFilters = selectedTheme || selectedType || searchQuery;

  return (
    <div className="space-y-3">
      {/* Barre de recherche */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Rechercher une activité..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground"
          aria-label="Rechercher une activité"
        />
      </div>

      {/* Filtres thèmes */}
      <div className="flex flex-wrap gap-1.5">
        <span className="text-xs text-muted-foreground self-center mr-1">
          Thème :
        </span>
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() =>
              onThemeSelect(selectedTheme === theme.id ? null : theme.id)
            }
            className={cn(
              "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-all",
              selectedTheme === theme.id
                ? cn(
                    theme.colorClasses.bg,
                    theme.colorClasses.text,
                    theme.colorClasses.border,
                  )
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
            aria-pressed={selectedTheme === theme.id}
          >
            {theme.title}
          </button>
        ))}
      </div>

      {/* Filtres types */}
      {availableTypes.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs text-muted-foreground self-center mr-1">
            Type :
          </span>
          {availableTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onTypeSelect(selectedType === type ? null : type)}
              className={cn(
                "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-all",
                selectedType === type
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
              aria-pressed={selectedType === type}
            >
              {ACTIVITY_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      )}

      {/* Réinitialiser */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onThemeSelect(null);
            onTypeSelect(null);
            onSearchChange("");
          }}
          className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
        >
          <X className="size-3 mr-1" aria-hidden="true" />
          Effacer les filtres
        </Button>
      )}
    </div>
  );
}
