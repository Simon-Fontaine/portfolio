import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { negotiateLocale } from "@/i18n/config";
import { localize } from "@/i18n/localize";
import { formatMonths, formatPeriod, formatYears } from "@/lib/format";

describe("negotiateLocale", () => {
  test("falls back to French", () => {
    assert.equal(negotiateLocale(null), "fr");
    assert.equal(negotiateLocale(""), "fr");
    assert.equal(negotiateLocale("de-DE,de;q=0.9"), "fr");
  });
  test("picks the best supported language", () => {
    assert.equal(negotiateLocale("en-GB,en;q=0.9"), "en");
    assert.equal(negotiateLocale("fr-BE,fr;q=0.9,en;q=0.8"), "fr");
    assert.equal(negotiateLocale("de;q=1,en;q=0.5,fr;q=0.4"), "en");
    assert.equal(negotiateLocale("fr;q=0.2, en;q=0.8"), "en");
    assert.equal(negotiateLocale("en;q=0"), "fr");
  });
});

describe("localize", () => {
  test("resolves nested translations and keeps plain values", () => {
    const tree = {
      a: { fr: "Bonjour", en: "Hello" },
      list: ["React", { fr: "routage", en: "routing" }],
      nested: {
        n: 3,
        f: { fr: (x: number) => `${x} fr`, en: (x: number) => `${x} en` },
      },
    };
    const en = localize(tree, "en");
    assert.equal(en.a, "Hello");
    assert.deepEqual(en.list, ["React", "routing"]);
    assert.equal(en.nested.n, 3);
    assert.equal(en.nested.f(2), "2 en");
  });
});

describe("timeline dates", () => {
  test("years", () => {
    assert.equal(
      formatYears({ start: "2026-02", end: "2026-05" }, "x"),
      "2026",
    );
    assert.equal(
      formatYears({ start: "2016-09", end: "2022-06" }, "x"),
      "2016 – 2022",
    );
    assert.equal(formatYears({ start: "2025-07" }, "x"), "2025");
    assert.equal(
      formatYears({ start: "2024", end: "present" }, "Present"),
      "2024 – Present",
    );
  });
  test("months only when the period fits in one year", () => {
    assert.equal(
      formatMonths({ start: "2026-02", end: "2026-05" }, "fr"),
      "Février – mai",
    );
    assert.equal(formatMonths({ start: "2025-07" }, "en"), "July");
    assert.equal(
      formatMonths({ start: "2016-09", end: "2022-06" }, "fr"),
      undefined,
    );
    assert.equal(formatMonths({ start: "2020", end: "2025" }, "fr"), undefined);
  });
});

describe("formatPeriod", () => {
  test("numeric style (CV)", () => {
    assert.equal(
      formatPeriod({ start: "2026-02", end: "2026-05" }, "fr", "Aujourd'hui"),
      "02/2026 – 05/2026",
    );
    assert.equal(
      formatPeriod({ start: "2020", end: "2025" }, "en", "Present"),
      "2020 – 2025",
    );
    assert.equal(
      formatPeriod({ start: "2025-07" }, "en", "Present"),
      "07/2025",
    );
    assert.equal(
      formatPeriod({ start: "2024", end: "present" }, "en", "Present"),
      "2024 – Present",
    );
  });
  test("long style (website)", () => {
    assert.equal(
      formatPeriod({ start: "2025-07" }, "en", "Present", "long"),
      "July 2025",
    );
    assert.equal(
      formatPeriod(
        { start: "2026-02", end: "2026-05" },
        "fr",
        "Aujourd'hui",
        "long",
      ),
      "Février 2026 – mai 2026",
    );
  });
});
