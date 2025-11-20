import { Code2, Cog, Server, Users } from "lucide-react";

export const SITE_CONFIG = {
  name: "Simon Fontaine",
  title: "Simon Fontaine - Développeur Full-Stack",
  description:
    "Développeur full-stack passionné, spécialisé en React, Node.js et Next.js. Découvrez mes projets, mon parcours et mes compétences.",
  url: "https://simonfontaine.com",
  email: "contact@simonfontaine.com",
};

export const NAV_ITEMS = [
  { href: "#about", label: "À propos" },
  { href: "#education", label: "Formation" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export const SOCIAL_LINKS = [
  {
    name: "github",
    url: "https://github.com/Simon-Fontaine",
    icon: "github",
    label: "GitHub",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/simon-fontaine/",
    icon: "linkedin",
    label: "LinkedIn",
  },
];

export const ABOUT_HEADING = "À propos";
export const ABOUT_SUBHEADING =
  "Mon parcours et ma passion pour le développement";
export const ABOUT_CONTENT = [
  "Développeur full-stack passionné, je suis actuellement en troisième année de Bachelier en Technologies de l'Informatique à l'EPHEC. J'aime concevoir des applications modernes, performantes, et bien structurées - notamment en mettant l'accent sur la qualité du code et l'expérience utilisateur.",
  "Au fil de mes projets, j'ai acquis une bonne maîtrise de React, Node.js et PostgreSQL, ainsi que d'outils plus récents comme Next.js et Prisma.",
  "En outre, je m'intéresse beaucoup à l'architecture backend, à la sécurité des applications web, et à l'auto-hébergement de mes propres services.",
];

export const SKILLS_HEADING = "Compétences";
export const SKILLS_SUBHEADING = "Mes expertises techniques et humaines";
export const skillsData = [
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

export const EDUCATION_HEADING = "Formation";
export const EDUCATION_SUBHEADING =
  "Mon parcours académique et mes certifications";
export const educationData = [
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

export const PROJECTS_HEADING = "Projets";
export const PROJECTS_SUBHEADING = "Une sélection de mes réalisations récentes";
export const PROJECTS_OTHER =
  "D'autres projets personnels et académiques seront ajoutés prochainement.";

export interface Project {
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

export const projects: Project[] = [
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
      "Portfolio moderne développé avec Next.js 15, TypeScript et Tailwind CSS. Intègre des animations fluides avec Motion et supporte le thème sombre/clair.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    githubUrl: "https://github.com/Simon-Fontaine/portfolio",
    liveUrl: "https://simonfontaine.com",
    imageLight: "/images/projects/portfolio-light.png",
    imageDark: "/images/projects/portfolio-dark.png",
    imageAlt: "Capture d'écran du portfolio personnel",
  },
  {
    title: "SurvieCraft Bot Discord",
    description:
      "Bot Discord complet pour la gestion d'une communauté Minecraft de 2 000+ membres. Système avancé de modération avec auto-modération, tickets joueurs/staff avec transcriptions HTML, giveaways interactifs, système de rôles personnalisables, statistiques en temps réel et logs détaillés. Interface moderne avec slash commands, boutons interactifs et menus déroulants.",
    technologies: ["Node.js", "Discord.js v14", "MongoDB", "Mongoose"],
    githubUrl: "https://github.com/Simon-Fontaine/SurvieCraft-V3",
    liveUrl: "https://scbots.gitbook.io/surviecraft/",
    image: "/images/projects/surviecraft.png",
    imageAlt: "Logo du bot Discord SurvieCraft",
  },
];
