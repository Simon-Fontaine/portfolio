import { Code2, Cog, Server, Users } from "lucide-react";

export const SITE_CONFIG = {
  name: "Simon Fontaine",
  title: "Simon Fontaine - Développeur Full-Stack",
  description:
    "Étudiant en informatique à l'EPHEC, orienté développement full-stack avec React, Node.js et Next.js.",
  url: "https://simonfontaine.com",
  email: "contact@simonfontaine.com",
};

export const NAV_ITEMS = [
  { href: "#about", label: "À propos" },
  { href: "#education", label: "Formation" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
  { href: "/competences", label: "Portfolio" },
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
    url: "https://www.linkedin.com/in/fontaine-simon/",
    icon: "linkedin",
    label: "LinkedIn",
  },
];

export const ABOUT_HEADING = "À propos";
export const ABOUT_SUBHEADING = "Mon parcours et mes centres d'intérêt";
export const ABOUT_CONTENT = [
  "Je suis en troisième année de Bachelier en Technologies de l'Informatique à l'EPHEC. Je travaille surtout sur des applications web full-stack, avec une attention particulière à la structure du code et à l'expérience utilisateur.",
  "Mes projets m'ont amené à utiliser React, Node.js, PostgreSQL, Next.js et Prisma sur des cas assez différents : portfolio, outils web, bot Discord et projet de gestion d'équipe esport.",
  "Je m'intéresse aussi à l'architecture back-end, à la sécurité des applications web et à l'auto-hébergement de mes propres services.",
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
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "SQL",
      "PostgreSQL",
      "Prisma",
      "Go",
    ],
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
      "Programme intensif de développement mobile avec React Native et Expo",
    highlights: [
      "Développement React Native",
      "Conception d'interfaces mobiles",
      "Intégration d'APIs externes",
      "Travail en équipe internationale (Belgique, Canada)",
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
      "Formation en développement logiciel, réseaux et infrastructure IT, avec beaucoup de pratique",
    highlights: [
      "Développement web (Frontend & Backend)",
      "Programmation avancée (JavaScript, TypeScript, Python, Go)",
      "Frameworks web (React.js, Next.js, Node.js, Express.js)",
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
    highlights: ["Formation générale", "Diplôme d'études secondaires"],
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
    title: "Projet Fisheye",
    description:
      "Projet IoT sur Raspberry Pi reliant les calendriers des professeurs à un panneau LED et à une sonnette. J'ai travaillé sur le back-end Node.js, MQTT et PostgreSQL.",
    technologies: ["IoT", "Raspberry Pi", "Node.js", "MQTT", "PostgreSQL"],
    githubUrl:
      "https://github.com/bpatureau/Projet-d-integration-groupe-fisheye/tree/dev-backend-new/backend",
    image: "/images/projects/fisheye.png",
    imageAlt: "Système IoT Fisheye",
  },
  {
    title: "Book Worm",
    description:
      "Application mobile créée en équipe internationale pendant la Summer School à Toronto. Elle permet de suivre ses lectures et repose sur React Native, Expo et Supabase.",
    technologies: ["React Native", "Supabase", "Mobile"],
    githubUrl:
      "https://github.com/Simon-Fontaine/rnss25-group-7-simon-guillaume-rehat-mostafa",
    image: "/images/projects/book-worm.png",
    imageAlt: "Application Book Worm",
  },
  {
    title: "MadBracket",
    description:
      "Application web de gestion de tournois réalisée en projet scolaire. Elle couvre la création d'équipes, les profils joueurs et le suivi des compétitions.",
    technologies: ["React.js", "Express", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/Bistouflere/Dev-Web-2024",
    imageLight: "/images/projects/madbracket-light.png",
    imageDark: "/images/projects/madbracket-dark.png",
    imageAlt: "Interface MadBracket",
  },
  {
    title: "Portfolio Personnel",
    description:
      "Ce site portfolio est construit avec Next.js et déployé sur Vercel. Le formulaire de contact utilise Redis pour limiter les abus, et le CV est servi via Vercel Blob.",
    technologies: [
      "Next.js",
      "Redis",
      "Vercel Blob",
      "TypeScript",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/Simon-Fontaine/portfolio",
    liveUrl: "https://simonfontaine.com",
    imageLight: "/images/projects/portfolio-light.png",
    imageDark: "/images/projects/portfolio-dark.png",
    imageAlt: "Portfolio personnel",
  },
  {
    title: "SurvieCraft Bot",
    description:
      "Bot Discord TypeScript développé pour un serveur de plus de 2000 membres. Il gère les tickets support, une partie de la modération et des événements communautaires avec MongoDB.",
    technologies: ["TypeScript", "Discord.js", "MongoDB", "Node.js"],
    githubUrl: "https://github.com/Simon-Fontaine/SurvieCraft-V3",
    liveUrl: "https://scbots.gitbook.io/surviecraft/",
    image: "/images/projects/surviecraft.png",
    imageAlt: "Bot SurvieCraft",
  },
];
