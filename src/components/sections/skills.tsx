"use client";

import { Code2, Cog, Server, Users } from "lucide-react";
import { motion } from "motion/react";
import { SectionContainer } from "@/components/section-container";

const skillsData = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      "JavaScript",
      "React.js",
      "HTML5",
      "CSS3",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST APIs", "SQL", "Python", "Go"],
  },
  {
    title: "DevOps & Infrastructure",
    icon: Cog,
    skills: ["Docker", "Linux", "Git", "Nginx", "CI/CD", "Agile / Scrum"],
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: [
      "Résolution de problèmes",
      "Travail en équipe",
      "Autonomie",
      "Curiosité technique",
      "Apprentissage rapide",
    ],
  },
];

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
            Compétences
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Mes expertises techniques et humaines
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
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group relative"
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
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          className="px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm font-medium hover:bg-muted hover:border-primary/30 transition-all duration-200"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
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
