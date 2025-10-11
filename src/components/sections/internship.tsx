"use client";

import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import Link from "next/link";
import { SectionContainer } from "@/components/section-container";
import { Button } from "@/components/ui/button";

export function InternshipSection() {
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
          >
            <a href="/documents/cv.pdf" download>
              <Download className="mr-2" aria-hidden="true" />
              Télécharger mon CV
            </a>
          </Button>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
