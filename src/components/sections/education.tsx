"use client";

import { motion } from "framer-motion";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { SectionContainer } from "@/components/section-container";

const educationData = [
  {
    id: 1,
    period: "Été 2025",
    degree: "Summer School - Application Mobile React Native",
    institution: "Seneca Polytechnic",
    location: "Toronto, Canada",
    description:
      "Programme intensif de développement d'applications mobiles multiplateformes",
    highlights: [
      "Développement React Native",
      "Conception d'interfaces modernes",
      "Intégration d'APIs externes",
      "Travail en équipe internationale (Belgique, Canada, Danemark)",
      "Authentification avec Supabase",
    ],
  },
  {
    id: 2,
    period: "2022 - 2026",
    degree: "Bachelier en Technologies de l'Informatique",
    institution: "EPHEC",
    location: "Louvain-la-Neuve, Belgique",
    description:
      "Formation complète en développement logiciel, réseaux et infrastructure IT avec une approche pratique orientée vers les besoins du marché",
    highlights: [
      "Développement web (Frontend & Backend)",
      "Programmation avancée (JavaScript, TypeScript, Python, Go)",
      "Frameworks modernes (React.js, Next.js, Node.js, Express.js)",
      "Bases de données relationnelles (SQL) et NoSQL",
      "Architecture logicielle et APIs RESTful",
      "Méthodologies Agile et Scrum",
      "Infrastructure et DevOps (Docker, Linux, Nginx)",
      "Sécurité informatique et réseaux",
      "Gestion de version (Git) et CI/CD",
    ],
  },
  {
    id: 3,
    period: "2016 - 2022",
    degree: "Certificat d'Enseignement Secondaire Supérieur (CESS)",
    institution: "Athénée Royal de Waterloo",
    location: "Waterloo, Belgique",
    description: "Enseignement secondaire général",
    highlights: ["Formation générale complète", "Diplôme d'études secondaires"],
  },
];

export function EducationSection() {
  return (
    <SectionContainer
      id="formation"
      ariaLabel="Ma formation"
      background="muted"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4 mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Formation
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              Mon parcours académique et mes certifications
            </p>
          </div>
        </motion.div>

        <div className="relative">
          {/* Ligne verticale de la timeline */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/30 hidden sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative sm:pl-10 border-l-2 border-primary sm:border-none pl-4"
              >
                {/* Point sur la timeline (desktop uniquement) */}
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-[7px] hidden sm:block" />

                {/* Contenu */}
                <div className="space-y-3">
                  {/* Période */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-muted-foreground">
                      {edu.period}
                    </span>
                  </div>

                  {/* Diplôme */}
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-primary mt-0.5 flex-shrink-0" />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                      {edu.degree}
                    </h3>
                  </div>

                  {/* Établissement et localisation */}
                  <div className="ml-8 sm:ml-9 space-y-1">
                    <p className="text-base sm:text-lg text-primary font-semibold">
                      {edu.institution}
                    </p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm sm:text-base text-muted-foreground">
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <p className="text-sm sm:text-base text-muted-foreground italic ml-8 sm:ml-9 mt-2">
                      {edu.description}
                    </p>
                  )}

                  {/* Points clés */}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="mt-4 ml-8 sm:ml-9">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {edu.highlights.map((highlight, i) => (
                          <li
                            key={`${edu.id}-highlight-${i}-${highlight.slice(0, 20)}`}
                            className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground"
                          >
                            <span className="text-primary mt-1 flex-shrink-0 font-bold">
                              •
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
