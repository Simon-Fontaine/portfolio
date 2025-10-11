"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "@/components/section-container";

const skillsData = [
  {
    title: "Frontend",
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
    skills: ["Node.js", "Express.js", "REST APIs", "SQL", "Python", "Go"],
  },
  {
    title: "DevOps & Infrastructure",
    skills: ["Docker", "Linux", "Git", "Nginx", "CI/CD", "Agile / Scrum"],
  },
  {
    title: "Soft Skills",
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
    <SectionContainer id="skills" ariaLabel="Mes compétences">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Compétences
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Mes expertises techniques et humaines
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-xl border bg-card shadow-sm"
            >
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
