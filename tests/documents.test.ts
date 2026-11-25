import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";
import { profile } from "@/content/master";
import { locales } from "@/i18n/config";
import { cvFileName, cvHref, PUBLISHED_CV_NAME } from "@/lib/cv";
import { countPdfPages, renderCv, renderLetter } from "../documents";
import {
  datedLetterId,
  EXAMPLES_DIR,
  letterName,
  loadLetterFile,
  loadLetters,
  parseLetter,
} from "../documents/engine/letter";
import {
  isNewId,
  letterTemplate,
  variantTemplate,
} from "../documents/engine/scaffold";
import {
  applyVariant,
  loadVariants,
  parseVariant,
} from "../documents/engine/variant";

// Assembled at run time so that this file passes its own "no phone number" scan.
const fakePhone = ["+00", "000", "00", "00", "00"].join(" ");
const variants = loadVariants();

describe("CV variants", () => {
  for (const variant of variants)
    for (const locale of variant.languages) {
      test(`${variant.id} ${locale.toUpperCase()} fits on one page, with or without a phone number`, async () => {
        const pdf = await renderCv(variant, locale);
        assert.ok(pdf.toString("latin1").startsWith("%PDF-"), "not a PDF");
        assert.equal(countPdfPages(pdf), 1, "should fit on one page");
        const withPhone = await renderCv(variant, locale, { phone: fakePhone });
        assert.equal(
          countPdfPages(withPhone),
          1,
          "exceeds one page with phone",
        );
        assert.ok(
          withPhone
            .toString("latin1")
            .includes(`tel:${fakePhone.replaceAll(" ", "")}`),
        );
        assert.ok(!pdf.toString("latin1").includes("tel:"));
      });
    }

  test("exactly one variant is published, matching the website's links", () => {
    const published = variants.filter((v) => v.publish);
    assert.equal(published.length, 1);
    assert.equal(published[0].name, PUBLISHED_CV_NAME);
    assert.deepEqual(
      [...published[0].languages].sort(),
      [...locales].sort(),
      "the published CV needs every site language",
    );
    assert.equal(cvFileName("fr"), "Simon_Fontaine_CV_FR.pdf");
    assert.equal(cvHref("en"), "/cv/Simon_Fontaine_CV_EN.pdf");
  });

  test("every variant resolves against the master profile", () => {
    for (const variant of variants) applyVariant(profile, variant);
  });

  test("unknown ids and typos give readable errors", () => {
    const parse = (yaml: string) =>
      applyVariant(profile, parseVariant(`---\n${yaml}\n---\n`, "bad.md"));
    assert.throws(
      () => parse("projects: [scrimflo]"),
      /bad\.md: projects: unknown id `scrimflo`/,
    );
    assert.throws(
      () => parse("overrides:\n  3d-side:\n    highlights: [nope]"),
      /unknown bullet `nope`/,
    );
    assert.throws(
      () =>
        parse(
          "projects: [enterprise-network]\noverrides:\n  scrimflow:\n    summary: { fr: x, en: y }",
        ),
      /no selected experience, project or education entry has this id/,
    );
    assert.throws(() => parse("projets: all"), /unknown field `projets`/);
    assert.throws(() => parse("headline: { fr: only }"), /missing: en/);
    assert.throws(() => parse("name: ../evil"), /may only contain letters/);
  });

  test("a selection keeps the order given", () => {
    const resolved = applyVariant(
      profile,
      parseVariant(
        "---\nprojects: [enterprise-network, scrimflow]\n---\n",
        "x.md",
      ),
    );
    assert.deepEqual(
      resolved.projects.map((p) => p.id),
      ["enterprise-network", "scrimflow"],
    );
  });
});

describe("cover letters", () => {
  test("the example letter renders on one page", async () => {
    const letter = loadLetterFile(path.join(EXAMPLES_DIR, "letter.example.md"));
    const pdf = await renderLetter(letter, variants, { phone: fakePhone });
    assert.equal(countPdfPages(pdf), 1);
  });

  test("a letter pointing at an unknown CV is rejected", async () => {
    const letter = parseLetter(
      "---\nlang: en\ncv: nope\ncompany: X\n---\nHello.\n",
      "l.md",
    );
    await assert.rejects(
      renderLetter(letter, variants),
      /unknown CV variant `nope`/,
    );
  });

  test("a letter can be sent to no company in particular", async () => {
    const letter = parseLetter("---\nlang: fr\n---\nBonjour.\n", "l.md");
    assert.equal(letter.company, undefined);
    assert.equal(countPdfPages(await renderLetter(letter, variants)), 1);
  });

  test("names are stable and paragraphs are split on blank lines", () => {
    const letter = parseLetter(
      "---\nlang: en\ncompany: X\nname: My_Letter\n---\nOne\nstill one.\n\nTwo.\n",
      "l.md",
    );
    assert.equal(letter.name, "My_Letter");
    assert.deepEqual(letter.paragraphs, ["One still one.", "Two."]);
  });
});

