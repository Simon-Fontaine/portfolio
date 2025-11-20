"use client";

import { CheckCircle2, Download, Mail, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { SectionContainer } from "@/components/section-container";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { celebrate } from "@/lib/confetti";

export function InternshipSection() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  async function handleCVDownload(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadSuccess(false);

    const toastId = toast.loading("Préparation du téléchargement...");

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
            id: toastId,
            description: data.error || "Veuillez réessayer plus tard.",
            duration: 5000,
          });
        } else if (response.status === 500) {
          toast.error("Erreur serveur", {
            id: toastId,
            description:
              "Le CV est temporairement indisponible. Veuillez réessayer.",
            duration: 5000,
          });
        } else {
          toast.error("Erreur", {
            id: toastId,
            description:
              data.error ||
              "Impossible de télécharger le CV. Veuillez réessayer.",
            duration: 5000,
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

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      toast.success("CV téléchargé !", {
        id: toastId,
        description: "Le fichier a été téléchargé avec succès.",
        duration: 3000,
      });
      celebrate();

      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error("CV download error:", error);
      toast.error("Erreur", {
        id: toastId,
        description:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors du téléchargement.",
        duration: 5000,
      });
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <SectionContainer
      id="internship"
      ariaLabel="Recherche de stage"
      background="muted"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Recherche de stage
          </h2>
          <p className="text-base font-bold sm:text-lg text-muted-foreground max-w-2xl">
            Je recherche un stage de fin d'études en développement web
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Carte avec fond attractif */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 shadow-xl">
            {/* Effets de fond animés */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <motion.div
              className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Contenu simplifié */}
            <div className="relative p-6 sm:p-8 lg:p-10 text-center space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary font-semibold text-sm border border-primary/30"
              >
                <Sparkles className="size-4" />
                Disponible
              </motion.div>

              {/* Description détaillée */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Stage de fin d'études en développement web (4 jours/semaine)
                  pour la période février - mai 2026.
                </p>
              </motion.div>

              {/* Boutons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4 pt-4"
              >
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="#contact">
                    <Mail className="mr-2" aria-hidden="true" />
                    Me contacter
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto border-2 hover:bg-primary/10 hover:border-primary transition-all"
                  disabled={isDownloading}
                >
                  <a
                    href="/api/cv"
                    onClick={handleCVDownload}
                    aria-disabled={isDownloading}
                    className={
                      isDownloading || downloadSuccess
                        ? "pointer-events-none"
                        : ""
                    }
                  >
                    {isDownloading ? (
                      <>
                        <Spinner className="mr-2" />
                        Téléchargement...
                      </>
                    ) : downloadSuccess ? (
                      <>
                        <CheckCircle2 className="mr-2 text-green-500" />
                        CV téléchargé !
                      </>
                    ) : (
                      <>
                        <Download className="mr-2" aria-hidden="true" />
                        Télécharger mon CV
                      </>
                    )}
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
