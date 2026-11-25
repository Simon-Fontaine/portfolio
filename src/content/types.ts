import type { Localized, Text } from "@/i18n/localize";

/** `"2026"` (year only) or `"2026-02"` (year and month). */
export type DateValue = `${number}` | `${number}-${number}`;

/**
 * A date range. Omit `end` for a single date (e.g. a one-month course),
 * or use `"present"` for something ongoing.
 */
export interface Period {
  start: DateValue;
  end?: DateValue | "present";
}

export interface Place {
  city: string;
  country: Text;
}

/** A bullet point. The `id` is unique within its entry (CV variants use it). */
export interface Highlight {
  id: string;
  text: Text;
}

export interface Experience {
  id: string;
  role: Text;
  organization: Text;
  url?: string;
  period: Period;
  location: Place;
  summary?: Text;
  highlights?: Highlight[];
  tech?: string[];
}

export interface Project {
  id: string;
  name: Text;
  /** Short context line, e.g. "Final-year project" or "Personal project". */
  context: Text;
  period?: Period;
  summary: Text;
  highlights?: Highlight[];
  tech: string[];
  /** Source code repository. */
  repository?: string;
  /** Live demo or product page. */
  demo?: string;
  /**
   * `true` = full write-up on the website (summary and contribution side by
   * side). Other projects are shown as compact entries below.
   */
  featured?: boolean;
  /** Logo or icon, path relative to `public/` (compact entries, website only). */
  image?: { src: string; alt: Text };
  /**
   * Screenshot of a featured project (website only). Projects without one
   * are presented as text. Recommended: 1600×1000 PNG or WebP in
   * `public/images/projects/`.
   */
  screenshot?: { src: string; alt: Text };
}

export interface Education {
  id: string;
  degree: Text;
  school: string;
  url?: string;
  period: Period;
  location: Place;
  summary?: Text;
}

export interface SkillGroup {
  id: string;
  name: Text;
  items: Text[];
}

export interface SpokenLanguage {
  name: Text;
  level: Text;
}

export interface SocialLink {
  id: "github" | "linkedin";
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  /** Job title shown under your name on the website and the CV. */
  headline: Text;
  /** Short introduction (website hero and search engine description). */
  summary: Text;
  /**
   * A short personal note in the first person (website only). This is where
   * the site sounds like you: keep it honest and specific.
   */
  about: Text;
  /** One-line availability status (top of the website and social preview image). */
  availability: Text;
  location: Place;
  /** A few key technologies, shown on the social preview image. */
  mainStack: string[];
  email: string;
  website: string;
  social: SocialLink[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: SkillGroup[];
  languages: SpokenLanguage[];
}

export type { Localized, Text };
