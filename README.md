# simonfontaine.com

Bilingual (French / English) portfolio of Simon Fontaine, with **CVs generated
from the same content as the website**. Edit one file, and the website, the
French CV and the English CV all update together.

**Stack:** Next.js 16 (App Router, static pages) · React 19 · TypeScript ·
Tailwind CSS 4 · `@react-pdf/renderer` for the CVs · Biome · Node's test runner.

## Quick start

Requires Node.js 22.12+.

```sh
npm ci
npm run dev        # generates the CVs, then starts http://localhost:3000
```

| Command              | What it does                                                       |
| -------------------- | ------------------------------------------------------------------ |
| `npm run dev`        | Generate the CVs and start the development server                  |
| `npm run cv`         | Regenerate the public CVs into `public/cv/`                        |
| `npm run cv:private` | Generate CVs with your phone number into `private/cv/` (see below) |
| `npm run build`      | Generate the CVs and build the production site                     |
| `npm start`          | Serve the production build                                         |
| `npm run check`      | Lint + type-check + tests (run this before pushing)                |
| `npm run format`     | Auto-format and auto-fix lint issues                               |

## Updating content

All content lives in **`src/content/`**:

| File                     | Contains                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `src/content/profile.ts` | Everything about you: headline, contact, experience, projects, education, skills, languages |
| `src/content/ui.ts`      | Interface text: section titles, buttons, privacy page, error pages                          |

### Conventions

- **Translated text** is written as `{ fr: "…", en: "…" }`. If one language is
  missing, TypeScript refuses to build, so the two versions can't drift apart.
- **Text that is the same in both languages** (names, technologies, URLs) is a
  plain string.
- **Dates** are `"2026"` or `"2026-02"`. Omit `end` for a single date, or use
  `end: "present"` for something ongoing. They are formatted automatically:
  `02/2026 – 05/2026` on the CV, `February 2026 – May 2026` on the website.
- **Order** in each list is the display order (most recent first).
- **`cv: false`** keeps an entry on the website only. Projects are the main use:
  the website shows them all, the CV only the ones without `cv: false`.

### Common tasks

**Add a project:** copy an existing block in `projects` and edit it.

```ts
{
  id: "my-project",              // unique, used as a React key
  cv: false,                     // website only (remove to also show it on the CV)
  name: "My Project",            // or { fr: "Mon projet", en: "My Project" }
  context: { fr: "Projet personnel", en: "Personal project" },
  period: { start: "2026-09" },  // optional
  summary: { fr: "…", en: "…" },
  highlights: [{ fr: "…", en: "…" }],    // optional bullet points
  tech: ["TypeScript", "Next.js"],
  repository: "https://github.com/…",    // optional
  demo: "https://…",                     // optional
  featured: true,                        // full write-up (otherwise a compact entry under "More projects")
  screenshot: { src: "/images/projects/my-project.webp", alt: { fr: "…", en: "…" } }, // optional, featured only
  image: { src: "/images/projects/my-project.png", alt: { fr: "…", en: "…" } },       // optional logo, compact entries
},
```

Images go in `public/images/projects/`. A `screenshot` (about 1600×1000) is
shown under the project's summary. Projects without one are presented as text
only: nothing is faked.

**New job:** add an entry at the top of `experience`.
**Change your headline, summary or availability:** edit the top of
`profile.ts`. The headline is split on `|`: the part before it is the role,
the rest is shown after a dash.
**Change the personal note in the introduction:** edit `about` in
`profile.ts`. This is the one place where the site should sound like you.
**Add a skill:** add it to the right group in `skills` (a plain string, or
`{ fr, en }` if it needs translating, like `"routage"` / `"routing"`).

Then run:

```sh
npm run check   # catches empty text, bad dates, missing images, a CV over one page…
npm run cv      # regenerate the PDFs (optional: build and dev do it too)
```

## The CVs

There are two kinds, generated from the same content and the same layout:

|                                           | Command              | Written to    | Phone number |
| ----------------------------------------- | -------------------- | ------------- | ------------ |
| **Public** (served by the website)        | `npm run cv`         | `public/cv/`  | never        |
| **Private** (to send with an application) | `npm run cv:private` | `private/cv/` | yes          |

The public CVs are served at `/cv/Simon_Fontaine_CV_<LANG>.pdf` and linked
from the website. Every build regenerates them, so **the published CVs always
match the website**. They are not committed (`public/cv/` is git-ignored).

### Private CV (phone number)

The phone number is not part of the content. It exists only in `.env.local`
on your own machine:

```sh
# .env.local (git-ignored, never deployed)
CV_PHONE="your number, written as it should appear"
```

`npm run cv:private` reads it and writes the CVs to `private/cv/`, which is
also git-ignored. Nothing else reads that variable: the website, the build and
the public CVs cannot contain it. `npm test` checks this (no `tel:` link in
the public PDFs, no phone number in any file that would be committed).

Do not put the number in `src/content/`, and do not set `CV_PHONE` on Vercel.

### Details

- **One page:** the script warns, and `npm test` fails, if a CV no longer fits
  on one A4 page (with or without the phone number). Shorten some text or set
  `cv: false` on an entry.
- **ATS-friendly:** single column, real selectable text, standard section
  headings, ligatures disabled so text extraction is exact, PDF metadata (title,
  author, language, keywords) filled in.
- **Design:** `src/cv/cv-document.tsx`. The CV is deliberately independent
  from the website's look, because it is often sent on its own: black on white,
  Source Sans, one column, no icons or colour. It prints cleanly and includes a
  labelled link to the portfolio. Content never goes in that file.

