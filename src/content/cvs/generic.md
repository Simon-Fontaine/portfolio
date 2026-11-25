---
# ─────────────────────────────────────────────────────────────────────────────
#  SINGLE SOURCE OF TRUTH for the portfolio website AND every CV.
# ─────────────────────────────────────────────────────────────────────────────
#
#  • `profile:` below is EVERYTHING true about you. The website shows all of it.
#  • Translated text is written as `fr:` / `en:`; both are required.
#    Text that is the same in every language (names, technologies, URLs) is a
#    plain string.
#  • Dates: "2026" or "2026-02". Omit `end` for a single date, or use "present".
#  • Order in each list = display order on the website.
#  • Bullet points (`highlights`) have a short unique `id`, so that CV variants
#    can pick and reorder them.
#  • Everything above `profile:` describes THIS file as a CV (the general one,
#    published on the website). Other CVs live next to it, as variants of this
#    profile: see cybersecurity.md.
#
#  After editing, run `npm run cv` to regenerate the published CV (restart
#  `npm run dev` to see changes on the website).

name: Simon_Fontaine_CV   # output: Simon_Fontaine_CV_FR.pdf, …_EN.pdf (keep: the website links to it)
languages: [fr, en]
publish: true

# What the general CV shows (ids from `profile:`, in this order).
experience: [3d-side, student-jobs]
projects: [scrimflow, enterprise-network]
education: all
skills: all

