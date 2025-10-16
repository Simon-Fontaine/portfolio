"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
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
  type CarouselApi,
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
  liveUrl?: string;
  image?: string;
  imageLight?: string;
  imageDark?: string;
  imageAlt?: string;
}

const projects: Project[] = [
  {
    title: "Book Worm",
    description:
      "Développement d'une application mobile multiplateforme en React Native dans le cadre d'une équipe internationale (Belgique, Canada, Danemark). Conception d'une interface moderne, intégration d'une API externe et mise en place d'un système d'authentification via Supabase.",
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
    liveUrl: "https://simonfontaine.com",
    imageLight: "/images/projects/portfolio-light.png",
    imageDark: "/images/projects/portfolio-dark.png",
    imageAlt: "Capture d'écran du portfolio personnel",
  },
  {
    title: "SurvieCraft Bot Discord",
    description:
      "Bot Discord complet pour la gestion d'une communauté Minecraft de 20 000+ membres. Système avancé de modération avec auto-modération, tickets joueurs/staff avec transcriptions HTML, giveaways interactifs, système de rôles personnalisables, statistiques en temps réel et logs détaillés. Interface moderne avec slash commands, boutons interactifs et menus déroulants.",
    technologies: ["Node.js", "Discord.js v14", "MongoDB", "Mongoose"],
    githubUrl: "https://github.com/Simon-Fontaine/SurvieCraft-V3",
    liveUrl: "https://scbots.gitbook.io/surviecraft/",
    image: "/images/projects/surviecraft.png",
    imageAlt: "Logo du bot Discord SurvieCraft",
  },
];

export function ProjectsSection() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

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
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Projets
          </h2>
          <p className="text-base font-bold sm:text-lg text-muted-foreground max-w-2xl">
            Une sélection de mes réalisations récentes
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project, index) => {
                const projectImage = getProjectImage(project);
                return (
                  <CarouselItem
                    key={project.title}
                    className="pl-2 md:pl-4 basis-[95%] sm:basis-[85%] md:basis-[48%] lg:basis-[48%]"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full"
                    >
                      <Card className="h-full flex flex-col group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                        {projectImage && (
                          <div className="relative w-full aspect-video overflow-hidden flex-shrink-0 bg-gradient-to-br from-muted/50 to-muted border-b">
                            <Image
                              src={projectImage}
                              alt={project.imageAlt || project.title}
                              fill
                              className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 48vw, 600px"
                              priority={index === 0}
                            />
                          </div>
                        )}
                        <CardHeader className="flex-shrink-0 pb-3">
                          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                            {project.title}
                          </CardTitle>
                          {(project.githubUrl || project.liveUrl) && (
                            <CardAction>
                              <div className="flex items-center gap-1">
                                {project.githubUrl && (
                                  <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-2 transition-all hover:bg-muted/50"
                                    aria-label={`Voir le code source de ${project.title} sur GitHub`}
                                  >
                                    <SiGithub
                                      className="size-5"
                                      aria-hidden="true"
                                    />
                                  </a>
                                )}
                                {project.liveUrl && (
                                  <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-2 transition-all hover:bg-muted/50"
                                    aria-label={`Voir le site de ${project.title}`}
                                  >
                                    <ExternalLink
                                      className="size-5"
                                      aria-hidden="true"
                                    />
                                  </a>
                                )}
                              </div>
                            </CardAction>
                          )}
                          <CardDescription className="text-sm leading-relaxed pt-2">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-shrink-0 mt-auto pt-0">
                          <ul
                            className="flex flex-wrap gap-2 list-none"
                            aria-label={`Technologies utilisées pour ${project.title}`}
                          >
                            {project.technologies.map((tech) => (
                              <li key={tech}>
                                <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors">
                                  {tech}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="hidden lg:block">
              <CarouselPrevious className="left-0 -translate-x-1/2" />
              <CarouselNext className="right-0 translate-x-1/2" />
            </div>
          </Carousel>

          {/* Pagination Indicator */}
          <fieldset
            className="flex items-center justify-center gap-4"
            aria-label="Navigation du carousel"
          >
            <div className="flex gap-2">
              {Array.from({ length: count }, (_, index) => index).map(
                (index) => (
                  <button
                    key={`pagination-dot-${index}`}
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === current - 1
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Aller au projet ${index + 1}`}
                    aria-current={index === current - 1 ? "true" : "false"}
                  />
                )
              )}
            </div>
          </fieldset>
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
