/**
 * Interface text for the website (labels, headings, legal pages). The CV and
 * cover-letter labels live in `documents/render/labels.ts`.
 * Career content lives in `cvs/generic.md`.
 *
 * Same convention: `{ fr: "…", en: "…" }`. Values can be functions when
 * they need variables (e.g. a year or a project name).
 */
import type { Localized } from "@/i18n/localize";

type Leaf = Localized<string> | Localized<(...args: never[]) => string>;
type UiTree = { [key: string]: Leaf | UiTree };

export const ui = {
  meta: {
    siteName: { fr: "Portfolio", en: "Portfolio" },
  },
  nav: {
    label: { fr: "Navigation principale", en: "Main navigation" },
    skip: { fr: "Aller au contenu principal", en: "Skip to main content" },
    home: { fr: "Accueil", en: "Home" },
    open: { fr: "Ouvrir le menu", en: "Open menu" },
    close: { fr: "Fermer le menu", en: "Close menu" },
    menu: { fr: "Menu", en: "Menu" },
    language: {
      fr: "Read this site in English",
      en: "Lire ce site en français",
    },
  },
  // Section titles of the website.
  sections: {
    experience: { fr: "Expérience professionnelle", en: "Work Experience" },
    projects: { fr: "Projets", en: "Projects" },
    skills: { fr: "Compétences et langues", en: "Skills and Languages" },
    education: { fr: "Formation", en: "Education" },
    languages: { fr: "Langues", en: "Languages" },
    contact: { fr: "Contact", en: "Contact" },
  },
  // Short navigation labels (website header).
  navItems: {
    top: { fr: "Présentation", en: "Introduction" },
    experience: { fr: "Expérience", en: "Experience" },
    projects: { fr: "Projets", en: "Projects" },
    skills: { fr: "Compétences", en: "Skills" },
    education: { fr: "Formation", en: "Education" },
    contact: { fr: "Contact", en: "Contact" },
  },
  intros: {
    skills: {
      fr: "Les technologies que j'ai utilisées en stage, en cours ou dans mes projets.",
      en: "The technologies I have used during my internship, in class or in my own projects.",
    },
  },
  // Read by screen readers next to the icons under the introduction.
  hero: {
    basedIn: { fr: "Lieu", en: "Location" },
    languages: { fr: "Langues", en: "Languages" },
    graduated: { fr: "Diplôme", en: "Degree" },
  },
  actions: {
    downloadCv: { fr: "Télécharger mon CV", en: "Download my CV" },
    contact: { fr: "M'écrire", en: "Email me" },
    copyEmail: { fr: "Copier l'adresse", en: "Copy address" },
    copied: { fr: "Copié", en: "Copied" },
    sourceCode: { fr: "Code source", en: "Source code" },
    demo: { fr: "Voir le projet", en: "View project" },
    backToTop: { fr: "Retour en haut", en: "Back to top" },
  },
  labels: {
    present: { fr: "Aujourd'hui", en: "Present" },
    newTab: { fr: "(nouvel onglet)", en: "(opens in a new tab)" },
    technologies: { fr: "Technologies", en: "Technologies" },
    context: { fr: "Cadre", en: "Context" },
    date: { fr: "Date", en: "Date" },
    contribution: { fr: "Ma contribution", en: "My contribution" },
    moreProjects: { fr: "Autres projets", en: "More projects" },
    onGithub: {
      fr: (project: string) => `Code source de ${project} sur GitHub`,
      en: (project: string) => `${project} source code on GitHub`,
    },
  },
  contact: {
    text: {
      fr: "Je cherche un premier poste en développement logiciel ou en informatique. Le plus simple est de m'écrire par email.",
      en: "I'm looking for a first role in software development or IT. Email is the easiest way to reach me.",
    },
    linkedin: { fr: "Je suis aussi sur", en: "I'm also on" },
  },
  theme: {
    toggle: { fr: "Changer de thème", en: "Toggle theme" },
  },
  footer: {
    copyright: {
      fr: (year: number, name: string) => `© ${year} ${name}`,
      en: (year: number, name: string) => `© ${year} ${name}`,
    },
    privacy: { fr: "Confidentialité", en: "Privacy" },
    links: { fr: "Liens du pied de page", en: "Footer links" },
  },
  errors: {
    notFoundTitle: { fr: "Page introuvable", en: "Page not found" },
    notFoundText: {
      fr: "Cette page n'existe pas, ou elle n'existe plus.",
      en: "This page doesn't exist, or no longer does.",
    },
    errorTitle: {
      fr: "Impossible d'afficher cette page",
      en: "Unable to display this page",
    },
    errorText: {
      fr: "Quelque chose s'est mal passé. Vous pouvez réessayer ou revenir à l'accueil.",
      en: "Something went wrong. You can try again or go back to the home page.",
    },
    retry: { fr: "Réessayer", en: "Try again" },
    home: { fr: "Retour à l'accueil", en: "Back to the home page" },
  },
  privacy: {
    title: { fr: "Confidentialité", en: "Privacy" },
    description: {
      fr: "Ce que ce site enregistre, et surtout ce qu'il n'enregistre pas.",
      en: "What this site stores, and above all what it doesn't.",
    },
    intro: {
      fr: "Ce site présente mon parcours et mes projets. Il n'a ni compte utilisateur, ni formulaire, ni publicité, ni mesure d'audience, et il n'utilise aucun cookie.",
      en: "This site presents my background and my projects. It has no user accounts, no forms, no advertising and no audience measurement, and it uses no cookies.",
    },
    sections: {
      owner: {
        title: { fr: "Responsable et contact", en: "Owner and contact" },
        text: {
          fr: (email: string) =>
            `Ce site est celui de Simon Fontaine, à Uccle (Belgique). Pour toute question sur vos données ou pour exercer vos droits, écrivez-moi à ${email}.`,
          en: (email: string) =>
            `This is the website of Simon Fontaine, based in Uccle, Belgium. For any question about your data or to exercise your rights, write to me at ${email}.`,
        },
      },
      preferences: {
        title: { fr: "Vos préférences", en: "Your preferences" },
        text: {
          fr: "Si vous choisissez le thème clair ou sombre, ce choix est enregistré dans votre navigateur (stockage local, clé « theme ») pour être appliqué à votre prochaine visite. Il ne contient aucun identifiant et vous pouvez le supprimer depuis les réglages de votre navigateur. Sans choix de votre part, le site suit le thème de votre système. La langue proposée à l'arrivée dépend de celle de votre navigateur.",
          en: "If you choose the light or dark theme, that choice is saved in your browser (local storage, key “theme”) and applied on your next visit. It contains no identifier and you can delete it from your browser settings. If you don't choose, the site follows your system theme. The language offered when you arrive depends on your browser's language.",
        },
      },
      hosting: {
        title: {
          fr: "Hébergement et données techniques",
          en: "Hosting and technical data",
        },
        text: {
          fr: "Le site est hébergé par Vercel. À chaque visite, l'hébergeur reçoit ce qu'il lui faut pour afficher la page : votre adresse IP, la page demandée et des informations sur votre navigateur. Il peut conserver des journaux techniques pour faire fonctionner et sécuriser le service. Je n'utilise aucun outil d'analyse (ni Vercel Analytics, ni Speed Insights, ni autre).",
          en: "The site is hosted by Vercel. On each visit, the host receives what it needs to display the page: your IP address, the page requested and information about your browser. It may keep technical logs to run and secure the service. I use no analytics tool (no Vercel Analytics, no Speed Insights, nothing else).",
        },
      },
      contact: {
        title: {
          fr: "Email et liens externes",
          en: "Email and external links",
        },
        text: {
          fr: "Le lien email ouvre votre application de messagerie : le site n'envoie rien lui-même. Je n'utilise les emails reçus que pour vous répondre, et je ne les garde pas plus longtemps que nécessaire. GitHub, LinkedIn et les autres sites liés ne reçoivent rien tant que vous n'ouvrez pas leurs liens. Ensuite, ce sont leurs propres règles qui s'appliquent.",
          en: "The email link opens your own email application: the site sends nothing itself. I only use the emails I receive to reply to you, and I don't keep them longer than necessary. GitHub, LinkedIn and the other linked sites receive nothing until you open their links. After that, their own policies apply.",
        },
      },
      rights: {
        title: { fr: "Vos droits", en: "Your rights" },
        text: {
          fr: "Vous pouvez me demander d'accéder à vos données, de les corriger ou de les effacer, ou vous opposer à leur utilisation. Vous pouvez aussi introduire une réclamation auprès de l'Autorité de protection des données. Ce site ne fait ni profilage ni décision automatisée.",
          en: "You can ask me for access to your data, ask me to correct or delete it, or object to its use. You can also lodge a complaint with the Belgian Data Protection Authority. This site does no profiling and makes no automated decisions.",
        },
      },
    },
    resourcesTitle: { fr: "Pour en savoir plus", en: "Further information" },
    authority: {
      fr: "Autorité de protection des données",
      en: "Belgian Data Protection Authority",
    },
    host: {
      fr: "Politique de confidentialité de Vercel",
      en: "Vercel privacy policy",
    },
  },
} satisfies UiTree;