profile:
  name: Simon Fontaine
  headline:
    fr: Informaticien junior | Développement logiciel, données et systèmes
    en: Junior IT Specialist | Software Development, Data and Systems
  summary:
    fr: Diplômé de l'EPHEC en juin 2026, je cherche mon premier poste en informatique, de préférence en développement logiciel. J'ai surtout développé des applications web, et je m'intéresse aussi aux données, aux systèmes et aux réseaux.
    en: I graduated from EPHEC in June 2026 and I'm looking for my first IT job, preferably in software development. I have mostly built web applications, and I'm also interested in data, systems and networks.
  about:
    fr: "J'ai grandi entre Ottawa et la Belgique, je travaille donc aussi bien en français qu'en anglais. J'aime les projets qui servent à quelque chose de concret : une application pour organiser des matchs d'entraînement, une sonnette connectée pour des professeurs, un bot pour une communauté Discord."
    en: "I grew up between Ottawa and Belgium, so I work in French as easily as in English. I like projects that serve a concrete purpose: an app to organise practice matches, a connected doorbell for teachers, a bot for a Discord community."
  availability:
    fr: Disponible pour un premier poste
    en: Available for a first role
  location:
    city: Uccle
    country:
      fr: Belgique
      en: Belgium
  mainStack:
    - TypeScript
    - React
    - Next.js
    - Node.js
    - PostgreSQL
    - Docker
  email: simon.fontaine@live.com
  website: https://www.simonfontaine.com
  social:
    - id: github
      label: github.com/Simon-Fontaine
      url: https://github.com/Simon-Fontaine
    - id: linkedin
      label: linkedin.com/in/fontaine-simon
      url: https://www.linkedin.com/in/fontaine-simon/
  experience:
    - id: 3d-side
      role:
        fr: Développeur web stagiaire
        en: Web Developer Intern
      organization: 3D-Side
      url: https://www.3d-side.com/
      period:
        start: 2026-02
        end: 2026-05
      location:
        city: Mont-Saint-Guibert
        country:
          fr: Belgique
          en: Belgium
      summary:
        fr: Participation au développement et à la maintenance de Customize, une plateforme web de planification chirurgicale, au sein d'une équipe travaillant principalement en anglais.
        en: Took part in the development and maintenance of Customize, a web platform for surgical planning, in a team that works mainly in English.
      highlights:
        - id: tests
          fr: Création de tests automatisés pour vérifier le bon fonctionnement de l'application, notamment dans le navigateur, et intégration de leur exécution au processus de validation du code.
          en: Wrote automated tests to check that the application works properly, including in the browser, and added them to the code validation process.
        - id: viewers
          fr: Réorganisation et adaptation des composants de visualisation 2D et 3D pour ajuster leurs commandes aux fonctionnalités disponibles.
          en: Reorganised and adapted the 2D and 3D viewing components so that their controls match the features available.
        - id: devenv
          fr: Adaptation de l'environnement de développement pour faciliter les tests de modules partagés en local, sans devoir publier de nouvelles versions.
          en: Adapted the development environment so that shared modules can be tested locally, without having to publish new versions.
        - id: bugfixes
          fr: Correction de bugs, documentation des vérifications effectuées et prise en compte des retours de l'équipe lors des revues de code.
          en: Fixed bugs, documented the checks I carried out and took the team's feedback into account during code reviews.
      tech:
        - TypeScript
        - Vue.js
        - Vitest
        - Playwright
        - GitLab CI
        - Docker
        - Vite
    - id: student-jobs
      role:
        fr: Jobs étudiants
        en: Student Jobs
      organization:
        fr: Colruyt Group et CHU Helora
        en: Colruyt Group and CHU Helora
      period:
        start: "2020"
        end: "2025"
      location:
        city: Nivelles
        country:
          fr: Belgique
          en: Belgium
  projects:
    - id: scrimflow
      featured: true
      name: Scrimflow
      context:
        fr: Travail de fin d'études
        en: Final-year project
      period:
        start: "2026"
      summary:
        fr: Plateforme web où les équipes d'Overwatch 2 recrutent des joueurs, organisent des matchs d'entraînement et suivent leurs résultats.
        en: A web platform where Overwatch 2 teams recruit players, organise practice matches and track their results.
      highlights:
        - id: data-api
          fr: Conception de la base de données, de l'API et de l'interface web, avec messagerie et notifications en temps réel.
          en: Designed the database, the API and the web interface, with real-time messaging and notifications.
        - id: auth
          fr: "Authentification développée de A à Z : hachage Argon2, vérification de l'e-mail, double authentification (TOTP, passkeys), limitation des tentatives."
          en: "Built the authentication from scratch: Argon2 password hashing, email verification, two-factor authentication (TOTP, passkeys) and rate limiting."
        - id: gemini
          fr: Intégration de Gemini pour lire les résultats depuis des captures d'écran, en arrière-plan, avec vérification et correction par l'utilisateur.
          en: Integrated Gemini to read results from screenshots in the background, which the user then checks and corrects.
        - id: deploy
          fr: Déploiement de tous les services (base de données, cache, stockage, API, application) avec Docker Compose derrière Caddy.
          en: Deployed all the services (database, cache, storage, API, application) with Docker Compose behind Caddy.
      tech:
        - TypeScript
        - React/Next.js
        - Hono/Bun
        - PostgreSQL
        - Drizzle
        - Redis
        - Gemini
        - Docker Compose
        - Caddy
      repository: https://github.com/Simon-Fontaine/tfe-2026
    - id: enterprise-network
      featured: true
      name:
        fr: Réseau d'entreprise
        en: Enterprise Network
      context:
        fr: Projet académique EPHEC en équipe
        en: EPHEC academic team project
      period:
        start: "2026"
      summary:
        fr: Réseau séparé en zones de sécurité, hébergeant une plateforme de cours de langues dont j'ai développé et déployé l'application.
        en: A network split into security zones, hosting a language-course platform whose application I developed and deployed.
      highlights:
        - id: web-app
          fr: "Développement de la plateforme avec Next.js : cours et quiz, espaces étudiant, tuteur et administrateur, et messagerie en temps réel."
          en: "Developed the platform with Next.js: courses and quizzes, student, tutor and admin areas, and real-time messaging."
        - id: docker-deploy
          fr: "Déploiement automatisé avec Gitea : image Docker construite en zone sécurisée, envoyée par SSH à la DMZ, puis vérification de l'application."
          en: "Automated the deployment with Gitea: the Docker image is built in the secure zone, sent over SSH to the DMZ, then checked."
        - id: db-backups
          fr: Sauvegardes automatiques de PostgreSQL toutes les 12 heures depuis la zone sécurisée, avec une semaine d'historique.
          en: Set up automatic PostgreSQL backups every 12 hours from the secure zone, keeping one week of history.
      tech:
        - Linux
        - Docker
        - Next.js
        - PostgreSQL
        - Gitea
        - SSH
      repository: https://github.com/Simon-Fontaine/reseau-d-entreprise
    - id: fisheye
      featured: true
      name: Fisheye
      context:
        fr: Projet d'intégration EPHEC en équipe
        en: EPHEC team integration project
      period:
        start: "2025"
      summary:
        fr: Réalisation en équipe d'une sonnette connectée avec écran, qui prévient les professeurs d'une visite et affiche leur disponibilité.
        en: "Built as a team: a connected doorbell with a display that tells teachers someone is at the door and shows whether they are available."
      highlights:
        - id: server
          fr: Développement de la partie serveur, qui enregistre les données et échange des messages avec les sonnettes et les écrans.
          en: Developed the server side, which stores the data and exchanges messages with the doorbells and displays.
        - id: reconnect
          fr: "Gestion des coupures de connexion : le serveur se reconnecte seul et renvoie les messages qui n'ont pas été reçus."
          en: "Handled connection drops: the server reconnects on its own and resends the messages that were not received."
      tech:
        - TypeScript
        - Node.js
        - Express
        - PostgreSQL
        - Prisma
        - MQTT
      repository: https://github.com/bpatureau/Projet-d-integration-groupe-fisheye
    - id: bookworm
      name: Bookworm
      context:
        fr: Summer School à Seneca Polytechnic, équipe internationale
        en: Seneca Polytechnic Summer School, international team
      period:
        start: 2025-07
      summary:
        fr: "Application mobile pour suivre ses lectures et partager des livres, développée à Toronto. Elle permet de classer ses livres en trois listes : lus, en cours et à lire."
        en: "A mobile app to keep track of your reading and share books, built in Toronto. You can sort your books into three lists: read, reading and to read."
      tech:
        - React Native
        - Expo
        - TypeScript
      repository: https://github.com/Simon-Fontaine/rnss25-group-7-simon-guillaume-rehat-mostafa
      image:
        src: /images/projects/book-worm.png
        alt:
          fr: Logo de l'application Bookworm
          en: Bookworm app logo
    - id: surviecraft
      name: SurvieCraft V3
      context:
        fr: Projet personnel
        en: Personal project
      summary:
        fr: Bot Discord qui gère les demandes d'aide des membres, la modération et les événements d'une communauté.
        en: A Discord bot that handles members' requests for help, moderation and events for a community.
      tech:
        - JavaScript
        - Node.js
        - Discord.js
        - MongoDB/Mongoose
      repository: https://github.com/Simon-Fontaine/surviecraft-v3
      image:
        src: /images/projects/surviecraft.png
        alt:
          fr: Logo du bot Discord SurvieCraft
          en: SurvieCraft Discord bot logo
  education:
    - id: ephec
      degree:
        fr: Bachelier en informatique, orientation Technologies de l'informatique
        en: Bachelor's Degree in Computing, specialising in Information Technology
      school: EPHEC
      url: https://www.ephec.be/formations/haute-ecole/bachelier-en-technologies-de-linformatique
      period:
        start: "2022"
        end: "2026"
      location:
        city: Louvain-la-Neuve
        country:
          fr: Belgique
          en: Belgium
      summary:
        fr: Diplôme obtenu en juin 2026. Formation polyvalente couvrant le développement logiciel, la conception et la gestion de bases de données, l'administration des systèmes et réseaux, la cybersécurité et les aspects juridiques de l'informatique, notamment le RGPD.
        en: Graduated in June 2026. A broad programme covering software development, database design and management, system and network administration, cybersecurity and the legal side of IT, including the GDPR.
    - id: seneca
      degree:
        fr: Summer School en développement mobile React Native
        en: React Native Mobile Development Summer School
      school: Seneca Polytechnic
      url: https://students.senecapolytechnic.ca/global-learning-inbound-flpa-Cross-Platform-App-Development
      period:
        start: 2025-07
      location:
        city: Toronto
        country: Canada
      summary:
        fr: Conception et développement de Bookworm, une application mobile permettant de suivre ses lectures et de partager des livres, avec React Native et Expo, au sein d'une équipe internationale.
        en: Designed and developed Bookworm, a mobile app to keep track of your reading and share books, with React Native and Expo, in an international team.
    - id: secondary
      degree:
        fr: Enseignement secondaire
        en: Secondary Education
      school: Athénée Royal de Waterloo
      url: https://www.ar-waterloo.be/
      period:
        start: 2016-09
        end: 2022-06
      location:
        city: Waterloo
        country:
          fr: Belgique
          en: Belgium
    - id: primary
      degree:
        fr: Enseignement primaire
        en: Primary Education
      school: Terre-des-Jeunes
      url: https://terre-des-jeunes.ecolecatholique.ca/
      period:
        start: 2010-09
        end: 2016-06
      location:
        city: Ottawa
        country: Canada
  skills:
    - id: development
      name:
        fr: Développement
        en: Development
      items:
        - TypeScript
        - JavaScript
        - Python
        - Java
        - Spring Boot
        - React
        - Next.js
        - Vue.js
        - Node.js
        - fr: API REST
          en: REST APIs
    - id: data
      name:
        fr: Données
        en: Data
      items:
        - SQL
        - PostgreSQL
        - MariaDB
        - Redis
        - fr: modélisation de données
          en: data modelling
        - Excel
    - id: systems
      name:
        fr: Systèmes et réseaux
        en: Systems and Networking
      items:
        - Linux
        - TCP/IP
        - VLAN
        - fr: routage
          en: routing
        - DNS
        - Nginx
        - SSH
        - MQTT
    - id: tools
      name:
        fr: Infrastructure et outils
        en: Infrastructure and Tools
      items:
        - Docker
        - Docker Compose
        - Git
        - GitLab CI
        - Vitest
        - Playwright
  languages:
    - name:
        fr: Français
        en: French
      level:
        fr: Langue maternelle
        en: Native
    - name:
        fr: Anglais
        en: English
      level:
        fr: C1, évalué par eLAO (Forem, août 2026)
        en: C1, assessed by eLAO (Forem, August 2026)
---

Notes to myself (everything below the frontmatter is ignored).
