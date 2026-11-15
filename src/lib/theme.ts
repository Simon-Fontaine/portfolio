export const THEME_STORAGE_KEY = "theme";

/**
 * Inlined in <head> and run before the page is painted, so there is no flash
 * of the wrong theme. Static string: never interpolate user input here.
 */
export const themeScript = `(()=>{try{const t=localStorage.getItem("${THEME_STORAGE_KEY}");const d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;
