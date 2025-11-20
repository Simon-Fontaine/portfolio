"use client";

import { motion } from "motion/react";
import { SectionContainer } from "@/components/section-container";
import { SKILLS_HEADING, SKILLS_SUBHEADING, skillsData } from "@/lib/constants";

export function SkillsSection() {
  return (
    <SectionContainer
      id="skills"
      ariaLabel="Mes compétences"
      background="muted"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {SKILLS_HEADING}
          </h2>
          <p className="text-base font-bold sm:text-lg text-muted-foreground max-w-2xl">
            {SKILLS_SUBHEADING}
          </p>
        </div>

        {/* Layout en sections épuré */}
        <div className="space-y-10 sm:space-y-14">
          {skillsData.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                className="group relative"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                  {/* Icône et titre */}
                  <div className="flex items-center gap-4 sm:w-64 flex-shrink-0">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors duration-300">
                      <Icon className="size-6" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">
                      {category.title}
                    </h3>
                  </div>

                  {/* Séparateur vertical (desktop) */}
                  <div className="hidden sm:block w-px bg-border self-stretch" />

                  {/* Liste des compétences */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex-1"
                  >
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm font-medium hover:bg-muted hover:border-primary/30 transition-all duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Ligne de séparation entre sections (sauf dernière) */}
                {idx < skillsData.length - 1 && (
                  <div className="mt-10 sm:mt-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
