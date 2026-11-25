/**
 * What the website knows about the published CV: only where the PDF lives.
 * The generator (`documents/`) writes it; nothing here imports the generator.
 *
 * `PUBLISHED_CV_NAME` must match the `name` of the variant in `src/content/cvs/`
 * that has `publish: true` (a test checks this).
 */
import type { Locale } from "../i18n/config";

/** Folder (inside `public/`) where `npm run cv` writes the published CVs. */
export const CV_PUBLIC_DIR = "cv";

/** Base file name of the published CV (the language suffix is added). */
export const PUBLISHED_CV_NAME = "Simon_Fontaine_CV";

/** "Simon_Fontaine_CV_FR.pdf" */
export function cvFileName(locale: Locale) {
  return `${PUBLISHED_CV_NAME}_${locale.toUpperCase()}.pdf`;
}

/** Public URL of the CV for a language, e.g. "/cv/Simon_Fontaine_CV_FR.pdf". */
export function cvHref(locale: Locale) {
  return `/${CV_PUBLIC_DIR}/${cvFileName(locale)}`;
}
