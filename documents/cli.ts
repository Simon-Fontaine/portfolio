/**
 * Document generator: CV variants and cover letters → PDF.
 *
 *   npm run cv                          the published CV → public/cv/ (runs before dev and build)
 *   npm run doc -- list                 CV variants and letters found
 *   npm run doc -- all                  every CV variant and every letter → out/
 *   npm run doc -- cv [id] [--lang fr]  one variant (default: all of them) → out/cvs/
 *   npm run doc -- letter <id>          one letter from private/letters/ → out/letters/
 *   npm run doc -- new cv <id>          start a CV variant in src/content/cvs/
 *   npm run doc -- new letter <id>      start a letter in private/letters/
 *
 * The phone number is read from CV_PHONE in `.env.local`. It is added to
 * everything written to `out/`, and never to the published CV in `public/`.
 *
 * Output names come from the `name` field of each file, so generating again
 * overwrites the previous version.
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { CVS_DIR } from "@/content/master";
import { DocError } from "@/content/read";
import { isLocale, type Locale, locales } from "@/i18n/config";
import { CV_PUBLIC_DIR } from "@/lib/cv";
import {
  datedLetterId,
  LETTERS_DIR,
  loadLetterFile,
  loadLetters,
  resolveLetterPath,
} from "./engine/letter";
import { isNewId, letterTemplate, variantTemplate } from "./engine/scaffold";
import type { CvVariant, Letter, PrivateDetails } from "./engine/types";
import { findVariant, loadVariants } from "./engine/variant";
import { countPdfPages, renderCv, renderLetter } from "./index";

const root = process.cwd();
const rel = (file: string) => path.relative(root, file);
const OUT_DIR = path.join(root, "out");

function readDetails(): PrivateDetails {
  const env = path.join(root, ".env.local");
  if (existsSync(env)) process.loadEnvFile(env);
  const phone = process.env.CV_PHONE?.trim() || undefined;
  if (!phone)
    console.warn(
      "  (no CV_PHONE in .env.local: generating without a phone number)",
    );
  return { phone };
}

async function save(file: string, pdf: Buffer, label: string, started: number) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, pdf);
  const pages = countPdfPages(pdf);
  console.log(
    `✓ ${rel(file)} (${pages} page${pages > 1 ? "s" : ""}, ${Math.round(pdf.length / 1024)} KB, ${Math.round(performance.now() - started)} ms)`,
  );
  if (pages > 1) console.warn(`  ⚠ ${label} no longer fits on one page.`);
}

/** Writes a CV to `dir`. Only `out/` gets private details; `public/` never does. */
async function buildCv(
  variant: CvVariant,
  locale: Locale,
  dir: string,
  details: PrivateDetails,
) {
  const started = performance.now();
  const pdf = await renderCv(variant, locale, details);
  await save(
    path.join(dir, `${variant.name}_${locale.toUpperCase()}.pdf`),
    pdf,
    `The ${locale.toUpperCase()} CV "${variant.id}" (select fewer entries or shorten some text)`,
    started,
  );
}

async function buildLetter(
  letter: Letter,
  variants: CvVariant[],
  details: PrivateDetails,
) {
  const started = performance.now();
  const pdf = await renderLetter(letter, variants, details);
  await save(
    path.join(OUT_DIR, "letters", `${letter.name}.pdf`),
    pdf,
    `The letter "${letter.id}"`,
    started,
  );
}

// ── Scaffolding ─────────────────────────────────────────────────────────────
function checkNewId(id: string | undefined, kind: "cv" | "letter") {
  if (!isNewId(id))
    throw new Error(
      `Give the new ${kind} an id in lowercase letters, digits and dashes, e.g. npm run doc -- new ${kind} ${kind === "cv" ? "data-analyst" : "acme"}`,
    );
  return id;
}

