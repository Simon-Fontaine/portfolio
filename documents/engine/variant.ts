/**
 * CV variants: load `src/content/cvs/*.md` and apply one to the master profile.
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { BASE_FILE, CVS_DIR, fileStem } from "@/content/master";
import { DocError, parseMarkdown, Reader } from "@/content/read";
import type {
  Education,
  Experience,
  Highlight,
  Profile,
  Project,
  SkillGroup,
} from "@/content/types";
import { locales } from "@/i18n/config";
import type {
  CvVariant,
  EntryOverride,
  HighlightOverride,
  Selection,
  SkillSelection,
} from "./types";

function readSelection(field: Reader): Selection {
  if (field.isMissing || field.value === "all") return "all";
  const ids = field.stringList();
  if (new Set(ids).size !== ids.length) field.fail("lists the same id twice");
  return ids;
}

function readOverride(entry: Reader): EntryOverride {
  entry.checkKeys(["summary", "highlights"]);
  const override: EntryOverride = {};
  const summary = entry.field("summary");
  if (!summary.isMissing) override.summary = summary.strings();
  const highlights = entry.field("highlights");
  if (!highlights.isMissing)
    override.highlights = highlights.array().map((item): HighlightOverride => {
      if (typeof item.value === "string") return item.string();
      item.checkKeys(["id", ...locales]);
      const id = item.field("id").string();
      return { id, text: item.strings(["id"]) };
    });
  return override;
}

export function parseVariant(source: string, file: string): CvVariant {
  const basename = path.basename(file, ".md");
  const root = new Reader(
    file,
    parseMarkdown(source, file).data,
    "frontmatter",
  );
  root.checkKeys([
    "id",
    "name",
    "languages",
    "publish",
    "headline",
    "experience",
    "projects",
    "education",
    "skills",
    "overrides",
    "profile", // only in the base file: validated by src/content/master.ts
  ]);
  if (file !== BASE_FILE && !root.field("profile").isMissing)
    root.field("profile").fail(`only ${BASE_FILE} holds the profile`);

  const id = root.field("id");
  if (!id.isMissing && id.string() !== basename)
    id.fail(`must match the file name (\`${basename}\`)`);

  const name = root.field("name");
  const languages = root.field("languages");
  const publish = root.field("publish");
  const headline = root.field("headline");
  const skills = root.field("skills");
  const overrides = root.field("overrides");

  const variant: CvVariant = {
    id: basename,
    name: name.isMissing ? `${fileStem}_CV_${basename}` : name.fileName(),
    languages: languages.isMissing
      ? [...locales]
      : languages.array().map((l) => l.locale()),
    publish: publish.isMissing ? false : publish.boolean(),
    headline: headline.isMissing ? undefined : headline.strings(),
    experience: readSelection(root.field("experience")),
    projects: readSelection(root.field("projects")),
    education: readSelection(root.field("education")),
    skills:
      skills.isMissing || skills.value === "all"
        ? "all"
        : skills.array().map((item): SkillSelection => {
            if (typeof item.value === "string") return { id: item.string() };
            item.checkKeys(["id", "items"]);
            const items = item.field("items");
            return {
              id: item.field("id").string(),
              items: items.isMissing
                ? undefined
                : items
                    .array()
                    .map((leaf) =>
                      typeof leaf.value === "string"
                        ? leaf.string()
                        : leaf.strings(),
                    ),
            };
          }),
    overrides: overrides.isMissing
      ? {}
      : Object.fromEntries(
          Object.keys(overrides.object()).map((key) => [
            key,
            readOverride(overrides.field(key)),
          ]),
        ),
    file,
  };
  if (variant.languages.length === 0)
    languages.fail("needs at least one language");
  return variant;
}

/** Every variant in `src/content/cvs/`, checked for duplicate names. */
export function loadVariants(dir = CVS_DIR): CvVariant[] {
  const variants = readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) =>
      parseVariant(readFileSync(path.join(dir, file), "utf8"), file),
    );
  const seen = new Map<string, string>();
  for (const variant of variants) {
    const other = seen.get(variant.name);
    if (other)
      throw new DocError(
        variant.file,
        `name \`${variant.name}\` is already used by ${other}: one would overwrite the other`,
      );
    seen.set(variant.name, variant.file);
  }
  const published = variants.filter((variant) => variant.publish);
  if (published.length > 1)
    throw new DocError(
      published[1].file,
      `only one variant can be published (${published[0].file} already is)`,
    );
  return variants;
}

export function findVariant(variants: CvVariant[], key: string) {
  return variants.find((v) => v.id === key || v.name === key);
}

// ── Applying a variant to the master profile ───────────────────────────────
function pick<T extends { id: string }>(
  items: T[],
  selection: Selection,
  kind: string,
  variant: CvVariant,
): T[] {
  if (selection === "all") return items;
  return selection.map((id) => {
    const item = items.find((candidate) => candidate.id === id);
    if (!item)
      throw new DocError(
        variant.file,
        `${kind}: unknown id \`${id}\` (known: ${items.map((i) => i.id).join(", ")})`,
      );
    return item;
  });
}

function applyOverride<T extends Experience | Project | Education>(
  entry: T,
  override: EntryOverride | undefined,
  variant: CvVariant,
): T {
  if (!override) return entry;
  const next = { ...entry } as T & {
    summary?: unknown;
    highlights?: Highlight[];
  };
  if (override.summary) next.summary = override.summary;
  if (override.highlights) {
    const master = ("highlights" in entry ? entry.highlights : undefined) ?? [];
    next.highlights = override.highlights.map((item) => {
      if (typeof item !== "string") return { id: item.id, text: item.text };
      const found = master.find((h) => h.id === item);
      if (!found)
        throw new DocError(
          variant.file,
          `overrides.${entry.id}.highlights: unknown bullet \`${item}\` (known: ${master.map((h) => h.id).join(", ") || "none"})`,
        );
      return found;
    });
  }
  return next;
}

export function applyVariant(master: Profile, variant: CvVariant): Profile {
  const experience = pick(
    master.experience,
    variant.experience,
    "experience",
    variant,
  );
  const projects = pick(master.projects, variant.projects, "projects", variant);
  const education = pick(
    master.education,
    variant.education,
    "education",
    variant,
  );

  const selected = new Set(
    [...experience, ...projects, ...education].map((entry) => entry.id),
  );
  for (const id of Object.keys(variant.overrides))
    if (!selected.has(id))
      throw new DocError(
        variant.file,
        `overrides.${id}: no selected experience, project or education entry has this id`,
      );

  const skills: SkillGroup[] =
    variant.skills === "all"
      ? master.skills
      : variant.skills.map((choice) => {
          const group = master.skills.find((g) => g.id === choice.id);
          if (!group)
            throw new DocError(
              variant.file,
              `skills: unknown id \`${choice.id}\` (known: ${master.skills.map((g) => g.id).join(", ")})`,
            );
          return choice.items ? { ...group, items: choice.items } : group;
        });

  const withOverrides = <T extends Experience | Project | Education>(
    items: T[],
  ) =>
    items.map((item) =>
      applyOverride(item, variant.overrides[item.id], variant),
    );

  return {
    ...master,
    headline: variant.headline ?? master.headline,
    experience: withOverrides(experience),
    projects: withOverrides(projects),
    education: withOverrides(education),
    skills,
  };
}
