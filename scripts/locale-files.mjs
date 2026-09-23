import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

function placeholders(text) {
  return [...text.matchAll(/\{([a-zA-Z][a-zA-Z0-9]*)\}/g)]
    .map((m) => m[1])
    .sort();
}

export function validateDictionary(reference, dictionary, file, prefix = "") {
  if (typeof reference === "string") {
    if (typeof dictionary !== "string" || !dictionary.trim())
      throw new Error(`${file}: ${prefix} must be a non-empty string`);
    if (
      JSON.stringify(placeholders(reference)) !==
      JSON.stringify(placeholders(dictionary))
    )
      throw new Error(`${file}: ${prefix} has incompatible placeholders`);
    return;
  }
  if (
    !dictionary ||
    typeof dictionary !== "object" ||
    Array.isArray(dictionary)
  )
    throw new Error(`${file}: ${prefix} must be an object`);
  for (const key of Object.keys(reference)) {
    if (!(key in dictionary))
      throw new Error(`${file}: missing ${prefix}${key}`);
    validateDictionary(
      reference[key],
      dictionary[key],
      file,
      `${prefix}${key}.`,
    );
  }
  for (const key of Object.keys(dictionary))
    if (!(key in reference))
      throw new Error(`${file}: unknown ${prefix}${key}`);
}

export async function readDictionaries(directory = "messages") {
  const files = (await readdir(directory))
    .filter((f) => f.endsWith(".json"))
    .sort();
  const dictionaries = {};
  for (const file of files) {
    const locale = path.basename(file, ".json");
    if (!/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/.test(locale))
      throw new Error(`Invalid locale filename: ${file}`);
    try {
      dictionaries[locale] = JSON.parse(
        await readFile(path.join(directory, file), "utf8"),
      );
    } catch (error) {
      throw new Error(`${file}: ${error.message}`);
    }
  }
  if (!dictionaries.fr)
    throw new Error("messages/fr.json is the required reference dictionary");
  for (const [locale, dictionary] of Object.entries(dictionaries)) {
    validateDictionary(dictionaries.fr, dictionary, `${locale}.json`);
    if (dictionary.locale.lang !== locale)
      throw new Error(`${locale}.json: locale.lang must match its filename`);
    if (!["ltr", "rtl"].includes(dictionary.locale.direction))
      throw new Error(`${locale}.json: invalid locale.direction`);
    new Intl.Locale(locale);
  }
  return dictionaries;
}
