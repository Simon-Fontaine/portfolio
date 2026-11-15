/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for the portfolio website AND both CVs.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  • Translated text is written as `{ fr: "…", en: "…" }`.
 *    TypeScript refuses to build if one language is missing.
 *  • Plain strings (names, technologies, URLs) are the same in every language.
 *  • Dates: "2026" or "2026-02". Omit `end` for a single date, or use "present".
 *  • Order in each list = display order (most recent first).
 *  • `cv: false` keeps an entry on the website only.
 *
 *  After editing, run `npm run cv` to regenerate the PDFs (the build does it
 *  automatically). See README.md → "Updating content".
 */
import type { Profile } from "./types";

export const profile: Profile = {
  name: "Simon Fontaine",
  headline: {
    fr: "Informaticien junior | Développement logiciel, données et systèmes",
    en: "Junior IT Specialist | Software Development, Data and Systems",
  },
  summary: {
    fr: "Diplômé de l'EPHEC en juin 2026, je cherche mon premier poste en informatique, de préférence en développement logiciel. J'ai surtout développé des applications web, et je m'intéresse aussi aux données, aux systèmes et aux réseaux.",
    en: "I graduated from EPHEC in June 2026 and I'm looking for my first IT job, preferably in software development. I have mostly built web applications, and I'm also interested in data, systems and networks.",
  },
  about: {
    fr: "J'ai grandi entre Ottawa et la Belgique, je travaille donc aussi bien en français qu'en anglais. J'aime les projets qui servent à quelque chose de concret : une application pour organiser des matchs d'entraînement, une sonnette connectée pour des professeurs, un bot pour une communauté Discord.",
    en: "I grew up between Ottawa and Belgium, so I work in French as easily as in English. I like projects that serve a concrete purpose: an app to organise practice matches, a connected doorbell for teachers, a bot for a Discord community.",
  },
  availability: {
    fr: "Disponible pour un premier poste",
    en: "Available for a first role",
  },
  location: { city: "Uccle", country: { fr: "Belgique", en: "Belgium" } },
  mainStack: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Docker",
  ],
  email: "simon.fontaine@live.com",
  website: "https://www.simonfontaine.com",
  social: [
    {
      id: "github",
      label: "github.com/Simon-Fontaine",
      url: "https://github.com/Simon-Fontaine",
    },
    {
      id: "linkedin",
      label: "linkedin.com/in/fontaine-simon",
      url: "https://www.linkedin.com/in/fontaine-simon/",
    },
  ],

  // ── Experience ────────────────────────────────────────────────────────────
  experience: [
    {
      id: "3d-side",
      role: { fr: "Développeur web stagiaire", en: "Web Developer Intern" },
      organization: "3D-Side",
      url: "https://www.3d-side.com/",
      period: { start: "2026-02", end: "2026-05" },
      location: {
        city: "Mont-Saint-Guibert",
        country: { fr: "Belgique", en: "Belgium" },
      },
      summary: {
        fr: "Participation au développement et à la maintenance de Customize, une plateforme web de planification chirurgicale, au sein d'une équipe travaillant principalement en anglais.",
        en: "Took part in the development and maintenance of Customize, a web platform for surgical planning, in a team that works mainly in English.",
      },
      highlights: [
        {
          fr: "Création de tests automatisés pour vérifier le bon fonctionnement de l'application, notamment dans le navigateur, et intégration de leur exécution au processus de validation du code.",
          en: "Wrote automated tests to check that the application works properly, including in the browser, and added them to the code validation process.",
        },
        {
          fr: "Réorganisation et adaptation des composants de visualisation 2D et 3D pour ajuster leurs commandes aux fonctionnalités disponibles.",
          en: "Reorganised and adapted the 2D and 3D viewing components so that their controls match the features available.",
        },
        {
          fr: "Adaptation de l'environnement de développement pour faciliter les tests de modules partagés en local, sans devoir publier de nouvelles versions.",
          en: "Adapted the development environment so that shared modules can be tested locally, without having to publish new versions.",
        },
        {
          fr: "Correction de bugs, documentation des vérifications effectuées et prise en compte des retours de l'équipe lors des revues de code.",
          en: "Fixed bugs, documented the checks I carried out and took the team's feedback into account during code reviews.",
        },
      ],
      tech: [
        "TypeScript",
        "Vue.js",
        "Vitest",
        "Playwright",
        "GitLab CI",
        "Docker",
        "Vite",
      ],
    },
    {
      id: "student-jobs",
      role: { fr: "Jobs étudiants", en: "Student Jobs" },
      organization: {
        fr: "Colruyt Group et CHU Helora",
        en: "Colruyt Group and CHU Helora",
      },
      period: { start: "2020", end: "2025" },
      location: {
        city: "Nivelles",
        country: { fr: "Belgique", en: "Belgium" },
      },
    },
  ],

  // ── Projects ──────────────────────────────────────────────────────────────
  // All projects appear on the website. Keep the CV short: set `cv: false`
  // on the ones that should only appear on the website.
  projects: [
    {
      id: "scrimflow",
      featured: true,
      name: "Scrimflow",
      context: { fr: "Travail de fin d'études", en: "Final-year project" },
      period: { start: "2026" },
      summary: {
        fr: "Développement d'une application web permettant aux équipes de joueurs d'Overwatch d'organiser des matchs d'entraînement et d'enregistrer leurs résultats.",
        en: "Developed a web application that lets teams of Overwatch players organise practice matches and record their results.",
      },
      highlights: [
        {
          fr: "Conception de la base de données et développement de l'interface et de l'API permettant la communication entre les différentes parties de l'application.",
          en: "Designed the database and developed the interface and the API that lets the different parts of the application communicate.",
        },
        {
          fr: "Mise en place de la gestion des comptes utilisateurs, des sessions de connexion et des droits d'accès aux différentes fonctionnalités.",
          en: "Set up user accounts, login sessions and access rights to the different features.",
        },
        {
          fr: "Intégration de l'intelligence artificielle Gemini pour extraire automatiquement des résultats depuis des captures d'écran, avec possibilité de vérification et de correction par l'utilisateur.",
          en: "Integrated the Gemini artificial intelligence to extract results automatically from screenshots, which the user can then check and correct.",
        },
        {
          fr: "Configuration de l'environnement de déploiement de l'application à l'aide de Docker Compose et Caddy.",
          en: "Set up the application's deployment environment with Docker Compose and Caddy.",
        },
      ],
      tech: [
        "TypeScript",
        "React/Next.js",
        "Hono/Bun",
        "PostgreSQL",
        "Drizzle",
        "Gemini",
        "Docker Compose",
        "Caddy",
      ],
      repository: "https://github.com/Simon-Fontaine/tfe-2026",
    },
    {
      id: "enterprise-network",
      featured: true,
      name: { fr: "Réseau d'entreprise", en: "Enterprise Network" },
      context: {
        fr: "Projet académique EPHEC en équipe",
        en: "EPHEC academic team project",
      },
      period: { start: "2026" },
      summary: {
        fr: "Réalisation en équipe d'un projet associant une application web à une infrastructure réseau, avec séparation des services en différentes zones de sécurité.",
        en: "Team project combining a web application and a network infrastructure, with the services separated into different security zones.",
      },
      highlights: [
        {
          fr: "Mise en place d'un environnement utilisant des conteneurs Docker et configuration d'un processus automatisé pour déployer l'application.",
          en: "Set up an environment based on Docker containers and an automated process to deploy the application.",
        },
        {
          fr: "Configuration de sauvegardes de la base de données PostgreSQL pour faciliter la récupération des données en cas de problème.",
          en: "Set up backups of the PostgreSQL database so that data can be recovered if something goes wrong.",
        },
      ],
      tech: ["Linux", "Docker", "PostgreSQL", "Gitea", "SSH"],
      repository: "https://github.com/Simon-Fontaine/reseau-d-entreprise",
    },
    {
      id: "fisheye",
      featured: true,
      cv: false,
      name: "Fisheye",
      context: {
        fr: "Projet d'intégration EPHEC en équipe",
        en: "EPHEC team integration project",
      },
      period: { start: "2025" },
      summary: {
        fr: "Réalisation en équipe d'une sonnette connectée avec écran, qui prévient les professeurs d'une visite et affiche leur disponibilité.",
        en: "Built as a team: a connected doorbell with a display that tells teachers someone is at the door and shows whether they are available.",
      },
      highlights: [
        {
          fr: "Développement de la partie serveur, qui enregistre les données et échange des messages avec les sonnettes et les écrans.",
          en: "Developed the server side, which stores the data and exchanges messages with the doorbells and displays.",
        },
        {
          fr: "Gestion des coupures de connexion : le serveur se reconnecte seul et renvoie les messages qui n'ont pas été reçus.",
          en: "Handled connection drops: the server reconnects on its own and resends the messages that were not received.",
        },
      ],
      tech: [
        "TypeScript",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma",
        "MQTT",
      ],
      repository:
        "https://github.com/bpatureau/Projet-d-integration-groupe-fisheye",
    },
    {
      id: "bookworm",
      cv: false,
      name: "Bookworm",
      context: {
        fr: "Summer School à Seneca Polytechnic, équipe internationale",
        en: "Seneca Polytechnic Summer School, international team",
      },
      period: { start: "2025-07" },
      summary: {
        fr: "Application mobile pour suivre ses lectures et partager des livres, développée à Toronto. Elle permet de classer ses livres en trois listes : lus, en cours et à lire.",
        en: "A mobile app to keep track of your reading and share books, built in Toronto. You can sort your books into three lists: read, reading and to read.",
      },
      tech: ["React Native", "Expo", "TypeScript"],
      repository:
        "https://github.com/Simon-Fontaine/rnss25-group-7-simon-guillaume-rehat-mostafa",
      image: {
        src: "/images/projects/book-worm.png",
        alt: {
          fr: "Logo de l'application Bookworm",
          en: "Bookworm app logo",
        },
      },
    },
    {
      id: "surviecraft",
      cv: false,
      name: "SurvieCraft V3",
      context: { fr: "Projet personnel", en: "Personal project" },
      summary: {
        fr: "Bot Discord qui gère les demandes d'aide des membres, la modération et les événements d'une communauté.",
        en: "A Discord bot that handles members' requests for help, moderation and events for a community.",
      },
      tech: ["JavaScript", "Node.js", "Discord.js", "MongoDB/Mongoose"],
      repository: "https://github.com/Simon-Fontaine/surviecraft-v3",
      image: {
        src: "/images/projects/surviecraft.png",
        alt: {
          fr: "Logo du bot Discord SurvieCraft",
          en: "SurvieCraft Discord bot logo",
        },
      },
    },
  ],

  // ── Education ─────────────────────────────────────────────────────────────
  education: [
    {
      id: "ephec",
      degree: {
        fr: "Bachelier en informatique, orientation Technologies de l'informatique",
        en: "Bachelor's Degree in Computing, specialising in Information Technology",
      },
      school: "EPHEC",
      url: "https://www.ephec.be/formations/haute-ecole/bachelier-en-technologies-de-linformatique",
      period: { start: "2022", end: "2026" },
      location: {
        city: "Louvain-la-Neuve",
        country: { fr: "Belgique", en: "Belgium" },
      },
      summary: {
        fr: "Diplôme obtenu en juin 2026. Formation polyvalente couvrant le développement logiciel, la conception et la gestion de bases de données, l'administration des systèmes et réseaux, la cybersécurité et les aspects juridiques de l'informatique, notamment le RGPD.",
        en: "Graduated in June 2026. A broad programme covering software development, database design and management, system and network administration, cybersecurity and the legal side of IT, including the GDPR.",
      },
    },
    {
      id: "seneca",
      degree: {
        fr: "Summer School en développement mobile React Native",
        en: "React Native Mobile Development Summer School",
      },
      school: "Seneca Polytechnic",
      url: "https://students.senecapolytechnic.ca/global-learning-inbound-flpa-Cross-Platform-App-Development",
      period: { start: "2025-07" },
      location: { city: "Toronto", country: "Canada" },
      summary: {
        fr: "Conception et développement de Bookworm, une application mobile permettant de suivre ses lectures et de partager des livres, avec React Native et Expo, au sein d'une équipe internationale.",
        en: "Designed and developed Bookworm, a mobile app to keep track of your reading and share books, with React Native and Expo, in an international team.",
      },
    },
    {
      id: "secondary",
      degree: { fr: "Enseignement secondaire", en: "Secondary Education" },
      school: "Athénée Royal de Waterloo",
      url: "https://www.ar-waterloo.be/",
      period: { start: "2016-09", end: "2022-06" },
      location: {
        city: "Waterloo",
        country: { fr: "Belgique", en: "Belgium" },
      },
    },
    {
      id: "primary",
      degree: { fr: "Enseignement primaire", en: "Primary Education" },
      school: "Terre-des-Jeunes",
      url: "https://terre-des-jeunes.ecolecatholique.ca/",
      period: { start: "2010-09", end: "2016-06" },
      location: { city: "Ottawa", country: "Canada" },
    },
  ],

  // ── Skills ────────────────────────────────────────────────────────────────
  skills: [
    {
      id: "development",
      name: { fr: "Développement", en: "Development" },
      items: [
        "TypeScript",
        "JavaScript",
        "Python",
        "Java",
        "Spring Boot",
        "React",
        "Next.js",
        "Vue.js",
        "Node.js",
        { fr: "API REST", en: "REST APIs" },
      ],
    },
    {
      id: "data",
      name: { fr: "Données", en: "Data" },
      items: [
        "SQL",
        "PostgreSQL",
        "MariaDB",
        "Redis",
        { fr: "modélisation de données", en: "data modelling" },
        "Excel",
      ],
    },
    {
      id: "systems",
      name: { fr: "Systèmes et réseaux", en: "Systems and Networking" },
      items: [
        "Linux",
        "TCP/IP",
        "VLAN",
        { fr: "routage", en: "routing" },
        "DNS",
        "Nginx",
        "SSH",
        "MQTT",
      ],
    },
    {
      id: "tools",
      name: { fr: "Infrastructure et outils", en: "Infrastructure and Tools" },
      items: [
        "Docker",
        "Docker Compose",
        "Git",
        "GitLab CI",
        "Vitest",
        "Playwright",
      ],
    },
  ],

  // ── Languages ─────────────────────────────────────────────────────────────
  languages: [
    {
      name: { fr: "Français", en: "French" },
      level: { fr: "Langue maternelle", en: "Native" },
    },
    {
      name: { fr: "Anglais", en: "English" },
      level: {
        fr: "C1, évalué par eLAO (Forem, août 2026)",
        en: "C1, assessed by eLAO (Forem, August 2026)",
      },
    },
  ],
};
