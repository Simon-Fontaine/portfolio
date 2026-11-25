/**
 * The master profile: everything true about Simon, read from the `profile:`
 * block of `src/content/cvs/generic.md`.
 *
 * That file is the single source of truth. The website shows all of it; each
 * CV variant (`src/content/cvs/*.md`) selects and tweaks part of it. There is
 * no data in this file, only the loader and its validation, so a typo in the
 * Markdown is reported with the field name instead of breaking the build
 * somewhere else.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { locales } from "@/i18n/config";
import { DocError, parseMarkdown, Reader } from "./read";
import type {
  DateValue,
  Education,
  Experience,
  Highlight,
  Period,
  Place,
  Profile,
  Project,
  SkillGroup,
  SocialLink,
  SpokenLanguage,
} from "./types";

export const CVS_DIR = path.join(process.cwd(), "src", "content", "cvs");
/** The variant that holds the profile (and is the published CV). */
export const BASE_FILE = "generic.md";

const DATE = /^\d{4}(-(0[1-9]|1[0-2]))?$/;

/** Read an optional field with `read`; `undefined` when absent. */
function opt<T>(parent: Reader, key: string, read: (field: Reader) => T) {
  const field = parent.field(key);
  return field.isMissing ? undefined : read(field);
}

function url(field: Reader) {
  const value = field.string();
  try {
    if (new URL(value).protocol !== "https:") throw new Error();
  } catch {
    field.fail("must be an absolute https:// URL");
  }
  return value;
}

function date(field: Reader) {
  const value = String(field.value ?? "");
  if (!DATE.test(value)) field.fail('must be a date like "2026" or "2026-02"');
  return value as DateValue;
}

function period(field: Reader): Period {
  field.checkKeys(["start", "end"]);
  const end = opt(field, "end", (f) =>
    f.value === "present" ? "present" : date(f),
  );
  return { start: date(field.field("start")), ...(end ? { end } : {}) };
}

function place(field: Reader): Place {
  field.checkKeys(["city", "country"]);
  return {
    city: field.field("city").string(),
    country: field.field("country").text(),
  };
}

function highlights(field: Reader): Highlight[] {
  return field.array().map((item) => {
    item.checkKeys(["id", ...locales]);
    return { id: item.field("id").fileName(), text: item.strings(["id"]) };
  });
}

function image(field: Reader): NonNullable<Project["image"]> {
  field.checkKeys(["src", "alt"]);
  return { src: field.field("src").string(), alt: field.field("alt").text() };
}

function experience(item: Reader): Experience {
  item.checkKeys([
    "id",
    "role",
    "organization",
    "url",
    "period",
    "location",
    "summary",
    "highlights",
    "tech",
  ]);
  return {
    id: item.field("id").fileName(),
    role: item.field("role").text(),
    organization: item.field("organization").text(),
    url: opt(item, "url", url),
    period: period(item.field("period")),
    location: place(item.field("location")),
    summary: opt(item, "summary", (f) => f.text()),
    highlights: opt(item, "highlights", highlights),
    tech: opt(item, "tech", (f) => f.stringList()),
  };
}

function project(item: Reader): Project {
  item.checkKeys([
    "id",
    "name",
    "context",
    "period",
    "summary",
    "highlights",
    "tech",
    "repository",
    "demo",
    "featured",
    "image",
    "screenshot",
  ]);
  return {
    id: item.field("id").fileName(),
    name: item.field("name").text(),
    context: item.field("context").text(),
    period: opt(item, "period", period),
    summary: item.field("summary").text(),
    highlights: opt(item, "highlights", highlights),
    tech: item.field("tech").stringList(),
    repository: opt(item, "repository", url),
    demo: opt(item, "demo", url),
    featured: opt(item, "featured", (f) => f.boolean()),
    image: opt(item, "image", image),
    screenshot: opt(item, "screenshot", image),
  };
}

function education(item: Reader): Education {
  item.checkKeys([
    "id",
    "degree",
    "school",
    "url",
    "period",
    "location",
    "summary",
  ]);
  return {
    id: item.field("id").fileName(),
    degree: item.field("degree").text(),
    school: item.field("school").string(),
    url: opt(item, "url", url),
    period: period(item.field("period")),
    location: place(item.field("location")),
    summary: opt(item, "summary", (f) => f.text()),
  };
}

function skill(item: Reader): SkillGroup {
  item.checkKeys(["id", "name", "items"]);
  return {
    id: item.field("id").fileName(),
    name: item.field("name").text(),
    items: item
      .field("items")
      .array()
      .map((leaf) => leaf.text()),
  };
}

function spoken(item: Reader): SpokenLanguage {
  item.checkKeys(["name", "level"]);
  return {
    name: item.field("name").text(),
    level: item.field("level").text(),
  };
}

function social(item: Reader): SocialLink {
  item.checkKeys(["id", "label", "url"]);
  const id = item.field("id").string();
  if (id !== "github" && id !== "linkedin")
    return item.field("id").fail("must be github or linkedin");
  return {
    id,
    label: item.field("label").string(),
    url: url(item.field("url")),
  };
}

/** Validate the `profile:` mapping and turn it into a typed `Profile`. */
export function parseProfile(data: unknown, file: string): Profile {
  const root = new Reader(file, data, "profile");
  root.checkKeys([
    "name",
    "headline",
    "summary",
    "about",
    "availability",
    "location",
    "mainStack",
    "email",
    "website",
    "social",
    "experience",
    "projects",
    "education",
    "skills",
    "languages",
  ]);
  const email = root.field("email").string();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    root.field("email").fail("does not look like an email address");
  return {
    name: root.field("name").string(),
    headline: root.field("headline").text(),
    summary: root.field("summary").text(),
    about: root.field("about").text(),
    availability: root.field("availability").text(),
    location: place(root.field("location")),
    mainStack: root.field("mainStack").stringList(),
    email,
    website: url(root.field("website")),
    social: root.field("social").array().map(social),
    experience: root.field("experience").array().map(experience),
    projects: root.field("projects").array().map(project),
    education: root.field("education").array().map(education),
    skills: root.field("skills").array().map(skill),
    languages: root.field("languages").array().map(spoken),
  };
}

function load(): Profile {
  const file = path.join(CVS_DIR, BASE_FILE);
  const { data } = parseMarkdown(readFileSync(file, "utf8"), BASE_FILE);
  const frontmatter = new Reader(BASE_FILE, data, "frontmatter").object();
  if (!frontmatter.profile)
    throw new DocError(BASE_FILE, "missing the `profile:` block");
  return parseProfile(frontmatter.profile, BASE_FILE);
}

export const profile: Profile = load();

/** The name as used in file names: "Simon_Fontaine". */
export const fileStem = profile.name.replace(/\s+/g, "_");
