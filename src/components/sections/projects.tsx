"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { SectionContainer } from "@/components/section-container";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  image?: string;
  imageLight?: string;
  imageDark?: string;
  imageAlt?: string;
}

const projects: Project[] = [
  {
    title: "Book Worm",
    description:
      "Développement d'une application mobile multiplateforme en React Native dans le cadre d'une équipe internationale (Belgique, Canada, Danemark). Conception d'une interface moderne, intégration d'une API externe et mise en place d'un système d'authentification via Supabase. ",
    technologies: ["React Native", "TypeScript", "Supabase", "Expo"],
    githubUrl:
      "https://github.com/Simon-Fontaine/rnss25-group-7-simon-guillaume-rehat-mostafa",
    image: "/images/projects/book-worm.png",
    imageAlt: "Capture d'écran de l'application Book Worm",
  },
  {
    title: "MadBracket",
    description:
      "Création d'une plateforme web complète pour l'organisation et la gestion de tournois en ligne. Développement en React.js (front-end) et Node.js / Express (back-end) avec base de données SQL, mise en place d'une architecture REST et d'un système de gestion des utilisateurs.",
    technologies: ["React.js", "Node.js", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/Bistouflere/Dev-Web-2024",
    imageLight: "/images/projects/madbracket-light.png",
    imageDark: "/images/projects/madbracket-dark.png",
    imageAlt: "Capture d'écran de la plateforme MadBracket",
  },
  {
    title: "Portfolio Personnel",
    description:
      "Portfolio moderne développé avec Next.js 15, TypeScript et Tailwind CSS. Intègre des animations fluides avec Framer Motion et supporte le thème sombre/clair.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/Simon-Fontaine/portfolio",
    imageLight: "/images/projects/portfolio-light.png",
    imageDark: "/images/projects/portfolio-dark.png",
    imageAlt: "Capture d'écran du portfolio personnel",
  },
];

export function ProjectsSection() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getProjectImage = (project: Project) => {
    if (project.imageLight && project.imageDark) {
      if (!mounted) {
        return project.imageLight;
      }
      const currentTheme = resolvedTheme || theme;
      return currentTheme === "dark" ? project.imageDark : project.imageLight;
    }
    return project.image;
  };

  return (
    <SectionContainer id="projets" ariaLabel="Mes projets">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Projets
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Une sélection de mes réalisations récentes
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project) => {
                const projectImage = getProjectImage(project);
                return (
                  <CarouselItem
                    key={project.title}
                    className="pl-2 md:pl-4 basis-[85%] md:basis-[90%]"
                  >
                    <Card className="h-full flex flex-col">
                      {projectImage && (
                        <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-t-xl flex-shrink-0">
                          <Image
                            src={projectImage}
                            alt={project.imageAlt || project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                          />
                        </div>
                      )}
                      <CardHeader className="flex-shrink-0">
                        <CardTitle className="text-xl sm:text-2xl">
                          {project.title}
                        </CardTitle>
                        {project.githubUrl && (
                          <CardAction>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors"
                              aria-label={`Voir le code source de ${project.title} sur GitHub`}
                            >
                              <SiGithub className="size-6" aria-hidden="true" />
                            </a>
                          </CardAction>
                        )}
                        <CardDescription className="text-sm sm:text-base">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-shrink-0 mt-auto">
                        <ul className="flex flex-wrap gap-2 list-none">
                          {project.technologies.map((tech) => (
                            <li key={tech}>
                              <span className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm bg-primary/10 text-primary font-medium">
                                {tech}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="left-0 -translate-x-1/2" />
              <CarouselNext className="right-0 translate-x-1/2" />
            </div>
          </Carousel>
        </motion.div>

        <div className="text-center text-muted-foreground py-8 mt-6">
          <p className="text-sm sm:text-base">
            D'autres projets personnels et académiques seront ajoutés
            prochainement.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
