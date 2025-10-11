"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { SectionContainer } from "@/components/section-container";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <SectionContainer
      id="hero"
      ariaLabel="Section d'introduction"
      className="pt-32 sm:pt-36 lg:pt-40 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 max-w-4xl relative z-10"
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
          Étudiant en 3ème année de Bachelier en Technologies de l'Informatique
          à l'EPHEC. Passionné par le développement et à la recherche d'un stage
          pour mettre en pratique mes compétences.
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

        <nav
          className="flex items-center gap-3 pt-6"
          aria-label="Liens réseaux sociaux"
        >
          <a
            href="https://github.com/Simon-Fontaine"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center size-12 rounded-lg border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Profil GitHub de Simon Fontaine"
          >
            <SiGithub className="size-5" aria-hidden="true" />
          </a>
          <a
            href="https://linkedin.com/in/fontaine-simon/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center size-12 rounded-lg border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Profil LinkedIn de Simon Fontaine"
          >
            <SiLinkedin className="size-5" aria-hidden="true" />
          </a>
        </nav>
      </motion.div>
    </SectionContainer>
  );
}
