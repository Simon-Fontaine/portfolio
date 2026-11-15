/**
 * Interface text for the website and the CV (labels, headings, legal pages).
 * Career content lives in `profile.ts`.
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
  // Section titles are shared by the website and the CV.
  sections: {
    experience: { fr: "Expérience professionnelle", en: "Work Experience" },
    projects: { fr: "Projets", en: "Projects" },
    skills: { fr: "Compétences techniques", en: "Technical Skills" },
    education: { fr: "Formation", en: "Education" },
    languages: { fr: "Langues", en: "Languages" },
    contact: { fr: "Contact", en: "Contact" },
  },
  // CV-only headings.
  cv: {
    skillsTitle: { fr: "Compétences et langues", en: "Skills and Languages" },
    portfolio: { fr: "Portfolio", en: "Portfolio" },
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
      fr: "Cette page n'existe pas ou n'est plus disponible.",
      en: "This page does not exist or is no longer available.",
    },
    errorTitle: {
      fr: "Impossible d'afficher cette page",
      en: "Unable to display this page",
    },
    errorText: {
      fr: "Une erreur est survenue. Vous pouvez réessayer ou revenir à l'accueil.",
      en: "Something went wrong. You can try again or go back to the home page.",
    },
    retry: { fr: "Réessayer", en: "Try again" },
    home: { fr: "Retour à l'accueil", en: "Back to the home page" },
  },
  privacy: {
    title: { fr: "Confidentialité", en: "Privacy" },
    description: {
      fr: "Comment ce portfolio traite les données et les préférences de navigation.",
      en: "How this portfolio handles data and browsing preferences.",
    },
    intro: {
      fr: "Ce portfolio présente mon parcours et mes projets. Il ne comporte ni compte utilisateur, ni formulaire, ni publicité, ni outil de mesure d'audience, et n'utilise aucun cookie.",
      en: "This portfolio presents my background and projects. It has no user accounts, forms, advertising or audience analytics, and uses no cookies.",
    },
    sections: {
      owner: {
        title: { fr: "Responsable et contact", en: "Owner and contact" },
        text: {
          fr: (email: string) =>
            `Simon Fontaine, domicilié à Uccle (Belgique), est responsable de ce site. Pour toute question sur vos données ou pour exercer vos droits, écrivez à ${email}.`,
          en: (email: string) =>
            `Simon Fontaine, based in Uccle, Belgium, is responsible for this website. For questions about your data or to exercise your rights, write to ${email}.`,
        },
      },
      preferences: {
        title: { fr: "Vos préférences", en: "Your preferences" },
        text: {
          fr: "Si vous choisissez explicitement le thème clair ou sombre, ce choix est enregistré dans le stockage local de votre navigateur (clé « theme ») afin de l'appliquer lors de vos prochaines visites. Il ne contient aucun identifiant et vous pouvez le supprimer à tout moment depuis les réglages de votre navigateur. Sans choix de votre part, le site suit le thème de votre système, et la langue proposée à l'arrivée dépend de celle de votre navigateur.",
          en: "If you explicitly choose the light or dark theme, this choice is saved in your browser's local storage (key “theme”) so that it can be applied on your next visits. It contains no identifier and you can delete it at any time from your browser settings. Without a choice, the site follows your system theme, and the language offered on arrival depends on your browser language.",
        },
      },
      hosting: {
        title: {
          fr: "Hébergement et données techniques",
          en: "Hosting and technical data",
        },
        text: {
          fr: "Le site est hébergé par Vercel. Lors d'une visite, l'hébergeur reçoit les informations nécessaires pour répondre à la requête, notamment l'adresse IP, l'URL demandée et les informations du navigateur. Des journaux techniques peuvent être traités pour fournir et sécuriser le service, selon la documentation de l'hébergeur. Aucun outil d'analyse (Vercel Analytics, Speed Insights ou autre) n'est intégré.",
          en: "The website is hosted by Vercel. When you visit, the host receives the information needed to respond to the request, including your IP address, the requested URL and browser information. Technical logs may be processed to provide and secure the service, as described in the host's documentation. No analytics tool (Vercel Analytics, Speed Insights or other) is integrated.",
        },
      },
      contact: {
        title: {
          fr: "Email et liens externes",
          en: "Email and external links",
        },
        text: {
          fr: "Le lien email ouvre votre application de messagerie : le site n'envoie aucun message lui-même. Les emails reçus servent uniquement à répondre à votre demande et ne sont conservés que le temps nécessaire. GitHub, LinkedIn et les autres sites liés ne reçoivent aucune requête avant que vous n'ouvriez leurs liens ; leurs propres politiques s'appliquent alors.",
          en: "The email link opens your email application: the website itself sends no messages. Emails received are only used to reply to your enquiry and are kept only as long as necessary. GitHub, LinkedIn and other linked sites receive no request before you open their links; their own policies then apply.",
        },
      },
      rights: {
        title: { fr: "Vos droits", en: "Your rights" },
        text: {
          fr: "Selon le traitement concerné, vous pouvez demander l'accès, la rectification ou l'effacement de vos données, la limitation du traitement ou vous y opposer. Vous pouvez également introduire une réclamation auprès de l'Autorité de protection des données. Ce site n'effectue aucun profilage ni aucune décision automatisée.",
          en: "Depending on the processing involved, you may request access to, correction or erasure of your data, restrict processing or object to it. You may also lodge a complaint with the Belgian Data Protection Authority. This website performs no profiling or automated decision-making.",
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
