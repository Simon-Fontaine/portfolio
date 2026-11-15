import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, test } from "node:test";
import { countPdfPages, renderCv } from "@/cv/cv-document";
import { locales } from "@/i18n/config";
import { cvFileName, cvHref } from "@/lib/cv";

// Assembled at run time so that this file passes its own "no phone number" scan.
const fakePhone = ["+00", "000", "00", "00", "00"].join(" ");

describe("CV", () => {
  for (const locale of locales) {
    test(`${locale.toUpperCase()} CV renders as a one-page PDF`, async () => {
      const pdf = await renderCv(locale);
      const raw = pdf.toString("latin1");
      assert.ok(raw.startsWith("%PDF-"), "not a PDF");
      const pages = countPdfPages(pdf);
      assert.equal(pages, 1, "the CV should fit on one page");
    });

    test(`${locale.toUpperCase()} CV: no phone number unless one is passed in`, async () => {
      const publicCv = (await renderCv(locale)).toString("latin1");
      assert.ok(!publicCv.includes("tel:"), "public CV contains a tel: link");
      const privateCv = await renderCv(locale, { phone: fakePhone });
      assert.ok(
        privateCv
          .toString("latin1")
          .includes(`tel:${fakePhone.replaceAll(" ", "")}`),
      );
      assert.equal(countPdfPages(privateCv), 1, "private CV exceeds one page");
    });
  }

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

  test("file names and URLs", () => {
    assert.equal(cvFileName("fr"), "Simon_Fontaine_CV_FR.pdf");
    assert.equal(cvHref("en"), "/cv/Simon_Fontaine_CV_EN.pdf");
  });
});
