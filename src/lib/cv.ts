import { profile } from "../content/profile";
import type { Locale } from "../i18n/config";

/** Folder (inside `public/`) where `npm run cv` writes the generated PDFs. */
export const CV_PUBLIC_DIR = "cv";

/** Git-ignored folder where `npm run cv:private` writes CVs with private details. */
export const CV_PRIVATE_DIR = "private/cv";

/** "Simon_Fontaine_CV_FR.pdf" */
export function cvFileName(locale: Locale) {
  return `${profile.name.replaceAll(" ", "_")}_CV_${locale.toUpperCase()}.pdf`;
}

/** Public URL of the CV for a language, e.g. "/cv/Simon_Fontaine_CV_FR.pdf". */
export function cvHref(locale: Locale) {
  return `/${CV_PUBLIC_DIR}/${cvFileName(locale)}`;
}
