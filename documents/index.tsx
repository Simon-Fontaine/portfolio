/**
 * Public API of the document generator: turn the master profile, a CV variant
 * or a letter into PDF bytes. Used by the CLI and the tests. Nothing in `src/`
 * imports this folder.
 */
import { renderToBuffer } from "@react-pdf/renderer";
import { profile } from "@/content/master";
import { DocError } from "@/content/read";
import type { Locale } from "@/i18n/config";
import { localize } from "@/i18n/localize";
import type { CvVariant, Letter, PrivateDetails } from "./engine/types";
import { applyVariant, findVariant, loadVariants } from "./engine/variant";
import { CvDocument } from "./render/cv";
import { getLabels } from "./render/labels";
import { LetterDocument } from "./render/letter";

export async function renderCv(
  variant: CvVariant,
  locale: Locale,
  details?: PrivateDetails,
) {
  if (!variant.languages.includes(locale))
    throw new DocError(variant.file, `has no ${locale.toUpperCase()} version`);
  const resolved = localize(applyVariant(profile, variant), locale);
  return renderToBuffer(
    <CvDocument
      profile={resolved}
      locale={locale}
      labels={getLabels(locale)}
      details={details}
    />,
  );
}

export async function renderLetter(
  letter: Letter,
  variants: CvVariant[] = loadVariants(),
  details?: PrivateDetails,
) {
  let source = profile;
  if (letter.cv) {
    const variant = findVariant(variants, letter.cv);
    if (!variant)
      throw new DocError(
        letter.file,
        `cv: unknown CV variant \`${letter.cv}\` (known: ${variants.map((v) => v.id).join(", ")})`,
      );
    source = applyVariant(profile, variant);
  }
  return renderToBuffer(
    <LetterDocument
      profile={localize(source, letter.lang)}
      letter={letter}
      labels={getLabels(letter.lang)}
      details={details}
    />,
  );
}

/** Count pages without a PDF parser: each page object has `/Type /Page`. */
export function countPdfPages(pdf: Buffer) {
  return pdf.toString("latin1").match(/\/Type\s*\/Page\b/g)?.length ?? 0;
}
