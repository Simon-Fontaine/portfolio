/**
 * Fonts and colours shared by the CV and the cover letter, which are
 * deliberately independent from the website's look: sober, single column,
 * black on white, printable and readable by applicant tracking systems (ATS).
 */
import path from "node:path";
import { Font } from "@react-pdf/renderer";

// Source Sans 3 (SIL Open Font License), from the @fontsource package.
const font = (file: string) =>
  path.join(
    process.cwd(),
    "node_modules/@fontsource/source-sans-3/files",
    `source-sans-3-latin-${file}.woff`,
  );
Font.register({
  family: "Source Sans",
  fonts: [
    { src: font("400-normal"), fontWeight: 400 },
    { src: font("400-italic"), fontWeight: 400, fontStyle: "italic" },
    { src: font("600-normal"), fontWeight: 600 },
    { src: font("700-normal"), fontWeight: 700 },
  ],
});
// Never hyphenate: the default English rules produce odd breaks in French.
Font.registerHyphenationCallback((word) => [word]);

export const ink = "#111111";
export const grey = "#444444";

/** Ligatures (fi, ff) can break text extraction by ATS: keep plain glyphs. */
export const noLigatures = { liga: false, clig: false, dlig: false };
