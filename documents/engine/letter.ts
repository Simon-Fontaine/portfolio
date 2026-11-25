/**
 * Cover letters: Markdown files with frontmatter, in `private/letters/`
 * (git-ignored). See `documents/examples/letter.example.md`.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileStem } from "@/content/master";
import { DocError, parseMarkdown, Reader } from "@/content/read";
import type { Letter } from "./types";

export const LETTERS_DIR = path.join(process.cwd(), "private", "letters");
export const EXAMPLES_DIR = path.join(process.cwd(), "documents", "examples");

const isoToday = () => new Date().toISOString().slice(0, 10);

/**
 * Naming convention: the file is `YYYY-MM-<company>[-<role>].md` and the PDF
 * is `Simon_Fontaine_LM_<Company>[_<Role>].pdf` ("LM": lettre de motivation).
 * `2026-11-acme-data-analyst` → `Simon_Fontaine_LM_Acme_Data_Analyst`.
 * Set `name:` in the file to spell it differently (e.g. `…_LM_CM_Java`).
 */
export function letterName(id: string) {
  const words = id
    .replace(/^\d{4}(-\d{2})?-/, "")
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1));
  return [fileStem, "LM", ...words].join("_");
}

/** `acme` → `2026-11-acme` (ids that already start with a date are kept). */
export function datedLetterId(id: string, today = new Date()) {
  return /^\d{4}-\d{2}-/.test(id)
    ? id
    : `${today.toISOString().slice(0, 7)}-${id}`;
}

export function parseLetter(source: string, file: string): Letter {
  const id = path.basename(file, ".md");
  const { data, body } = parseMarkdown(source, file);
  const root = new Reader(file, data, "frontmatter");
  root.checkKeys([
    "name",
    "lang",
    "cv",
    "company",
    "contact",
    "role",
    "address",
    "date",
    "place",
    "subject",
    "greeting",
    "closing",
  ]);
  const optional = (key: string) => {
    const field = root.field(key);
    return field.isMissing ? undefined : field.string();
  };

  const date = root.field("date");
  let isoDate = isoToday();
  if (!date.isMissing) {
    // YAML may hand back a Date for unquoted 2026-11-24.
    const raw =
      date.value instanceof Date
        ? date.value.toISOString().slice(0, 10)
        : date.string();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw) || Number.isNaN(Date.parse(raw)))
      date.fail("must be a date written YYYY-MM-DD");
    isoDate = raw;
  }

  const name = root.field("name");
  const address = root.field("address");
  const paragraphs = body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
  if (paragraphs.length === 0)
    throw new DocError(file, "the letter has no text below the frontmatter");

  return {
    id,
    name: name.isMissing ? letterName(id) : name.fileName(),
    lang: root.field("lang").locale(),
    cv: optional("cv"),
    company: optional("company"),
    contact: optional("contact"),
    role: optional("role"),
    address: address.isMissing ? [] : address.stringList(),
    date: isoDate,
    place: optional("place"),
    subject: optional("subject"),
    greeting: optional("greeting"),
    closing: optional("closing"),
    paragraphs,
    file,
  };
}

export function loadLetterFile(file: string) {
  return parseLetter(readFileSync(file, "utf8"), path.basename(file));
}

/** All letters in `private/letters/` (none if the folder doesn't exist). */
export function loadLetters(dir = LETTERS_DIR): Letter[] {
  if (!existsSync(dir)) return [];
  const letters = readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => loadLetterFile(path.join(dir, file)));
  const seen = new Map<string, string>();
  for (const letter of letters) {
    const other = seen.get(letter.name);
    if (other)
      throw new DocError(
        letter.file,
        `name \`${letter.name}\` is already used by ${other}: one would overwrite the other`,
      );
    seen.set(letter.name, letter.file);
  }
  return letters;
}

/** Resolve `2026-acme`, `2026-acme.md` or a path to a letter file. */
export function resolveLetterPath(key: string) {
  const candidates = [
    key,
    path.join(LETTERS_DIR, key),
    path.join(LETTERS_DIR, `${key}.md`),
    path.join(EXAMPLES_DIR, key),
    path.join(EXAMPLES_DIR, `${key}.md`),
  ];
  return candidates.find(
    (candidate) => existsSync(candidate) && candidate.endsWith(".md"),
  );
}
