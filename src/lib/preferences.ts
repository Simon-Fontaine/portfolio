export type Theme = "light" | "dark" | "system";
let selectedTheme: Theme | undefined;
export function isTheme(value: string | undefined): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export function readTheme(): Theme {
  if (selectedTheme) return selectedTheme;
  try {
    const value = document.cookie.match(
      /(?:^|; )theme=(light|dark|system)(?:;|$)/,
    )?.[1];
    if (isTheme(value)) return value;
  } catch {
    /* System theme remains available without cookies. */
  }
  return "system";
}

export function applyTheme(theme: Theme) {
  selectedTheme = theme;
  const dark =
    theme === "dark" ||
    (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

export function setSessionPreference(
  name: "NEXT_LOCALE" | "theme",
  value: string,
) {
  try {
    // biome-ignore lint/suspicious/noDocumentCookie: Session preferences must work without the Cookie Store API.
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  } catch {
    // Settings still work in memory when storage is blocked.
  }
}

// Runs before the body is painted. Static, trusted code only, never user input.
export const themeScript = `(function(){var t='system';try{var m=document.cookie.match(/(?:^|; )theme=(light|dark|system)(?:;|$)/);if(m)t=m[1]}catch(e){}var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=d?'dark':'light'})()`;
