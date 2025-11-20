"use client";

import { motion } from "motion/react";
import { SectionContainer } from "@/components/section-container";
import {
  ABOUT_CONTENT,
  ABOUT_HEADING,
  ABOUT_SUBHEADING,
} from "@/lib/constants";

export function AboutSection() {
  return (
    <SectionContainer id="about" ariaLabel="À propos de moi" background="muted">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="space-y-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {ABOUT_HEADING}
          </h2>
          <p className="text-base font-bold sm:text-lg text-muted-foreground max-w-2xl">
            {ABOUT_SUBHEADING}
          </p>
        </div>
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground max-w-3xl">
          {ABOUT_CONTENT.map((paragraph, _index) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
