import type french from "../../messages/fr.json";

export type Messages = typeof french;

export function message(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{([a-zA-Z][a-zA-Z0-9]*)\}/g, (_, key: string) => {
    if (!(key in values)) throw new Error(`Missing message value: ${key}`);
    return String(values[key]);
  });
}
