"use client";

import { ArrowRight, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { NavLink } from "@/components/nav-link";
import { SectionContainer } from "@/components/section-container";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionContainer
      id="hero"
      ariaLabel="Section d'introduction"
      className="pt-32 sm:pt-36 lg:pt-40 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

        <motion.div
          className="absolute top-20 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-2xl"
          style={{ willChange: shouldReduceMotion ? "auto" : "transform" }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3],
                  x: [0, 40, 0],
                  y: [0, 25, 0],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-2xl"
          style={{ willChange: shouldReduceMotion ? "auto" : "transform" }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1.15, 1, 1.15],
                  opacity: [0.4, 0.2, 0.4],
                  x: [0, -25, 0],
                  y: [0, -40, 0],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-2xl"
          style={{ willChange: shouldReduceMotion ? "auto" : "transform" }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 max-w-6xl mx-auto relative z-10"
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            {SITE_CONFIG.name}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-muted-foreground"
          >
            Développeur Full-Stack
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          Étudiant en 3ème année de Bachelier en Technologies de l'Informatique
          à l'EPHEC. Passionné par le développement et à la recherche d'un stage
          pour mettre en pratique mes compétences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground"
        >
          <MapPin className="size-4 flex-shrink-0" aria-hidden="true" />
          <span>Nivelles, Belgique</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 pt-4"
        >
          <Button
            size="lg"
            asChild
            className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
          >
            <NavLink href="#projets">
              Voir mes projets
              <ArrowRight className="ml-2" aria-hidden="true" />
            </NavLink>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="w-full sm:w-auto border-2 hover:bg-primary/10 hover:border-primary transition-all"
          >
            <NavLink href="#contact">
              <Mail className="mr-2" aria-hidden="true" />
              Me contacter
            </NavLink>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <SocialLinks className="flex items-center gap-3 pt-6" />
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
