/**
 * Generate the CV in every language from `src/content/`.
 *
 *   npm run cv           → public/cv/   the public CVs, served by the website.
 *                          They never contain private details.
 *   npm run cv:private   → private/cv/  CVs for job applications, with the
 *                          phone number read from CV_PHONE in `.env.local`.
 *                          Both the folder and the file are git-ignored.
 *
 * `npm run cv` runs automatically before `npm run dev` and `npm run build`,
 * so the published CVs always match the website content.
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { countPdfPages, type PrivateDetails, renderCv } from "@/cv/cv-document";
import { locales } from "@/i18n/config";
import { CV_PRIVATE_DIR, CV_PUBLIC_DIR, cvFileName } from "@/lib/cv";

const isPrivate = process.argv.includes("--private");
const root = process.cwd();
const details: PrivateDetails = {};
let outDir = path.join(root, "public", CV_PUBLIC_DIR);

if (isPrivate) {
  if (existsSync(path.join(root, ".env.local")))
    process.loadEnvFile(path.join(root, ".env.local"));
  details.phone = process.env.CV_PHONE?.trim() || undefined;
  if (!details.phone) {
    console.error(
      'CV_PHONE is not set. Add a line CV_PHONE="your number" to .env.local (git-ignored), then run `npm run cv:private` again.',
    );
    process.exit(1);
  }
  outDir = path.join(root, CV_PRIVATE_DIR);
}

await mkdir(outDir, { recursive: true });
const started = performance.now();
for (const locale of locales) {
  const pdf = await renderCv(locale, details);
  const file = path.join(outDir, cvFileName(locale));
  await writeFile(file, pdf);
  const pages = countPdfPages(pdf);
  console.log(
    `✓ ${path.relative(root, file)} (${pages} page${pages > 1 ? "s" : ""}, ${Math.round(pdf.length / 1024)} KB)`,
  );
  if (pages > 1)
    console.warn(
      `  ⚠ The ${locale.toUpperCase()} CV no longer fits on one page. Shorten the content or set \`cv: false\` on some entries in src/content/profile.ts.`,
    );
}
console.log(
  isPrivate
    ? "Private CVs (with phone number) written to private/cv/. Do not publish them."
    : `Public CVs generated in ${Math.round(performance.now() - started)} ms`,
);
