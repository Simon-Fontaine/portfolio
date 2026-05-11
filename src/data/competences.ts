import type { CompetencesData } from "@/types/competences";

export const competencesData: CompetencesData = {
  professionalProject: {
    title: "Développeur Full-Stack, spécialisation en cybersécurité",
    description:
      "Après mon bachelier à l'EPHEC, j'envisage un master ou une spécialisation d'un an en cybersécurité. Ce qui m'attire, c'est de comprendre un système dans son ensemble : base de données, API, interface, infrastructure et points faibles possibles.",
  },

  strengths: [
    "Autonome et autodidacte, j'apprends seul sans attendre un cours",
    "Forte curiosité technique, j'explore régulièrement de nouveaux langages et outils",
    "À l'aise avec les environnements Linux, Docker et les outils DevOps",
  ],

  weaknesses: [
    "Peu à l'aise à l'oral et dans les présentations formelles",
    "Tendance à approfondir un sujet au-delà du nécessaire avant de passer à l'implémentation",
  ],

  themes: [
    {
      id: "dev-web-react",
      title: "Développement React & Frontend",
      description:
        "React, hooks, composition de composants et TypeScript, utilisés dans mes projets personnels et transférables à mon stage en Vue.js.",
      colorClasses: {
        bg: "bg-blue-500/10",
        text: "text-blue-700 dark:text-blue-400",
        border: "border-blue-500/20",
      },
    },
    {
      id: "fondamentaux-js",
      title: "Fondamentaux JavaScript",
      description:
        "Mécanismes internes de JavaScript : contexte d'exécution, closures, coercition, prototype chain et asynchronicité.",
      colorClasses: {
        bg: "bg-indigo-500/10",
        text: "text-indigo-700 dark:text-indigo-400",
        border: "border-indigo-500/20",
      },
    },
    {
      id: "mobile",
      title: "Développement Mobile",
      description:
        "Application mobile React Native et Expo réalisée en équipe internationale pendant la Summer School à Toronto.",
      colorClasses: {
        bg: "bg-purple-500/10",
        text: "text-purple-700 dark:text-purple-400",
        border: "border-purple-500/20",
      },
    },
    {
      id: "langages-backend",
      title: "Langages & Back-end",
      description:
        "Apprentissage de Go appliqué à une API REST avec PostgreSQL, migrations, middleware et Docker.",
      colorClasses: {
        bg: "bg-green-500/10",
        text: "text-green-700 dark:text-green-400",
        border: "border-green-500/20",
      },
    },
    {
      id: "devops",
      title: "DevOps & Infrastructure",
      description:
        "Pipeline GitLab CI/CD, tests Vitest et intégration dans le workflow existant pendant mon stage.",
      colorClasses: {
        bg: "bg-orange-500/10",
        text: "text-orange-700 dark:text-orange-400",
        border: "border-orange-500/20",
      },
    },
    {
      id: "gestion-projet",
      title: "Gestion de projet & Architecture",
      description:
        "Architecture d'un projet full-stack personnel : monorepo, base de données, services et mise en ligne.",
      colorClasses: {
        bg: "bg-amber-500/10",
        text: "text-amber-700 dark:text-amber-400",
        border: "border-amber-500/20",
      },
    },
    {
      id: "reseaux",
      title: "Réseaux & Infrastructure physique",
      description:
        "Configuration sur matériel Cisco : routeurs, switchs, adressage IP, routage statique et NAT.",
      colorClasses: {
        bg: "bg-sky-500/10",
        text: "text-sky-700 dark:text-sky-400",
        border: "border-sky-500/20",
      },
    },
    {
      id: "iot",
      title: "IoT & Prototypage embarqué",
      description:
        "Programmation d'un Raspberry Pi Pico pour piloter des rubans LED pendant un hackathon matériel.",
      colorClasses: {
        bg: "bg-rose-500/10",
        text: "text-rose-700 dark:text-rose-400",
        border: "border-rose-500/20",
      },
    },
    {
      id: "decouverte-pro",
      title: "Découverte professionnelle",
      description:
        "Visite chez Odoo autour du testing en production et mise en pratique pendant un atelier.",
      colorClasses: {
        bg: "bg-teal-500/10",
        text: "text-teal-700 dark:text-teal-400",
        border: "border-teal-500/20",
      },
    },
  ],

  activities: [
    {
      id: "summer-school-toronto-2025",
      title: "Summer School : Cross-Platform App Development",
      themeId: "mobile",
      type: "formation",
      date: { start: "Été 2025", end: "Été 2025" },
      hours: 10,
      context:
        "Programme de deux semaines au Seneca Polytechnic à Toronto, dans le cadre de la semaine internationale de l'EPHEC. Notre équipe réunissait Simon Fontaine et Guillaume Delferiere côté belge, Mostafa Shahrabadi et Rehatpreet Kaur côté canadien. La première semaine portait sur React Native et Expo ; la deuxième sur la création de Book Worm.",
      learnings:
        "J'ai appris les bases du développement mobile avec React Native et Expo, puis utilisé Supabase pour l'authentification et les données. Le délai court m'a surtout obligé à choisir ce qui devait être terminé en priorité.",
      skills: [
        "React Native",
        "Expo",
        "Supabase",
        "TypeScript",
        "Développement mobile",
        "Collaboration internationale",
        "Gestion des priorités",
      ],
      professionalProjectLink:
        "Cette expérience se rapproche d'un contexte professionnel : livrer une version utilisable dans un délai court, avec une équipe qu'on apprend à connaître en travaillant.",
      reflection:
        "J'ai choisi cette Summer School parce que je n'avais jamais vraiment travaillé sur mobile. Deux semaines, c'est peu pour apprendre un framework et livrer une application, mais c'est justement ce qui rendait l'exercice utile.\n\nReact Native ressemble à React, mais les contraintes changent vite : pas de DOM, des composants natifs, et une autre manière de penser l'interface. Supabase nous a permis d'aller vite pour l'authentification et les données, sans construire tout le back-end.\n\nLa difficulté principale n'a pas été le code. C'était de se mettre d'accord sur les priorités. Dans une équipe avec des niveaux et des habitudes différents, « fini » ne veut pas dire la même chose pour tout le monde.\n\nOn a livré une application fonctionnelle. Elle aurait pu être plus propre sur certains détails, mais l'objectif était de livrer. Depuis, j'essaie de mieux distinguer ce qui doit être terminé de ce qui peut attendre.",
      strengths: ["Autonome et autodidacte", "Forte curiosité technique"],
      weaknesses: ["Tendance à trop approfondir avant d'implémenter"],
      proofs: [
        {
          type: "link",
          label: "GitHub : Book Worm",
          url: "https://github.com/Simon-Fontaine/rnss25-group-7-simon-guillaume-rehat-mostafa",
        },
      ],
    },
    {
      id: "fm-react-v8",
      title: "Complete Intro to React, v8 (Frontend Masters)",
      themeId: "dev-web-react",
      type: "formation",
      date: "Septembre 2025",
      hours: 5,
      context:
        "Formation Frontend Masters suivie avant mes projets React personnels. Le cours couvre les hooks, la composition de composants, la gestion d'état et l'intégration de TypeScript.",
      learnings:
        "J'ai mieux compris les hooks, le context, la composition de composants et le typage des props. Le cours m'a surtout donné une base plus organisée que des lectures dispersées de documentation.",
      skills: [
        "React",
        "JSX",
        "Hooks",
        "TypeScript",
        "State management",
        "Context API",
      ],
      professionalProjectLink:
        "React reste une base importante dans mes projets personnels. Les notions de composants, props et état m'ont aussi aidé à m'adapter à Vue.js pendant mon stage.",
      reflection:
        "J'ai suivi ce cours parce que je voulais comprendre React correctement, pas seulement reproduire des exemples qui fonctionnent.\n\nAvant, j'utilisais useState et useEffect de manière assez mécanique. Le cours m'a aidé à comprendre ce que React fait entre deux rendus et pourquoi la structure des composants compte autant.\n\nLa partie TypeScript m'a aussi été utile. Typer des props, des hooks personnalisés et des contexts m'a donné des habitudes que j'applique encore aujourd'hui.\n\nMême si mon stage chez 3D-Side utilisait Vue.js, cette formation m'a aidé à faire la transition. Les frameworks changent, mais les idées de composants, d'état et de données qui descendent restent proches.",
      strengths: ["Autonome et autodidacte", "Forte curiosité technique"],
      weaknesses: [],
      proofs: [
        {
          type: "certificate",
          label: "Certificat Frontend Masters",
          url: "/certificates/complete-react-v8.pdf",
          darkUrl: "/certificates/complete-react-v8-dark.pdf",
        },
      ],
    },
    {
      id: "fm-javascript-fondamentaux",
      title:
        "Fondamentaux JavaScript : The Hard Parts v2 & Deep JavaScript Foundations v3",
      themeId: "fondamentaux-js",
      type: "formation",
      date: "Avril 2025",
      hours: 10,
      context:
        "Deux formations Frontend Masters suivies pour mieux comprendre JavaScript. JavaScript: The Hard Parts, v2 aborde le contexte d'exécution, les closures et l'asynchronicité. Deep JavaScript Foundations, v3 traite les types, la coercition, le scope et la prototype chain.",
      learnings:
        "J'ai clarifié la call stack, les closures, l'event loop, les microtasks et macrotasks. J'ai aussi revu la coercition, les différences entre == et ===, le scope lexical et certains choix de design du langage.",
      skills: [
        "JavaScript avancé",
        "Closures",
        "Prototype chain",
        "Async/Await",
        "Event loop",
        "Coercition de types",
        "Scope & closures",
      ],
      professionalProjectLink:
        "Ces bases m'aident à déboguer plus vite et à utiliser les frameworks avec plus de recul. Elles sont aussi utiles pour comprendre certains problèmes de sécurité côté client.",
      reflection:
        "Ces deux formations ont changé ma manière de lire du JavaScript. Avant, je savais écrire du code qui fonctionnait. Après, je comprenais mieux pourquoi il fonctionnait, et pourquoi il cassait parfois.\n\nLe déclic principal a été le contexte d'exécution. Les closures sont devenues beaucoup moins mystérieuses : une fonction garde accès à l'environnement dans lequel elle a été créée. L'asynchronicité est devenue plus claire aussi, notamment l'ordre entre promises, microtasks et setTimeout.\n\nDeep JavaScript Foundations m'a surtout fait revoir la coercition. Je n'utilise pas == partout pour autant, mais comprendre les règles rend les choix de style moins automatiques.\n\nCes cours correspondent bien à ma manière d'apprendre : je préfère comprendre le mécanisme avant d'empiler les outils. Ce n'est pas toujours le chemin le plus rapide, mais ça m'aide beaucoup au moment de déboguer.",
      strengths: ["Autonome et autodidacte", "Forte curiosité technique"],
      weaknesses: ["Tendance à trop approfondir avant d'implémenter"],
      proofs: [
        {
          type: "certificate",
          label: "Certificat (JavaScript: The Hard Parts, v2)",
          url: "/certificates/javascript-hard-parts-v2.pdf",
          darkUrl: "/certificates/javascript-hard-parts-v2-dark.pdf",
        },
        {
          type: "certificate",
          label: "Certificat (Deep JavaScript Foundations, v3)",
          url: "/certificates/deep-javascript-v3.pdf",
          darkUrl: "/certificates/deep-javascript-v3-dark.pdf",
        },
      ],
    },
    {
      id: "go-apprentissage",
      title:
        "Découverte de Go : Go Basics, Complete Intro to Go & projet pratique",
      themeId: "langages-backend",
      type: "projet",
      date: "Septembre 2025",
      hours: 9,
      context:
        "Apprentissage de Go via deux formations Frontend Masters, Go Basics puis Complete Intro to Go. J'ai appliqué le cours dans une API REST de gestion d'entraînements sportifs avec PostgreSQL et Docker.",
      learnings:
        "J'ai travaillé les types, structs, interfaces, goroutines et la gestion explicite des erreurs. Le projet m'a aussi fait pratiquer les handlers, middleware, migrations PostgreSQL et l'environnement Docker.",
      skills: [
        "Go",
        "REST API",
        "PostgreSQL",
        "Docker",
        "Middleware",
        "Goroutines",
        "Interfaces",
      ],
      professionalProjectLink:
        "J'ai appris Go pour sortir de l'écosystème JavaScript et élargir ma pratique back-end. C'est aussi un langage pertinent pour l'infrastructure et les systèmes distribués.",
      reflection:
        "J'ai choisi Go parce que je voulais sortir de JavaScript. Node.js reste utile, mais je voulais voir une autre manière de construire un back-end.\n\nLe changement le plus visible a été la gestion des erreurs. Pas d'exceptions : on retourne l'erreur et on la traite. Au début, ça paraît verbeux. Ensuite, ça force à être explicite.\n\nLe projet d'API REST m'a permis d'aller plus loin que les exercices : handlers, middleware, migrations PostgreSQL et Docker. Le dépôt fem-learning-go garde la trace de cet apprentissage.\n\nCe format me correspond bien : suivre un cours, puis l'appliquer tout de suite. L'apprentissage tient mieux quand il y a un projet derrière.",
      strengths: ["Autonome et autodidacte", "Forte curiosité technique"],
      weaknesses: [],
      proofs: [
        {
          type: "certificate",
          label: "Certificat (Complete Intro to Go)",
          url: "/certificates/complete-go.pdf",
          darkUrl: "/certificates/complete-go-dark.pdf",
        },
        {
          type: "certificate",
          label: "Certificat (Go Basics)",
          url: "/certificates/go-basics.pdf",
          darkUrl: "/certificates/go-basics-dark.pdf",
        },
        {
          type: "link",
          label: "GitHub : fem-learning-go",
          url: "https://github.com/Simon-Fontaine/fem-learning-go",
        },
      ],
    },
    {
      id: "stage-3d-side-devops",
      title: "Stage 3D-Side : Pipeline GitLab CI/CD & Tests unitaires Vitest",
      themeId: "devops",
      type: "projet",
      date: { start: "Février 2026", end: "Mai 2026" },
      hours: 10,
      context:
        "Stage de fin d'études chez 3D-Side, quatre jours par semaine de février à mai 2026. En plus du développement front-end avec Vue.js et TypeScript, j'ai travaillé sur une pipeline GitLab CI/CD et sur l'ajout de tests unitaires Vitest pour le code Vue et TypeScript.",
      learnings:
        "J'ai appris à intégrer des tests dans un workflow GitLab existant, à écrire des tests Vitest sur des composants Vue et des fonctions utilitaires, et à intervenir dans une codebase répartie sur plusieurs dépôts.",
      skills: [
        "GitLab CI/CD",
        "Vitest",
        "Tests unitaires",
        "Vue.js",
        "TypeScript",
        "Intégration continue",
      ],
      professionalProjectLink:
        "Cette expérience relie développement, tests et livraison. Elle m'a montré que la qualité ne dépend pas seulement du code écrit, mais aussi de la manière dont il est vérifié avant d'être intégré.",
      reflection:
        "Mon stage chez 3D-Side s'est déroulé sur quatre jours par semaine, le vendredi étant réservé à mon TFE. La partie CI/CD et tests unitaires a été l'une des plus formatrices.\n\nEn arrivant, une pipeline existait déjà pour les tests PHP et le lint, mais pas pour les composants Vue ni pour les fonctions TypeScript. Avant de modifier quoi que ce soit, j'ai dû comprendre l'organisation des dépôts, le code legacy et les conventions déjà en place.\n\nMettre en place Vitest ne consistait pas seulement à ajouter une commande dans GitLab. Il fallait choisir quoi tester, écrire des tests utiles et les intégrer dans un workflow que l'équipe utilisait déjà.\n\nCe stage m'a surtout appris la rigueur : tester avant de proposer, respecter les conventions, accepter les retours et améliorer une première version. C'est différent d'un projet personnel où je décide seul.",
      strengths: [
        "Autonome et autodidacte",
        "À l'aise avec Linux, Docker et les outils DevOps",
      ],
      weaknesses: ["Tendance à trop approfondir avant d'implémenter"],
      proofs: [
        {
          type: "capture",
          label: "Pipeline CI/CD GitLab",
          url: "/proofs/preuve-stage-3dside-pipeline.png",
          description:
            "Capture d'écran du pipeline GitLab CI/CD avec les tests Vitest intégrés",
        },
        {
          type: "capture",
          label: "Rapport de couverture de tests",
          url: "/proofs/preuve-stage-3dside-couverture.png",
          description:
            "Rapport de couverture des tests unitaires Vitest sur les composants Vue",
        },
      ],
    },
    {
      id: "scrimflow-projet-personnel",
      title: "Scrimflow : Plateforme de gestion d'équipe Overwatch 2",
      themeId: "gestion-projet",
      type: "projet",
      date: { start: "Février 2026", end: "En cours" },
      hours: 10,
      context:
        "Projet personnel développé le vendredi en parallèle de mon stage, depuis février 2026. Scrimflow est une plateforme web pour coordonner une équipe Overwatch 2 : scrimmages, disponibilités et communication. Le projet est déployé sur scrimflow.com et continue d'évoluer.",
      learnings:
        "J'ai conçu le schéma de base de données, les flux utilisateurs et l'architecture monorepo avec Turborepo. L'infrastructure utilise PostgreSQL, Redis, MinIO, Caddy et Docker Compose.",
      skills: [
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Turborepo",
        "Architecture monorepo",
        "MinIO",
      ],
      professionalProjectLink:
        "Scrimflow me fait travailler l'architecture, le back-end, le front-end et l'infrastructure sur un même projet. C'est proche de ma manière d'envisager le full-stack : comprendre chaque couche et les liens entre elles.",
      reflection:
        "Scrimflow est parti d'un besoin que je connaissais bien : organiser une équipe Overwatch 2 uniquement avec Discord devient vite lourd. J'ai donc commencé une plateforme dédiée.\n\nLa partie la plus importante a été la modélisation. Avant d'écrire le code, j'ai défini les équipes, joueurs, disponibilités, scrimmages et invitations. Un mauvais schéma de base de données bloque vite le reste du projet.\n\nTechniquement, le projet m'a permis de travailler à une échelle plus large que mes projets scolaires : monorepo Turborepo, PostgreSQL, Redis, MinIO, Caddy et Docker Compose. Le site est en ligne, mais je continue à l'améliorer.\n\nLe piloter seul m'oblige à trancher moi-même. C'est motivant, mais ça montre aussi mes limites : je peux passer trop de temps à concevoir avant de livrer une fonctionnalité.",
      strengths: ["Autonome et autodidacte", "Forte curiosité technique"],
      weaknesses: ["Tendance à trop approfondir avant d'implémenter"],
      proofs: [
        {
          type: "link",
          label: "scrimflow.com",
          url: "https://scrimflow.com",
        },
      ],
    },
    {
      id: "labo-reseau-2023",
      title: "Labo réseau sur matériel physique (EPHEC)",
      themeId: "reseaux",
      type: "formation",
      date: "28 février 2023",
      hours: 3,
      context:
        "Labo pratique organisé à l'EPHEC le 28 février 2023, de 9h à 12h30, dans la salle L118. L'activité était volontaire et se faisait sur du matériel Cisco : routeurs, switchs et ordinateurs. Un défi NAT était proposé aux étudiants ayant déjà vu la matière de deuxième année.",
      learnings:
        "J'ai configuré l'adressage IP, les passerelles, le routage statique et les switchs. Le défi avancé portait sur la NAT et l'interconnexion de plusieurs réseaux avec accès Internet.",
      skills: [
        "Réseaux IP",
        "Routage statique",
        "Configuration Cisco",
        "NAT",
        "Adressage IP",
        "Infrastructure physique",
      ],
      professionalProjectLink:
        "Les réseaux sont une base importante pour la cybersécurité. Ce labo m'a aidé à relier les notions théoriques à ce qui se passe sur du matériel physique.",
      reflection:
        "J'ai participé à ce labo parce que je voulais manipuler autre chose qu'un simulateur. Les réseaux sont plus faciles à comprendre quand une erreur de câble, d'adresse ou de route produit un problème visible immédiatement.\n\nSur du matériel Cisco, on ne peut pas vraiment tricher. Si l'interface n'est pas activée ou si la passerelle est mauvaise, le ping ne passe pas. Ce retour direct rend les erreurs plus utiles.\n\nLa configuration de base semblait simple : deux routeurs, un switch et deux ordinateurs. En pratique, chaque détail compte. Le défi NAT allait plus loin, car il fallait relier plusieurs réseaux entre eux pour obtenir un accès Internet commun.\n\nCette activité m'a confirmé que la sécurité ne peut pas être séparée des bases réseau. Pour protéger un système, il faut d'abord comprendre comment il communique.",
      strengths: ["Forte curiosité technique"],
      weaknesses: [],
      proofs: [
        {
          type: "attestation",
          label: "Confirmation d'inscription",
          url: "/proofs/preuve-labo-reseau.pdf",
          description:
            "Email de confirmation de participation au labo réseau du 28 février 2023",
        },
      ],
    },
    {
      id: "hackathon-kart-iot-2025",
      title: "Hackathon : Kart IoT avec Raspberry Pi Pico et rubans LED",
      themeId: "iot",
      type: "hackathon",
      date: { start: "24 octobre 2025", end: "26 octobre 2025" },
      hours: 10,
      context:
        "Hackathon organisé du vendredi 24 octobre 2025 à 17h30 au dimanche 26 octobre vers 15h00. Le défi était de construire quelque chose à partir de matériel de récupération. Notre équipe a transformé un hoverboard en kart avec des clignotants pilotés par un Raspberry Pi Pico.",
      learnings:
        "J'ai programmé un Raspberry Pi Pico pour piloter des rubans LED, avec des séquences de clignotants et des timings précis. Le format hackathon m'a aussi appris à privilégier ce qui fonctionne.",
      skills: [
        "Raspberry Pi Pico",
        "Systèmes embarqués",
        "Rubans LED",
        "Prototypage matériel",
        "Gestion du temps réel",
        "Hackathon",
      ],
      professionalProjectLink:
        "Ce hackathon m'a confronté à une contrainte différente du web : quand le matériel ne réagit pas, il faut vérifier à la fois le code, le câblage et l'alimentation.",
      reflection:
        "Je n'avais jamais vraiment travaillé avec du matériel embarqué avant ce week-end. Le Raspberry Pi Pico est accessible, mais il impose une autre manière de tester : on charge le code, on regarde le résultat, puis on corrige.\n\nLes animations LED m'ont forcé à faire attention aux timings. Quand quelque chose ne fonctionne pas, il n'y a pas toujours un message d'erreur. Le problème peut venir du code, du câblage ou simplement d'une alimentation mal branchée.\n\nLe format hackathon change aussi la manière de décider. Il n'y a pas le temps de tout rendre propre. Il faut choisir vite, tester directement et accepter une solution imparfaite si elle fonctionne.\n\nÀ la fin, le kart avançait et les clignotants fonctionnaient. Pour une première expérience avec du matériel, c'était déjà un vrai résultat.",
      strengths: ["Forte curiosité technique", "Autonome et autodidacte"],
      weaknesses: [],
      proofs: [
        {
          type: "photo",
          label: "Vidéo du kart en action",
          url: "/proofs/preuve-hackathon.mp4",
          description: "Vidéo du kart avec les clignotants LED fonctionnels",
        },
      ],
    },
    {
      id: "visite-odoo-2025",
      title: "Atelier chez Odoo : Testing en production",
      themeId: "decouverte-pro",
      type: "visite",
      date: "12 novembre 2025",
      hours: 3,
      context:
        "Visite organisée par l'EPHEC chez Odoo à Ottignies-Louvain-la-Neuve, le mercredi 12 novembre 2025. Le programme comprenait une présentation de l'entreprise, une présentation sur leurs pratiques de testing et un atelier de 13h30 à 16h30.",
      learnings:
        "J'ai vu comment Odoo organise ses tests dans un produit composé de nombreux modules et utilisé par beaucoup de clients. L'atelier m'a permis de manipuler leurs outils au lieu de rester sur une présentation théorique.",
      skills: [
        "Testing en production",
        "Pratiques industrielles",
        "Qualité logicielle",
        "ERP",
        "Découverte entreprise",
      ],
      professionalProjectLink:
        "Cette visite a préparé le terrain pour mon stage chez 3D-Side. Elle m'a aidé à voir les tests comme une aide au maintien du produit, pas comme une étape administrative.",
      reflection:
        "J'avais des attentes assez simples pour cette visite : une présentation d'entreprise, quelques slides, puis retour à l'école. L'atelier a rendu l'activité plus intéressante que prévu.\n\nChez Odoo, le testing n'est pas présenté comme un exercice scolaire. Avec un ERP utilisé par de nombreux clients, chaque changement peut avoir des effets importants. Les tests servent donc à modifier le produit avec moins de risque.\n\nLe fait de travailler sur leurs outils pendant l'atelier m'a aidé à comprendre comment les tests s'intègrent dans un workflow quotidien. Ce n'était pas seulement une démonstration.\n\nQuelques mois plus tard, j'ai retrouvé cette idée pendant mon stage chez 3D-Side, quand j'ai ajouté des tests Vitest à une base de code existante. La visite a donné du contexte à ce que j'ai ensuite pratiqué.",
      strengths: ["Forte curiosité technique"],
      weaknesses: [],
      proofs: [
        {
          type: "attestation",
          label: "Email d'invitation EPHEC",
          url: "/proofs/preuve-visite-odoo.pdf",
          description:
            "Email d'invitation à l'atelier Odoo du 12 novembre 2025, envoyé par l'EPHEC",
        },
      ],
    },
  ],
};