## Languages

French is the default. `/` redirects to `/fr` or `/en` based on the browser's
language (`src/proxy.ts`). Each page has `hreflang` alternates and the
language switch keeps the current section (`/fr#projects` → `/en#projects`).

To add a language (e.g. Dutch):

1. Add `"nl"` to `locales` in `src/i18n/config.ts` and an entry in `localeInfo`.
2. Run `npm run typecheck`: TypeScript lists every `{ fr, en }` that now needs
   an `nl` value. Fill them in.
3. `npm run check && npm run build`. A `/nl` site and a `Simon_Fontaine_CV_NL.pdf` appear.

## Design

The icons set the tone. [Papicons](https://github.com/PapillonApp/papicons)
are rounded, filled and sturdy, and the rest of the site is built to match
them. The rules live at the top of `src/app/globals.css`; in short:

|                | Rule                                                                                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Typography** | Bricolage Grotesque for the name and headings, Figtree for everything that is read or clicked (`src/app/fonts.ts`).                                                                                                      |
| **Colour**     | Warm paper, ink, one accent. The accent means "you can act on this" or "you are here". Nothing else is coloured.                                                                                                         |
| **Shape**      | Pill-shaped controls, rounded tiles and panels, 2px lines. Filled surfaces instead of thin outlines.                                                                                                                     |
| **Icons**      | One icon per section, shown in the navigation and next to the section title. Other icons label a fact or an action; none is decorative. All are imported through `src/components/icons.tsx`.                             |
| **States**     | Hover changes colour only (120ms). Press scales the control slightly. Focus shows a 2px accent ring. The current section is tinted in the navigation.                                                                    |
| **Motion**     | The timelines and the navigation track fill as you scroll; the menu slides; the theme cross-fades; the copy button swaps its label in place. Nothing moves on its own, and `prefers-reduced-motion` turns all of it off. |
| **Writing**    | First person, short sentences, facts. No slogans.                                                                                                                                                                        |

Layout:

- **Navigation:** a fixed rail on large screens, a top bar with a progress line
  and a slide-in menu on smaller ones.
- **Timelines** (experience, education): dates sit in their own column and stay
  pinned while the entry is read. On phones the date moves above the entry.
- **Projects:** featured projects are panels with the description on the left
  and "my contribution" on the right. Panels are used for projects only.
- **Skills and languages:** ruled rows, with technologies written as sentences.

`.npmrc` sets `legacy-peer-deps=true`: Papicons depends on
`react-native-svg`, whose `react-native` peer would otherwise add ~500 MB
of packages the website never loads.

## Project structure

```
src/
  content/          ← edit these: profile.ts (career data), ui.ts (interface text), types.ts
  cv/               CV layout (react-pdf), independent from the site design
  app/
    [locale]/       pages: home, privacy, error boundary, social preview image
    global-not-found.tsx  bilingual 404 for every unknown URL
    sitemap.ts, robots.ts, icons
  components/       journey rail, timeline, copy button, icons, page sections
  i18n/             locale list, Accept-Language negotiation, localize()
  lib/              content access, date formatting, CV file names, theme script
  proxy.ts          "/" → "/fr" or "/en"
scripts/generate-cv.tsx   writes the PDFs
tests/                    content integrity, i18n, CV rendering
```

## Quality and deployment

- **CI** (`.github/workflows/quality.yml`) runs on every push: lint,
  type-check, tests, `npm audit`, production build, then uploads the CVs as an
  artifact.
- **Deployment:** Vercel, with default settings. `npm run build` generates the
  CVs before building, so nothing else needs configuring. All pages, the
  sitemap and the social images are prerendered at build time.
- **Domain:** taken from `profile.website` (canonical URLs, sitemap, Open
  Graph, JSON-LD). Change it there if the domain changes.

## SEO, accessibility and privacy

- Per-language `<title>`, description, canonical URL, `hreflang`, Open Graph
  and Twitter cards, a generated 1200×630 social image per language, sitemap,
  and schema.org `Person` structured data. All of it comes from `profile.ts`.
- The CV PDFs are sent with `X-Robots-Tag: noindex` to keep them out of search
  results. The old `/api/cv/<lang>` URLs permanently redirect to the new files.
- Semantic landmarks, skip link, one `h1` per page, visible focus, 44 px touch
  targets, `prefers-reduced-motion` support, AA colour contrast in both themes.
- **No phone number anywhere public:** see "Private CV" above.
- **No cookies, no analytics, no third-party requests.** The only browser
  storage is the `theme` key in `localStorage`, written only when the visitor
  clicks the theme button (documented on the privacy page). Re-check the privacy
  page in `ui.ts` before adding any tracking, embed or external service.
- Security headers (CSP, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`) are in `next.config.ts`. The CSP allows
  `'unsafe-eval'` **only under `next dev`**: React's development build uses
  `eval()` for debugging (without it you get "eval() is not supported in this
  environment"). Production builds never call `eval()` and keep the strict policy.

Fonts: [Bricolage Grotesque](https://github.com/ateliertriay/bricolage) and
[Figtree](https://github.com/erikdkennedy/figtree) on the website,
[Source Sans 3](https://github.com/adobe-fonts/source-sans) in the CVs (all
SIL Open Font License, loaded from npm packages). Icons:
[Papicons](https://github.com/PapillonApp/papicons) (MIT).
