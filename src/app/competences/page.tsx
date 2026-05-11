import type { Metadata } from "next";
import { CompetencesClient } from "@/components/competences/CompetencesClient";
import { competencesData } from "@/data/competences";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Compétences & Activités",
  description:
    "Portfolio de compétences EPHEC — tableau des activités d'acquisition de compétences, synthèse réflexive et projet professionnel. Bachelier en Technologies de l'Informatique.",
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: `${SITE_CONFIG.url}/competences`,
    siteName: `${SITE_CONFIG.name} - Portfolio`,
    title: `Compétences & Activités | ${SITE_CONFIG.name}`,
    description:
      "Portfolio de compétences EPHEC — activités, réflexions et projet professionnel.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Compétences & Activités`,
      },
    ],
  },
};

export default function CompetencesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto space-y-10">
        <header className="max-w-3xl space-y-3">
          <p className="text-primary font-medium text-sm">Portfolio EPHEC</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Compétences &amp; Activités
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Tableau des activités d&apos;acquisition de compétences pour mon
            bachelier à l&apos;EPHEC. Chaque entrée inclut le contexte, les
            apprentissages, les heures consacrées et une réflexion personnelle.
          </p>
        </header>

        <CompetencesClient data={competencesData} />
      </div>
    </div>
  );
}
