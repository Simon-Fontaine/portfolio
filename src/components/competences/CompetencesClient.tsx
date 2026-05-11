"use client";

import { useState } from "react";
import { ActivitiesTable } from "@/components/competences/ActivitiesTable";
import { ActivityModal } from "@/components/competences/ActivityModal";
import { CompetencesSummary } from "@/components/competences/CompetencesSummary";
import { Separator } from "@/components/ui/separator";
import type { Activity, CompetencesData } from "@/types/competences";

interface CompetencesClientProps {
  data: CompetencesData;
}

export function CompetencesClient({ data }: CompetencesClientProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setModalOpen(true);
  };

  const selectedActivityTheme = selectedActivity
    ? data.themes.find((t) => t.id === selectedActivity.themeId)
    : undefined;

  const realStrengths = data.strengths.filter((s) => !s.startsWith("TODO"));
  const realWeaknesses = data.weaknesses.filter((w) => !w.startsWith("TODO"));
  const hasProjectContent =
    !data.professionalProject.description.startsWith("TODO");

  const totalHours = data.activities.reduce((s, a) => s + a.hours, 0);
  const themesWithActivities = data.themes.filter((t) =>
    data.activities.some((a) => a.themeId === t.id),
  ).length;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-2xl font-bold tabular-nums">{totalHours}h</p>
          <p className="text-xs text-muted-foreground mt-0.5">déclarées</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-2xl font-bold tabular-nums">
            {data.activities.length}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">activités</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-2xl font-bold tabular-nums">
            {themesWithActivities}
            <span className="text-muted-foreground text-lg font-normal">
              /{data.themes.length}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">thèmes</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Activités EPHEC</h2>
        <ActivitiesTable
          themes={data.themes}
          activities={data.activities}
          onActivityClick={handleActivityClick}
        />
      </div>

      {(realStrengths.length > 0 ||
        realWeaknesses.length > 0 ||
        hasProjectContent) && (
        <>
          <Separator />
          <CompetencesSummary
            professionalProject={data.professionalProject}
            strengths={realStrengths}
            weaknesses={realWeaknesses}
          />
        </>
      )}

      <ActivityModal
        activity={selectedActivity}
        theme={selectedActivityTheme}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
