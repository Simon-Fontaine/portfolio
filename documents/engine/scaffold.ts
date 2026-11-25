/**
 * Starting points for `npm run doc -- new cv <id>` and `new letter <id>`.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileStem, profile } from "@/content/master";
import { EXAMPLES_DIR, letterName } from "./letter";
import type { CvVariant, Selection } from "./types";

/** Ids of new files: lowercase letters, digits and dashes. */
export const isNewId = (id: string | undefined): id is string =>
  !!id && /^[a-z0-9][a-z0-9-]*$/.test(id);

/** A new variant starts with the published CV's selection, which fits on one page. */
export function variantTemplate(id: string, base: CvVariant) {
  const list = (selection: Selection) =>
    selection === "all" ? "all" : `[${selection.join(", ")}]`;
  const ids = (items: { id: string }[]) => items.map((i) => i.id).join(", ");
  const skills =
    base.skills === "all"
      ? "all"
      : `[${base.skills.map((s) => s.id).join(", ")}]`;
  return `---
# A CV variant: a selection of the profile in generic.md. Anything not set here
# comes from there unchanged. See cybersecurity.md for every option.
name: ${fileStem}_CV_${id}   # output: <name>_FR.pdf, <name>_EN.pdf
languages: [${base.languages.join(", ")}]

# Optional: a headline for this CV.
# headline: { fr: "…", en: "…" }

# Ids from generic.md's profile, in the order wanted (or: all).
experience: ${list(base.experience)}   # available: ${ids(profile.experience)}
projects: ${list(base.projects)}   # available: ${ids(profile.projects)}
education: ${list(base.education)}   # available: ${ids(profile.education)}
skills: ${skills}   # available: ${ids(profile.skills)}

# Optional, per entry id:
# overrides:
#   <id>:
#     summary: { fr: "…", en: "…" }
#     highlights: [bullet-id, …]   # or { id, fr, en } to rewrite a bullet
---
`;
}

/** A copy of the example letter, with its own output name and today's date. */
export function letterTemplate(id: string, today = new Date()) {
  return readFileSync(path.join(EXAMPLES_DIR, "letter.example.md"), "utf8")
    .replace(
      /^# Copy this file[^\n]*\n# then run:[^\n]*\n(# Or simply:[^\n]*\n)?/m,
      "",
    )
    .replace(/^name: .*$/m, `name: ${letterName(id)}`)
    .replace(/^date: \S+/m, `date: ${today.toISOString().slice(0, 10)}`);
}
