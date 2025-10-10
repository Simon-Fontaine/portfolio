"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-primary font-medium text-base sm:text-lg"
              >
                Bonjour, je suis
              </motion.p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Simon Fontaine
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-muted-foreground">
                Développeur Full-Stack
              </h2>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl">
              Étudiant en 3ème année de Bachelier en Technologies de
              l'Informatique à l'EPHEC. Passionné par le développement web et à
              la recherche d'un stage pour mettre en pratique mes compétences.
            </p>

            <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
              <MapPin className="size-4 flex-shrink-0" aria-hidden="true" />
              <span>Nivelles, Belgique</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 pt-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="#projets">
                  Voir mes projets
                  <ArrowRight className="ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="#contact">
                  <Mail className="mr-2" aria-hidden="true" />
                  Me contacter
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <a
                href="https://github.com/Simon-Fontaine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label="Profil GitHub de Simon Fontaine"
              >
                <SiGithub className="size-6" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/in/fontaine-simon/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label="Profil LinkedIn de Simon Fontaine"
              >
                <SiLinkedin className="size-6" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="about"
        className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        aria-labelledby="about-heading"
      >
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold"
            >
              À propos
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
              <p>
                Développeur full-stack passionné, je suis actuellement en 3ème
                année de Bachelier en Technologies de l'Informatique à l'EPHEC
                (Louvain-la-Neuve).
              </p>
              <p>
                Au cours de ma formation, j'ai développé de solides compétences
                en développement web moderne, avec une spécialisation dans les
                technologies React, Node.js, et PostgreSQL. J'aime créer des
                applications performantes et bien architecturées.
              </p>
              <p>
                Je suis actuellement à la recherche d'un stage de fin d'études
                (février - mai 2026) pour approfondir mes compétences au sein
                d'une équipe professionnelle.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="skills"
        className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-muted/30"
        aria-labelledby="skills-heading"
      >
        <div className="max-w-4xl w-full">
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12"
          >
            Compétences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: "Frontend",
                skills: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "JavaScript",
                  "Tailwind CSS",
                  "HTML5/CSS3",
                ],
              },
              {
                title: "Backend",
                skills: [
                  "Node.js",
                  "Express",
                  "PostgreSQL",
                  "RESTful API",
                  "Git",
                ],
              },
              {
                title: "DevOps & Tools",
                skills: ["Docker", "Linux", "GitHub", "AWS (bases)", "CI/CD"],
              },
              {
                title: "Soft Skills",
                skills: [
                  "Travail d'équipe",
                  "Autonomie",
                  "Apprentissage rapide",
                  "Communication",
                ],
              },
            ].map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 sm:p-6 rounded-lg border bg-card"
              >
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="formation"
        className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        aria-labelledby="formation-heading"
      >
        <div className="max-w-4xl w-full">
          <h2
            id="formation-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12"
          >
            Formation
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-l-2 border-primary pl-4 sm:pl-6 space-y-2"
          >
            <p className="text-sm sm:text-base text-muted-foreground">
              2023 - 2026
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
              Bachelier en Technologies de l'Informatique
            </h3>
            <p className="text-primary font-medium text-base sm:text-lg">
              EPHEC · Louvain-la-Neuve
            </p>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-muted-foreground mt-4">
              <li>Développement web (Frontend & Backend)</li>
              <li>Bases de données relationnelles</li>
              <li>Architecture logicielle et design patterns</li>
              <li>Méthodologies Agile</li>
              <li>Infrastructure et DevOps</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section
        id="projets"
        className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-muted/30"
        aria-labelledby="projets-heading"
      >
        <div className="max-w-4xl w-full">
          <h2
            id="projets-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12"
          >
            Projets
          </h2>

          {/* Portfolio Project */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-4 sm:p-6 rounded-lg border bg-card mb-4 sm:mb-6"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-bold">
                  Portfolio Personnel
                </h3>
                <a
                  href="https://github.com/Simon-Fontaine/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded flex-shrink-0"
                  aria-label="Voir le code source du portfolio sur GitHub"
                >
                  <SiGithub className="size-5" aria-hidden="true" />
                </a>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Portfolio moderne développé avec Next.js 15, TypeScript et
                Tailwind CSS. Intègre des animations fluides avec Framer Motion
                et supporte le thème sombre/clair.
              </p>
              <ul className="flex flex-wrap gap-2 list-none">
                {["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map(
                  (tech) => (
                    <li key={tech}>
                      <span className="px-2 py-1 rounded text-xs sm:text-sm bg-primary/10 text-primary">
                        {tech}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </motion.article>

          {/* Placeholder for more projects */}
          <div className="text-center text-muted-foreground py-8">
            <p className="text-sm sm:text-base">
              D'autres projets personnels et académiques seront ajoutés
              prochainement.
            </p>
          </div>
        </div>
      </section>

      <section
        className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        aria-labelledby="stage-heading"
      >
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-lg border bg-primary/5 text-center space-y-4"
          >
            <h3
              id="stage-heading"
              className="text-xl sm:text-2xl md:text-3xl font-bold"
            >
              À la recherche d'un stage
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Je recherche un stage de fin d'études en développement web (4
              jours/semaine) pour la période février - mai 2026.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <a href="mailto:contact@simonfontaine.com">
                  <Mail className="mr-2" aria-hidden="true" />
                  Me contacter
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <a href="/FONTAINE_Simon.pdf" download>
                  <Download className="mr-2" aria-hidden="true" />
                  Télécharger mon CV
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="contact"
        className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-muted/30"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-2xl w-full text-center space-y-6">
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            Contactez-moi
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Une opportunité de stage ? Un projet ? N'hésitez pas à me contacter
            !
          </p>
          <nav className="flex flex-col items-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <a href="mailto:contact@simonfontaine.com">
                <Mail className="mr-2" aria-hidden="true" />
                <span className="truncate">contact@simonfontaine.com</span>
              </a>
            </Button>
            <nav
              className="flex items-center gap-4"
              aria-label="Liens réseaux sociaux"
            >
              <a
                href="https://github.com/Simon-Fontaine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label="Profil GitHub de Simon Fontaine"
              >
                <SiGithub className="size-6" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/in/fontaine-simon/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label="Profil LinkedIn de Simon Fontaine"
              >
                <SiLinkedin className="size-6" aria-hidden="true" />
              </a>
            </nav>
          </nav>
        </div>
      </section>
    </>
  );
}
