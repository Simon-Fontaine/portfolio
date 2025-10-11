"use client";

import { Download, Mail } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { SectionContainer } from "@/components/section-container";
import { Button } from "@/components/ui/button";

export function InternshipSection() {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleCVDownload(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    if (isDownloading) return;

    setIsDownloading(true);

    try {
      const response = await fetch("/api/cv", {
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        if (response.status === 429) {
          toast.error("Trop de tentatives", {
            description: data.error || "Veuillez réessayer plus tard.",
          });
        } else {
          toast.error("Erreur", {
            description:
              data.error ||
              "Impossible de télécharger le CV. Veuillez réessayer.",
          });
        }
        return;
      }

      const blob = await response.blob();

      if (blob.type !== "application/pdf") {
        throw new Error("Le fichier téléchargé n'est pas un PDF valide");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CV_Simon_Fontaine.pdf";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("CV téléchargé !", {
        description: "Le fichier a été téléchargé avec succès.",
      });
    } catch (error) {
      console.error("CV download error:", error);
      toast.error("Erreur", {
        description:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors du téléchargement.",
      });
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <SectionContainer
      id="stage"
      ariaLabel="Recherche de stage"
      background="muted"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-10 rounded-xl border bg-primary/5 shadow-sm text-center space-y-4"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
          À la recherche d'un stage
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          Je recherche un stage de fin d'études en développement web (4
          jours/semaine) pour la période février - mai 2026.
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4 pt-4">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="#contact">
              <Mail className="mr-2" aria-hidden="true" />
              Me contacter
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="w-full sm:w-auto"
            disabled={isDownloading}
          >
            <a
              href="/api/cv"
              onClick={handleCVDownload}
              aria-disabled={isDownloading}
              className={isDownloading ? "pointer-events-none opacity-50" : ""}
            >
              <Download className="mr-2" aria-hidden="true" />
              {isDownloading ? "Téléchargement..." : "Télécharger mon CV"}
            </a>
          </Button>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
