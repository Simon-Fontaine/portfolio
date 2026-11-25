/** Text printed on CVs and letters (the website has its own, in `src/content/ui.ts`). */
import type { Locale } from "@/i18n/config";
import { localize } from "@/i18n/localize";

const labels = {
  sections: {
    experience: { fr: "Expérience professionnelle", en: "Work Experience" },
    projects: { fr: "Projets", en: "Projects" },
    skills: { fr: "Compétences et langues", en: "Skills and Languages" },
    education: { fr: "Formation", en: "Education" },
    languages: { fr: "Langues", en: "Languages" },
  },
  present: { fr: "Aujourd'hui", en: "Present" },
  // French typography puts a space before a colon and a semicolon.
  colon: { fr: " : ", en: ": " },
  listSeparator: { fr: " ; ", en: "; " },
  portfolio: { fr: "Portfolio", en: "Portfolio" },
  letter: {
    subject: { fr: "Objet", en: "Subject" },
    application: { fr: "Candidature", en: "Application" },
    unsolicited: { fr: "Candidature spontanée", en: "Unsolicited application" },
    greeting: { fr: "Madame, Monsieur,", en: "Dear Sir or Madam," },
    closing: { fr: "Bien à vous,", en: "Kind regards," },
  },
};

export const getLabels = (locale: Locale) => localize(labels, locale);
export type Labels = ReturnType<typeof getLabels>;
