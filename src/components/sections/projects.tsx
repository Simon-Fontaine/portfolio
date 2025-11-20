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
import {
  PROJECTS_HEADING,
  PROJECTS_OTHER,
  PROJECTS_SUBHEADING,
  type Project,
  projects,
} from "@/lib/constants";

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
    <SectionContainer id="projects" ariaLabel="Mes projets">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {PROJECTS_HEADING}
          </h2>
          <p className="text-base font-bold sm:text-lg text-muted-foreground max-w-2xl">
            {PROJECTS_SUBHEADING}
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
                ),
              )}
            </div>
          </fieldset>
        </motion.div>
        <div className="text-center text-muted-foreground py-8 mt-6">
          <p className="text-sm sm:text-base">{PROJECTS_OTHER}</p>
        </div>
      </div>
    </SectionContainer>
  );
}
