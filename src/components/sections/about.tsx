"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "@/components/section-container";

export function AboutSection() {
  return (
    <SectionContainer id="about" ariaLabel="À propos de moi" background="muted">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="space-y-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            À propos
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Mon parcours et ma passion pour le développement
          </p>
        </div>
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground max-w-3xl">
          <p>
            Développeur full-stack passionné, je suis actuellement en 3ème année
            de Bachelier en Technologies de l'Informatique à l'EPHEC
            (Louvain-la-Neuve).
          </p>
          <p>
            Au cours de ma formation, j'ai développé de solides compétences en
            développement web moderne, avec une spécialisation dans les
            technologies React, Node.js, et PostgreSQL. J'aime créer des
            applications performantes et bien architecturées.
          </p>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