async function createFile(file: string, content: string, next: string) {
  if (existsSync(file)) throw new Error(`${rel(file)} already exists.`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
  console.log(`✓ created ${rel(file)}\n  Edit it, then run: ${next}`);
}

function usage() {
  console.log(
    [
      "Usage:",
      "  npm run cv                           published CV → public/cv/",
      "  npm run doc -- list",
      "  npm run doc -- all                   everything → out/",
      "  npm run doc -- cv [id] [--lang fr]   → out/cvs/",
      "  npm run doc -- letter <id>           → out/letters/",
      "  npm run doc -- new cv <id>           new file in src/content/cvs/",
      "  npm run doc -- new letter <id>       new file in private/letters/",
    ].join("\n"),
  );
}

async function main() {
  const args = process.argv.slice(2);
  const command = args.shift() ?? "help";
  const langIndex = args.indexOf("--lang");
  const lang = langIndex >= 0 ? args.splice(langIndex, 2)[1] : undefined;
  if (langIndex >= 0 && !(lang && isLocale(lang)))
    throw new Error(`--lang must be one of: ${locales.join(", ")}`);
  const key = args[0];

  const variants = loadVariants();
  const published = variants.find((v) => v.publish);

  switch (command) {
    case "publish": {
      if (!published)
        throw new Error(
          "No CV variant has `publish: true` in src/content/cvs/.",
        );
      const missing = locales.filter((l) => !published.languages.includes(l));
      if (missing.length)
        throw new DocError(
          published.file,
          `the published CV needs every site language (missing: ${missing.join(", ")})`,
        );
      // Public: never any private details.
      const dir = path.join(root, "public", CV_PUBLIC_DIR);
      for (const locale of locales) await buildCv(published, locale, dir, {});
      console.log("Published CV generated (no private details).");
      break;
    }
    case "cv": {
      const chosen = key ? findVariant(variants, key) : undefined;
      if (key && !chosen)
        throw new Error(
          `No CV variant "${key}". Known: ${variants.map((v) => v.id).join(", ")}`,
        );
      const details = readDetails();
      for (const variant of chosen ? [chosen] : variants)
        for (const locale of variant.languages)
          if (!lang || lang === locale)
            await buildCv(variant, locale, path.join(OUT_DIR, "cvs"), details);
      break;
    }
    case "letter": {
      if (!key)
        throw new Error("Which letter? Try: npm run doc -- letter <id>");
      const file = resolveLetterPath(key);
      if (!file)
        throw new Error(
          `No letter "${key}" in ${rel(LETTERS_DIR)}/. Start one with: npm run doc -- new letter ${key}`,
        );
      await buildLetter(loadLetterFile(file), variants, readDetails());
      break;
    }
    case "all": {
      const details = readDetails();
      for (const variant of variants)
        for (const locale of variant.languages)
          await buildCv(variant, locale, path.join(OUT_DIR, "cvs"), details);
      const letters = loadLetters();
      for (const letter of letters)
        await buildLetter(letter, variants, details);
      if (letters.length === 0)
        console.log(
          `No letters yet (${rel(LETTERS_DIR)}/ is empty or missing).`,
        );
      break;
    }
    case "new": {
      const [kind, id] = args;
      if (kind === "cv") {
        if (!published) throw new Error("No published variant to start from.");
        const newId = checkNewId(id, "cv");
        await createFile(
          path.join(CVS_DIR, `${newId}.md`),
          variantTemplate(newId, published),
          `npm run doc -- cv ${newId}`,
        );
      } else if (kind === "letter") {
        const newId = datedLetterId(checkNewId(id, "letter"));
        await createFile(
          path.join(LETTERS_DIR, `${newId}.md`),
          letterTemplate(newId),
          `npm run doc -- letter ${newId}`,
        );
      } else {
        usage();
        process.exitCode = 1;
      }
      break;
    }
    case "list": {
      const letters = loadLetters();
      const width =
        Math.max(...[...variants, ...letters].map((d) => d.id.length)) + 2;
      console.log("CV variants (src/content/cvs/):");
      for (const v of variants)
        console.log(
          `  ${v.id.padEnd(width)}${v.name}_<LANG>.pdf  [${v.languages.join(", ")}]${v.publish ? "  (published)" : ""}`,
        );
      console.log(`Letters (${rel(LETTERS_DIR)}/):`);
      if (letters.length === 0) console.log("  none");
      for (const l of letters)
        console.log(
          `  ${l.id.padEnd(width)}${l.name}.pdf  [${l.lang}] → ${l.company ?? "no company"}`,
        );
      break;
    }
    default:
      usage();
      if (command !== "help") process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
