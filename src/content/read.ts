/**
 * Reading and validating the Markdown files (CV variants, the profile and
 * letters). Shared by the website and the document generator.
 *
 * Types cannot check a YAML file, so everything is validated at load time with
 * messages that name the file and the field.
 */
import { parse } from "yaml";
import { type Locale, locales } from "@/i18n/config";

export class DocError extends Error {
  constructor(file: string, message: string) {
    super(`${file}: ${message}`);
    this.name = "DocError";
  }
}

/** Split `---\nYAML\n---\nbody` into data and body. */
export function parseMarkdown(source: string, file: string) {
  const text = source.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n?---[ \t]*(?:\n([\s\S]*))?$/);
  if (!match) throw new DocError(file, "missing frontmatter (--- … ---)");
  let data: unknown;
  try {
    data = parse(match[1] ?? "");
  } catch (error) {
    throw new DocError(
      file,
      `invalid YAML: ${error instanceof Error ? error.message : error}`,
    );
  }
  return {
    data: (data ?? {}) as unknown,
    body: (match[2] ?? "").trim(),
  };
}

/** Small typed reader over an unknown value, with readable error paths. */
export class Reader {
  constructor(
    readonly file: string,
    readonly value: unknown,
    readonly where: string,
  ) {}

  fail(message: string): never {
    throw new DocError(this.file, `${this.where}: ${message}`);
  }

  child(key: string | number, value: unknown) {
    const where =
      typeof key === "number"
        ? `${this.where}[${key}]`
        : `${this.where}.${key}`;
    return new Reader(this.file, value, where);
  }

  get isMissing() {
    return this.value === undefined || this.value === null;
  }

  object(): Record<string, unknown> {
    if (
      !this.value ||
      typeof this.value !== "object" ||
      Array.isArray(this.value)
    )
      this.fail("must be a mapping (key: value)");
    return this.value as Record<string, unknown>;
  }

  /** Reject keys that are not in `allowed` (catches typos). */
  checkKeys(allowed: string[]) {
    for (const key of Object.keys(this.object()))
      if (!allowed.includes(key))
        this.fail(`unknown field \`${key}\` (allowed: ${allowed.join(", ")})`);
  }

  field(key: string) {
    return this.child(key, this.object()[key]);
  }

  string(): string {
    if (typeof this.value !== "string" || this.value.trim() === "")
      this.fail("must be a non-empty text");
    return (this.value as string).trim();
  }

  boolean(): boolean {
    if (typeof this.value !== "boolean") this.fail("must be true or false");
    return this.value as boolean;
  }

  array(): Reader[] {
    if (!Array.isArray(this.value)) this.fail("must be a list");
    return (this.value as unknown[]).map((item, i) => this.child(i, item));
  }

  stringList(): string[] {
    return this.array().map((item) => item.string());
  }

  /** `{ fr: "…", en: "…" }` with exactly the supported languages. */
  strings(extraKeys: string[] = []): Record<Locale, string> {
    const obj = this.object();
    const missing = locales.filter((l) => typeof obj[l] !== "string");
    if (missing.length)
      this.fail(
        `needs a text for each language (missing: ${missing.join(", ")})`,
      );
    for (const key of Object.keys(obj))
      if (
        !(locales as readonly string[]).includes(key) &&
        !extraKeys.includes(key)
      )
        this.fail(`unexpected \`${key}\``);
    return Object.fromEntries(
      locales.map((l) => [l, this.child(l, obj[l]).string()]),
    ) as Record<Locale, string>;
  }

  /** A text that is the same in every language, or `{ fr, en }`. */
  text(): string | Record<Locale, string> {
    return typeof this.value === "string" ? this.string() : this.strings();
  }

  locale(): Locale {
    const value = this.string();
    if (!(locales as readonly string[]).includes(value))
      this.fail(`must be one of: ${locales.join(", ")}`);
    return value as Locale;
  }

  /** A safe file base name: letters, digits, `_` and `-`. */
  fileName(): string {
    const value = this.string();
    if (!/^[A-Za-z0-9_-]+$/.test(value))
      this.fail("may only contain letters, digits, `_` and `-`");
    return value;
  }
}
