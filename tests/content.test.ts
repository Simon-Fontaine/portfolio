/**
 * Content integrity checks: run `npm test` after editing src/content/.
 * TypeScript already guarantees that every `{ fr, en }` pair is complete;
 * these tests catch what types cannot (empty text, bad dates, broken paths…).
 */
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";
import { profile } from "@/content/profile";
import type { Period } from "@/content/types";
import { ui } from "@/content/ui";
import { locales } from "@/i18n/config";
import { isLocalized } from "@/i18n/localize";

/** Visit every string in a content tree, with a readable path for errors. */
function walkStrings(
  value: unknown,
  visit: (text: string, where: string) => void,
  where = "",
): void {
  if (typeof value === "string") {
    visit(value, where);
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => {
      walkStrings(item, visit, `${where}[${i}]`);
    });
  } else if (value && typeof value === "object")
    for (const [key, item] of Object.entries(value))
      walkStrings(item, visit, where ? `${where}.${key}` : key);
}

describe("content", () => {
  test("no empty or untrimmed text", () => {
    for (const [name, tree] of Object.entries({ profile, ui }))
      walkStrings(tree, (text, where) => {
        assert.ok(text.trim().length > 0, `${name}.${where} is empty`);
        assert.equal(text, text.trim(), `${name}.${where} has extra spaces`);
      });
  });

  test("translations are not accidentally identical copies", () => {
    // Long sentences that are identical in every language were probably not translated.
    const suspicious: string[] = [];
    const visit = (value: unknown, where: string) => {
      if (isLocalized(value)) {
        const texts = locales.map((l) => value[l]);
        if (
          texts.every((t) => typeof t === "string" && t === texts[0]) &&
          (texts[0] as string).split(" ").length > 4
        )
          suspicious.push(where);
        return;
      }
      if (value && typeof value === "object")
        for (const [key, item] of Object.entries(value))
          visit(item, `${where}.${key}`);
    };
    visit(profile, "profile");
    visit(ui, "ui");
    assert.deepEqual(suspicious, []);
  });

  test("ids are unique within each list", () => {
    for (const key of [
      "experience",
      "projects",
      "education",
      "skills",
    ] as const) {
      const ids = profile[key].map((item) => item.id);
      assert.equal(new Set(ids).size, ids.length, `duplicate id in ${key}`);
    }
  });

  test("dates are valid and periods are in order", () => {
    const periods: [string, Period | undefined][] = [
      ...profile.experience.map((e) => [e.id, e.period] as [string, Period]),
      ...profile.projects.map(
        (p) => [p.id, p.period] as [string, Period | undefined],
      ),
      ...profile.education.map((e) => [e.id, e.period] as [string, Period]),
    ];
    const valid = /^\d{4}(-(0[1-9]|1[0-2]))?$/;
    for (const [id, period] of periods) {
      if (!period) continue;
      assert.match(period.start, valid, `${id}: bad start date`);
      if (period.end && period.end !== "present") {
        assert.match(period.end, valid, `${id}: bad end date`);
        assert.ok(period.start <= period.end, `${id}: end is before start`);
      }
    }
  });

  test("links are absolute https URLs", () => {
    const urls = [
      profile.website,
      ...profile.social.map((s) => s.url),
      ...profile.experience.flatMap((e) => (e.url ? [e.url] : [])),
      ...profile.projects.flatMap((p) =>
        [p.repository, p.demo].filter((u): u is string => Boolean(u)),
      ),
      ...profile.education.flatMap((e) => (e.url ? [e.url] : [])),
    ];
    for (const url of urls)
      assert.equal(new URL(url).protocol, "https:", `${url} must use https`);
  });

  test("project images exist in public/", () => {
    for (const project of profile.projects)
      if (project.image)
        assert.ok(
          existsSync(path.join("public", project.image.src)),
          `${project.id}: ${project.image.src} not found in public/`,
        );
  });

  test("email looks valid", () => {
    assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
