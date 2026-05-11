import type { CompetencesData } from "@/types/competences";

export const competencesData: CompetencesData = {
  professionalProject: {
    title: "Développeur Full-Stack, spécialisation en cybersécurité",
    description:
      "Après mon bachelier à l'EPHEC, j'envisage un master ou une spécialisation d'un an en cybersécurité. Ce qui m'attire, c'est de comprendre un système dans son ensemble : base de données, API, interface, infrastructure et points faibles possibles.",
  },

  strengths: [
    "J'apprends facilement en autonomie, surtout quand je peux appliquer directement ce que je découvre dans un projet.",
    "Je fais assez vite le lien entre front-end, back-end, base de données et infrastructure.",
    "Je prends le temps de comprendre les mécanismes techniques au lieu de rester à la surface des outils.",
  ],

  weaknesses: [
    "Je dois encore gagner en aisance dans les présentations orales et les échanges formels.",
    "Je peux passer trop de temps à analyser ou modéliser avant de livrer une première version.",
    "Je dois mieux documenter mes choix quand un projet prend de l'ampleur.",
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
        "Programme de deux semaines au Seneca Polytechnic à Toronto, dans le cadre de la semaine internationale de l'EPHEC. La première semaine était consacrée à React Native et Expo. La deuxième semaine, notre équipe a développé Book Worm, une application mobile autour du suivi et du partage de livres.",
      learnings:
        "J'ai travaillé sur toute la logique d'authentification avec Supabase, une partie de l'interface, la découverte de livres et la carte. J'ai aussi mieux compris les contraintes d'une application mobile : navigation, état, données utilisateur et intégration d'API externe.",
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
        "Cette activité m'a surtout appris à livrer une version utilisable avec un délai court. C'est proche d'un vrai contexte projet : il faut choisir, couper certaines idées et garder ce qui apporte le plus à l'utilisateur.",
      reflection:
        "J'ai pris en charge toute l'authentification, avec Supabase pour les comptes et les données liées aux utilisateurs. J'ai aussi travaillé sur les listes de livres, les profils, les notes, le suivi des pages et une bonne partie de la carte.\n\nLa carte est la partie dont je suis le plus satisfait. L'idée était de permettre aux utilisateurs de créer des boîtes à livres communautaires pour partager des livres autour d'eux. C'était plus concret qu'une simple liste de livres.\n\nOn a fini avec une application qui permettait de chercher des livres, de les ajouter à des listes comme « à lire », « lu » ou « favoris », et de suivre sa lecture. Par contre, on a manqué de temps pour rendre la recommandation et la navigation vraiment propres. L'API Google Books fonctionne, mais elle n'était pas toujours agréable pour ce qu'on voulait construire.",
      strengths: [
        "J'ai livré une partie centrale de l'application : auth, données utilisateur, profils et listes.",
        "J'ai réussi à construire une fonctionnalité de carte utile dans un délai court.",
      ],
      weaknesses: [
        "On aurait dû réduire plus tôt le périmètre de la découverte de livres.",
        "La partie recommandation aurait demandé plus de temps et une API mieux adaptée.",
      ],
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
        "Formation Frontend Masters suivie grâce à l'accès étudiant gratuit. Je voulais apprendre React avec un cours structuré, donné par un professionnel, plutôt qu'en enchaînant seulement des tutoriels ou de la documentation.",
      learnings:
        "J'ai revu les bases de React, surtout l'état, les hooks et le fonctionnement général du framework. Le cours m'a aussi donné des habitudes de structure et de design que j'ai réutilisées dans mes projets.",
      skills: [
        "React",
        "JSX",
        "Hooks",
        "TypeScript",
        "State management",
        "Context API",
      ],
      professionalProjectLink:
        "React reste une base importante dans mon parcours full-stack. Comprendre les composants, l'état et les hooks m'aide aussi à passer plus facilement d'un framework front-end à un autre.",
      reflection:
        "J'ai suivi ce cours parce que je voulais apprendre React proprement. À ce moment-là, je savais déjà faire fonctionner des composants, mais je voulais mieux comprendre les bases et les bonnes pratiques.\n\nCe qui m'a le plus aidé, c'est la partie sur l'état, les hooks et useEffect. Avant, j'utilisais parfois ces outils de manière mécanique. Le cours m'a donné une meilleure idée de ce qui se passe entre les rendus.\n\nLe cours reste assez accessible et beginner-friendly. Il ne va pas très loin dans l'architecture ou les patterns complexes, mais il m'a donné une base plus propre pour mes projets suivants.",
      strengths: [
        "J'ai consolidé mes bases React avant de les réutiliser dans mes projets.",
        "J'ai pris de meilleures habitudes sur la structure des composants et l'utilisation des hooks.",
      ],
      weaknesses: [
        "Le cours ne couvre pas vraiment les problèmes d'architecture front-end plus avancés.",
      ],
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
        "Deux formations Frontend Masters suivies parce que je voulais aller plus loin que ce qui était vu à l'école. JavaScript: The Hard Parts, v2 aborde le scope, les closures, les promises et l'asynchronicité. Deep JavaScript Foundations, v3 revient sur les types, la coercition et certains comportements parfois surprenants du langage.",
      learnings:
        "J'ai surtout renforcé ma représentation mentale de JavaScript : scope, closures, promises, event loop et coercition. Certains passages étaient répétitifs, mais cette répétition aide à comprendre comment le langage fonctionne vraiment.",
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
        "Ces bases me permettent d'utiliser JavaScript avec plus de recul. Pour un profil full-stack, comprendre les bizarreries du langage aide à écrire du code plus prévisible et à mieux lire les erreurs.",
      reflection:
        "J'ai suivi ces cours parce que je voulais comprendre JavaScript plus en profondeur. À l'école, on apprend surtout à utiliser le langage. Ici, l'objectif était plutôt de comprendre pourquoi il réagit parfois d'une manière inattendue.\n\nLes parties sur le scope, les closures et les promises m'ont le plus marqué. Je n'ai pas un bug précis à citer, mais ces notions m'aident à lire du code asynchrone avec moins d'approximation.\n\nTout n'était pas passionnant du début à la fin. Certains concepts reviennent plusieurs fois, parfois trop. Mais pour construire une bonne représentation mentale du langage, cette répétition a quand même été utile.",
      strengths: [
        "J'ai pris le temps de comprendre le langage au-delà de son utilisation quotidienne.",
        "J'ai développé plus de recul sur les comportements parfois surprenants de JavaScript.",
      ],
      weaknesses: [
        "Je dois faire attention à ne pas passer trop de temps sur la théorie quand une solution simple suffit.",
      ],
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
        "Apprentissage de Go via deux formations Frontend Masters, Go Basics puis Complete Intro to Go. J'ai appliqué le cours dans une petite API REST pour une fausse application de suivi d'entraînements, avec de l'authentification et plusieurs endpoints CRUD.",
      learnings:
        "J'ai travaillé les types, structs, interfaces et la gestion explicite des erreurs. Le projet m'a aussi fait pratiquer les handlers, middleware, routes protégées, endpoints CRUD, PostgreSQL et Docker.",
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
        "J'ai appris Go par curiosité, pour sortir de l'écosystème JavaScript et essayer un langage compilé, rapide et souvent utilisé côté back-end.",
      reflection:
        "J'ai choisi Go surtout par curiosité. J'en avais entendu parler comme d'un langage rapide et assez simple à déployer, donc je voulais voir ce que ça donnait en dehors de JavaScript.\n\nJe n'ai pas eu énormément de difficulté parce que les cours étaient bien construits. Le changement principal, c'était la manière de penser les erreurs et la structure du code. Go force à être plus explicite que ce que je fais souvent en JavaScript.\n\nLe projet reste un projet d'apprentissage. J'ai construit une petite API avec de l'authentification et des endpoints CRUD pour une fausse application de suivi d'entraînements, mais je n'ai pas encore utilisé Go dans un vrai projet personnel plus large.",
      strengths: [
        "J'ai essayé un langage différent sans attendre qu'il soit imposé par un cours.",
        "J'ai appliqué rapidement les notions du cours dans une API avec auth et base de données.",
      ],
      weaknesses: [
        "Je dois encore utiliser Go dans un projet plus complet pour dépasser le stade de l'exercice guidé.",
      ],
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
        "Stage de fin d'études chez 3D-Side, sur la plateforme Customize liée à l'impression 3D médicale et à la planification de chirurgie. En plus de tâches front-end en Vue.js et TypeScript, j'ai travaillé sur les tests Vitest et leur exécution dans GitLab CI avant la validation des merge requests.",
      learnings:
        "J'ai appris à intégrer des tests dans un workflow GitLab existant, à tester une partie du dossier médical et à travailler dans une codebase séparée en plusieurs dépôts qui dépendent les uns des autres.",
      skills: [
        "GitLab CI/CD",
        "Vitest",
        "Tests unitaires",
        "Vue.js",
        "TypeScript",
        "Intégration continue",
      ],
      professionalProjectLink:
        "Ce stage m'a montré un contexte plus proche du travail réel : du code existant, des contraintes de compatibilité, des merge requests et des tests qui doivent tourner avant l'intégration.",
      reflection:
        "J'ai travaillé sur Customize, une plateforme utilisée dans un contexte médical. Une partie de mon travail consistait à ajouter des tests Vitest, notamment sur le dossier médical, et à faire tourner ces tests dans la pipeline avant la validation des merge requests.\n\nLa difficulté principale venait de l'organisation du projet. Les dépôts étaient séparés mais liés entre eux, et une partie du code legacy restait nécessaire pour garder la compatibilité avec l'ancienne planification.\n\nJ'ai aussi travaillé sur des corrections de bugs et des fonctionnalités liées au viewer 3D prévues pour la release suivante. Le retour de l'équipe était positif, ce qui m'a confirmé que mon travail était utile sans devoir le présenter comme plus gros qu'il ne l'était.",
      strengths: [
        "J'ai réussi à intervenir dans une codebase existante avec plusieurs dépôts liés.",
        "J'ai ajouté des tests dans un workflow de merge request utilisé par l'équipe.",
      ],
      weaknesses: [
        "J'ai dû prendre du temps pour comprendre les liens entre les dépôts et le code legacy.",
        "Je dois encore gagner en vitesse dans des bases de code qui n'ont pas toujours une documentation claire.",
      ],
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
        "Projet personnel développé en parallèle de mon stage, depuis février 2026. Scrimflow est une plateforme pour centraliser la recherche de scrims, d'équipes, de joueurs et de staff sur Overwatch 2, au lieu de dépendre uniquement de serveurs Discord ou de contacts entre managers.",
      learnings:
        "J'ai conçu une base de données assez large, avec beaucoup de tables liées entre elles. Le projet couvre déjà la gestion d'équipes et d'organisations, la recherche de scrims, le suivi des résultats et les profils joueurs/staff.",
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
        "Scrimflow me fait travailler le full-stack dans un cas que je connais bien : produit, base de données, back-end, front-end, déploiement et choix d'architecture.",
      reflection:
        "L'idée vient d'un problème assez simple : pour trouver un scrim, une équipe ou des joueurs, il faut souvent connaître un manager ou poster une annonce dans un serveur Discord. Je voulais créer une plateforme plus centrale.\n\nLe projet contient déjà la recherche de teams, players, staff et scrims, la gestion d'équipes et d'organisations, ainsi que le suivi des résultats de scrim. Certaines parties, comme le SR interne, ne sont pas encore totalement prêtes.\n\nJ'ai choisi une stack assez riche parce que je voulais travailler sur un projet plus proche d'un vrai produit : monorepo, PostgreSQL, Redis, MinIO, Caddy et Docker Compose. Le plus difficile reste le modèle de données. Il y a beaucoup de tables liées, et chaque changement peut avoir des effets ailleurs.\n\nPour l'instant, il n'y a pas encore de vrais utilisateurs. Le site est en ligne, mais je dois encore le faire tester par des équipes.",
      strengths: [
        "J'ai construit un projet complet autour d'un problème que je connais vraiment.",
        "J'ai travaillé une base de données large avec beaucoup de relations entre les entités.",
      ],
      weaknesses: [
        "La stack est riche, donc je dois faire attention à ne pas complexifier sans raison.",
        "Le projet doit encore être testé par de vraies équipes pour valider les choix produit.",
      ],
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
        "Labo pratique organisé à l'EPHEC le 28 février 2023, de 9h à 12h30, dans la salle L118. L'activité était volontaire. Le mail d'inscription annonçait un labo niveau première année avec routeurs, switchs et ordinateurs, ainsi qu'un défi NAT pour les étudiants ayant déjà vu cette matière.",
      learnings:
        "Je ne me souviens plus de tous les détails du labo, donc je garde ici ce que je peux affirmer : l'activité portait sur la configuration de matériel réseau physique, avec routeurs, switchs, ordinateurs, adressage IP et éventuellement NAT selon le niveau.",
      skills: [
        "Réseaux IP",
        "Routage statique",
        "Configuration Cisco",
        "NAT",
        "Adressage IP",
        "Infrastructure physique",
      ],
      professionalProjectLink:
        "Même si ce n'était pas une activité de cybersécurité, elle reste liée à mon projet professionnel : comprendre les réseaux est une base nécessaire avant de parler de sécurité.",
      reflection:
        "Je n'ai plus assez de souvenirs précis pour détailler toute la topologie. Ce que je sais, c'est que le labo permettait de travailler sur du vrai matériel Cisco, avec au minimum des routeurs, des switchs et des ordinateurs à configurer.\n\nLe mail annonçait aussi un défi plus avancé avec de la NAT. Si le temps le permettait, l'idée était de connecter les routeurs du labo de base au routeur configuré par les étudiants avancés pour obtenir un vrai accès Internet.\n\nL'intérêt principal, pour moi, était de sortir du simulateur. Sur du matériel physique, une erreur de câble, d'adresse ou de configuration se voit directement. C'est une manière plus concrète d'apprendre les bases réseau.",
      strengths: [
        "J'ai cherché à pratiquer les réseaux sur du matériel réel, pas seulement en théorie.",
        "J'ai pu relier les notions de routeurs, switchs et adressage à une manipulation physique.",
      ],
      weaknesses: [
        "Je n'ai pas gardé assez de notes sur cette activité, ce qui rend la réflexion moins précise aujourd'hui.",
      ],
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
        "Hackathon organisé du vendredi 24 octobre 2025 à 17h30 au dimanche 26 octobre vers 15h00. Le défi était de construire quelque chose à partir de matériel de récupération. Notre équipe a transformé un hoverboard en kart, avec des boutons et des rubans LED pilotés par un Raspberry Pi Pico.",
      learnings:
        "J'ai travaillé sur le Raspberry Pi Pico, le code Python, les boutons, les LED, l'électronique et la soudure. J'ai aussi codé les animations avec un coéquipier.",
      skills: [
        "Raspberry Pi Pico",
        "Systèmes embarqués",
        "Rubans LED",
        "Prototypage matériel",
        "Gestion du temps réel",
        "Hackathon",
      ],
      professionalProjectLink:
        "Cette activité m'a fait travailler autrement que sur du web. Le résultat dépendait à la fois du code, de l'électronique, du câblage et du temps disponible.",
      reflection:
        "J'ai surtout travaillé sur la partie Raspberry Pi Pico : code Python, boutons, LED, câblage et soudure. Les animations des LED ont été faites avec un coéquipier.\n\nLe problème le plus pénible venait des boutons. On a eu des soucis de debounce assez étranges, donc certains appuis étaient détectés plusieurs fois ou pas comme prévu. C'est le genre de bug qu'on ne règle pas seulement en relisant le code : il faut aussi regarder le montage.\n\nÀ la fin, tout ce qu'on avait prévu fonctionnait. Le kart avançait et les clignotants étaient utilisables. Le câblage était clairement un peu brouillon, mais pour un proof of concept de hackathon, c'était acceptable.",
      strengths: [
        "J'ai travaillé sur toute une partie du prototype : code, boutons, LED, soudure et tests sur le matériel.",
        "J'ai réussi à avancer malgré des problèmes de debounce et un montage imparfait.",
      ],
      weaknesses: [
        "Le câblage aurait mérité d'être plus propre si le projet avait dû durer après le hackathon.",
      ],
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
        "Visite organisée par l'EPHEC chez Odoo à Ottignies-Louvain-la-Neuve, le mercredi 12 novembre 2025. Le programme comprenait une présentation de l'entreprise, une présentation de leurs pratiques de testing et un atelier autour de Runbot, leur outil interne lié aux merge requests.",
      learnings:
        "J'ai vu comment Runbot s'intègre dans leur workflow et j'ai testé un module Python Odoo pendant l'atelier. Ce qui m'a le plus marqué, c'est la durée de leurs suites de tests : plusieurs heures, parfois presque une journée entière.",
      skills: [
        "Testing en production",
        "Pratiques industrielles",
        "Qualité logicielle",
        "ERP",
        "Découverte entreprise",
      ],
      professionalProjectLink:
        "Cette visite m'a donné un aperçu d'une entreprise qui doit tester une très grande base de code. Même si je suis surtout resté observateur, ça m'a montré une autre échelle de travail.",
      reflection:
        "Pendant l'atelier, on a testé un module Python Odoo et regardé comment Runbot intervient dans le workflow des merge requests. Je n'ai pas eu un rôle très actif dans les échanges : j'ai surtout observé et suivi l'exercice.\n\nCe qui m'a surpris, c'est le temps nécessaire pour tester une base de code aussi grande. Une suite entière peut prendre plusieurs heures, parfois presque une journée. Ça donne une autre idée de ce que signifie « tester » dans un produit comme Odoo.\n\nJe ne veux pas forcer un lien avec mon stage ou mes projets. Cette visite m'a surtout donné un exemple concret d'outillage interne dans une entreprise logicielle belge.",
      strengths: [
        "J'ai découvert un workflow de test utilisé dans une entreprise avec une grande base de code.",
        "J'ai pu manipuler un module Odoo au lieu de seulement écouter une présentation.",
      ],
      weaknesses: [
        "Je suis surtout resté observateur ; j'aurais pu poser plus de questions pendant l'atelier.",
      ],
      proofs: [
        {
          type: "attestation",
          label: "Email d'invitation EPHEC",
          url: "/proofs/preuve-visite-odoo.pdf",
          description:
            "Email d'invitation à l'atelier Odoo du 12 novembre 2025, envoyé par l'EPHEC",
        },
        {
          type: "link",
          label: "GitHub : odoo_demo",
          url: "https://github.com/Simon-Fontaine/odoo_demo",
        },
      ],
    },
  ],
};
