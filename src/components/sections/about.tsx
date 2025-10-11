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
            Développeur full-stack passionné, actuellement en troisième année de
            Bachelier en Technologies de l'Informatique à l'EPHEC. J'aime
            concevoir des applications modernes, performantes et bien
            structurées, en mettant l'accent sur la qualité du code et
            l'expérience utilisateur.
          </p>
          <p>
            Au fil de mes projets, j'ai acquis une bonne maîtrise de React,
            Node.js et PostgreSQL, ainsi que d'outils plus récents comme Next.js
            et Prisma. Je m'intéresse aussi beaucoup à l'architecture backend, à
            la sécurité des applications web et à l'auto-hébergement de mes
            propres services.
          </p>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
