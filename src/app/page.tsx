"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background text-foreground">
      <motion.div
        className="max-w-3xl space-y-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="scroll-m-20 text-4xl text-primary font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
          Simon Fontaine
        </h1>

        <p className="text-muted-foreground text-xl">
          Développeur full-stack passionné, j'aime concevoir des applications
          simples, solides et bien pensées — du backend à l'interface
          utilisateur.
        </p>

        <div className="flex items-center justify-center space-x-4">
          <Button variant="default" disabled size="lg">
            Voir mes projets
          </Button>
          <Button variant="outline" disabled size="lg">
            Me contacter
          </Button>
        </div>

        <motion.div
          className="flex items-center justify-center space-x-6 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a
            href="https://github.com/Simon-Fontaine"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SiGithub className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/fontaine-simon/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SiLinkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:contact@simonfontaine.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-6 w-6" />
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}