describe("scaffolding (npm run doc -- new …)", () => {
  test("a new CV variant is valid and fits on one page as created", async () => {
    const published = variants.find((v) => v.publish);
    assert.ok(published);
    const variant = parseVariant(
      variantTemplate("data-analyst", published),
      "data-analyst.md",
    );
    assert.equal(variant.name, "Simon_Fontaine_CV_data-analyst");
    assert.equal(variant.publish, false);
    for (const locale of variant.languages)
      assert.equal(countPdfPages(await renderCv(variant, locale)), 1);
  });

  test("a new letter is valid, dated today and named after its id", async () => {
    const letter = parseLetter(
      letterTemplate("2026-11-acme", new Date("2026-11-24T12:00:00Z")),
      "2026-11-acme.md",
    );
    assert.equal(letter.name, "Simon_Fontaine_LM_Acme");
    assert.equal(letter.date, "2026-11-24");
    assert.equal(countPdfPages(await renderLetter(letter, variants)), 1);
  });

  test("letters are named YYYY-MM-company and Simon_Fontaine_LM_Company", () => {
    const today = new Date("2026-11-24T12:00:00Z");
    assert.equal(datedLetterId("acme", today), "2026-11-acme");
    assert.equal(datedLetterId("2026-10-rtbf", today), "2026-10-rtbf");
    assert.equal(
      letterName("2026-11-acme-data-analyst"),
      "Simon_Fontaine_LM_Acme_Data_Analyst",
    );
    // Your own letters (private/letters/, only on your machine) follow it too.
    for (const letter of loadLetters()) {
      assert.match(letter.id, /^\d{4}-\d{2}-[a-z0-9-]+$/, letter.file);
      assert.match(
        letter.name,
        /^Simon_Fontaine_LM_[A-Za-z0-9_]+$/,
        letter.file,
      );
    }
  });

  test("new ids are restricted to safe file names", () => {
    assert.ok(isNewId("2026-acme"));
    for (const bad of [undefined, "", "../x", "Acme", "-x", "a b"])
      assert.ok(!isNewId(bad), String(bad));
  });
});

describe("repository hygiene", () => {
  test("no phone number in the files that get committed", () => {
    // Tracked files plus new files that are not git-ignored.
    const files = execFileSync(
      "git",
      ["ls-files", "--cached", "--others", "--exclude-standard"],
      { encoding: "utf8" },
    )
      .split("\n")
      .filter((file) => /\.(ts|tsx|js|mjs|json|md|css|yml|txt)$/.test(file))
      .filter((file) => file !== "package-lock.json");
    // International numbers and tel: links.
    const phone = /(?:\+|\b00)\d{2}[\s.]?\d{3}(?:[\s.]?\d{2}){3}|\btel:\+?\d/;
    const offenders = files.filter((file) => {
      try {
        return phone.test(readFileSync(file, "utf8"));
      } catch {
        return false; // deleted but not yet committed
      }
    });
    assert.deepEqual(offenders, []);
  });

  test("the website and the generator do not import each other", () => {
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory()
          ? walk(path.join(dir, entry.name))
          : /\.tsx?$/.test(entry.name)
            ? [path.join(dir, entry.name)]
            : [],
      );
    const importsOf = (file: string) =>
      [...readFileSync(file, "utf8").matchAll(/from\s+["']([^"']+)["']/g)].map(
        (match) => match[1],
      );
    // Website → generator: forbidden.
    for (const file of walk("src"))
      for (const spec of importsOf(file))
        assert.ok(
          !/(^|\/)documents(\/|$)/.test(spec),
          `${file} imports the document generator (${spec})`,
        );
    // Generator → website UI: only data, i18n and pure helpers are allowed.
    const forbidden =
      /^@\/(components|app|lib\/(content|theme|site|cn)|content\/ui)/;
    for (const file of walk("documents"))
      for (const spec of importsOf(file))
        assert.ok(
          !forbidden.test(spec),
          `${file} depends on website code (${spec})`,
        );
  });
});
