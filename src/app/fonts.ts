import localFont from "next/font/local";

/**
 * Typography: Bricolage Grotesque for the name and headings (sturdy and a
 * little quirky, like the icons), Figtree for everything that is read or
 * clicked. Both are open-source (SIL OFL) and self-hosted from npm packages:
 * no request ever leaves the site.
 */
const display = localFont({
  src: "../../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const text = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-italic.woff2",
      style: "italic",
    },
  ],
  weight: "300 900",
  variable: "--font-figtree",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** Class names to put on <html>. */
export const fontVariables = `${display.variable} ${text.variable}`;
