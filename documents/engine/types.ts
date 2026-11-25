import type { Profile } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Localize } from "@/i18n/localize";

/** The master profile (or a variant of it) resolved for one language. */
export type LocalizedProfile = Localize<Profile>;

/** Details that never belong in the repository: they live in `.env.local`. */
export interface PrivateDetails {
  phone?: string;
}

/** `{ fr: "…", en: "…" }` with plain strings, as written in the Markdown files. */
export type Strings = Record<Locale, string>;

/** Which entries of a list a variant keeps: all of them, or these ids in order. */
export type Selection = "all" | string[];

export interface SkillSelection {
  id: string;
  /** Replaces the group's items (use it to reorder or trim a group). */
  items?: (string | Strings)[];
}

export type HighlightOverride = string | { id: string; text: Strings };

export interface EntryOverride {
  summary?: Strings;
  /** Master bullet ids (in the order wanted) or new bullets with their own text. */
  highlights?: HighlightOverride[];
}

/** A CV: a selection of the master profile, defined in `src/content/cvs/*.md`. */
export interface CvVariant {
  id: string;
  /** Output file name, without language suffix or extension. */
  name: string;
  languages: Locale[];
  /** Published on the website (written to `public/cv/`, never with a phone number). */
  publish: boolean;
  headline?: Strings;
  experience: Selection;
  projects: Selection;
  education: Selection;
  skills: "all" | SkillSelection[];
  overrides: Record<string, EntryOverride>;
  /** Source file, for error messages. */
  file: string;
}

/** A cover letter, defined in a Markdown file. */
export interface Letter {
  /** Source file base name, e.g. "2026-acme". */
  id: string;
  /** Output file name, without extension. */
  name: string;
  lang: Locale;
  /** Id of the CV variant whose headline is shown in the letter's header. */
  cv?: string;
  /** Leave out for an open application sent to no company in particular. */
  company?: string;
  /** Person or department addressed (optional). */
  contact?: string;
  role?: string;
  /** Extra address lines under the company. */
  address: string[];
  /** ISO date, `YYYY-MM-DD`. Defaults to today. */
  date: string;
  /** Place written before the date. Defaults to the profile's city. */
  place?: string;
  subject?: string;
  greeting?: string;
  closing?: string;
  /** Paragraphs of the body (inline Markdown: **bold**, *italic*, [link](url)). */
  paragraphs: string[];
  file: string;
}
