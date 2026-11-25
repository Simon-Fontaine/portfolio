# simonfontaine.com

Bilingual (French / English) portfolio of Simon Fontaine, plus a **document
generator** for tailored CVs and cover letters. The website and the CVs read
the same master profile, but are otherwise independent.

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
| `npm run cv`         | Regenerate the published CV into `public/cv/`                      |
| `npm run doc -- all` | Generate every CV variant and cover letter into `out/` (see below) |
| `npm run build`      | Generate the CVs and build the production site                     |
| `npm start`          | Serve the production build                                         |
| `npm run check`      | Lint + type-check + tests (run this before pushing)                |
| `npm run format`     | Auto-format and auto-fix lint issues                               |

## Updating content

All content lives in **`src/content/`**:

| File | Contains |
| --- | --- |
| `src/content/cvs/generic.md` | The `profile:` block: everything about you (headline, contact, experience, projects, education, skills, languages). It is also the general CV. |
| `src/content/cvs/<other>.md` | Other CV versions: selections and tweaks of the profile (see below) |
| `src/content/ui.ts` | Interface text of the website: section titles, buttons, privacy page, error pages |

`generic.md` is the single source of truth. The website reads its `profile:`
block; there is no `profile.ts` any more. The file is validated when it is
loaded (`src/content/master.ts`): a missing language, a bad date or a typo in a
field name stops the build with the file and the field.

### Conventions

- **Translated text** is written as `fr:` and `en:`. If one language is
  missing, the build stops, so the two versions can't drift apart.
- **Text that is the same in both languages** (names, technologies, URLs) is a
  plain string.
- **Dates** are `"2026"` or `"2026-02"`. Omit `end` for a single date, or use
  `end: present` for something ongoing. They are formatted automatically:
  `02/2026 – 05/2026` on the CV, `February 2026 – May 2026` on the website.
- **Order** in each list is the display order on the website (most recent
  first).
- **Bullet points** (`highlights`) are `{ id, fr, en }`. The `id` is short and
  unique within the entry; CV variants use it to pick and reorder bullets.
- **Which entries go on a CV** is decided by the selection lists above
  `profile:` in `generic.md` (for the general CV) and by the other CV files.
  The website shows everything.
- After editing `generic.md`, restart `npm run dev` to see the change on the
  website (the file is read when the server starts).

### Common tasks

**Add a project:** copy an existing block in `profile.projects` and edit it.
To put it on the general CV, add its id to `projects:` at the top of the file.

```yaml
- id: my-project                  # unique
  name: My Project                # or: { fr: Mon projet, en: My Project }
  context: { fr: Projet personnel, en: Personal project }
  period: { start: 2026-09 }      # optional
  summary:
    fr: …
    en: …
  highlights:                     # optional bullet points
    - id: auth
      fr: …
      en: …
  tech: [TypeScript, Next.js]
  repository: https://github.com/…   # optional
  demo: https://…                    # optional
  featured: true                     # full write-up (otherwise a compact entry under "More projects")
  screenshot:                        # optional, featured only
    src: /images/projects/my-project.webp
    alt: { fr: …, en: … }
  image:                             # optional logo, compact entries
    src: /images/projects/my-project.png
    alt: { fr: …, en: … }
```

Images go in `public/images/projects/`. A `screenshot` (about 1600×1000) is
shown under the project's summary. Projects without one are presented as text
only: nothing is faked.

**New job:** add an entry at the top of `profile.experience`.
**Change your headline, summary or availability:** edit the top of the
`profile:` block. The headline is split on `|`: the part before it is the
role, the rest is shown after a dash.
**Change the personal note in the introduction:** edit `about`. This is the
one place where the site should sound like you.
**Add a skill:** add it to the right group in `skills` (a plain string, or
`{ fr, en }` if it needs translating, like `routage` / `routing`).

Then run:

```sh
npm run check   # catches empty text, bad dates, missing images, a CV over one page…
npm run cv      # regenerate the PDFs (optional: build and dev do it too)
```

## CVs and cover letters

`documents/` is a standalone generator. It reads the profile in
`src/content/cvs/generic.md` and turns it into PDFs. The website never imports
it, and it never imports website components: both only share the profile.

| Kind | Source | Output |
| --- | --- | --- |
| **CV variants** | `src/content/cvs/<id>.md` (committed) | `out/cvs/<name>_<LANG>.pdf` (with your phone number) |
| **Published CV** | the variant with `publish: true` (`generic.md`) | `public/cv/<name>_<LANG>.pdf` (no phone number), served by the website |
| **Cover letters** | `private/letters/<id>.md` (git-ignored) | `out/letters/<name>.pdf` |

`out/` and `private/` are git-ignored.

```sh
npm run cv                        # the published CV → public/cv/ (dev and build run it)
npm run doc -- list               # variants and letters found
npm run doc -- all                # every variant and letter → out/
npm run doc -- cv cybersecurity   # one variant → out/cvs/ (add --lang fr for one language)
npm run doc -- cv generic         # the general CV, with your phone number, for applications
npm run doc -- letter 2026-acme   # one letter → out/letters/
npm run doc -- new cv data-analyst    # start a new CV variant
npm run doc -- new letter 2026-acme   # start a new cover letter
```

### CV variants

A variant is a **selection** of the profile in `generic.md`, not a copy.
Everything it does not mention comes from there unchanged. See
`src/content/cvs/cybersecurity.md` for a full example. (`generic.md` itself is
the general CV: same selection keys, plus the `profile:` block.)

```md
---
name: Simon_Fontaine_CV_Cybersecurity   # output file name (+ _FR / _EN). Same name = overwritten
languages: [fr, en]
publish: false                          # true = served by the website (only one variant)
headline: { fr: "…", en: "…" }          # optional: replaces the headline on this CV
experience: [3d-side, student-jobs]     # ids from generic.md's profile, in this order (or: all)
projects: [enterprise-network, scrimflow]
education: all
skills: [systems, tools, development, data]
overrides:
  3d-side:
    highlights: [tests, bugfixes, devenv, viewers]   # bullet ids, in this order
  enterprise-network:
    highlights:
      - id: docker-deploy               # same id + fr/en = rewrite this bullet for this CV
        fr: "…"
        en: "…"
      - db-backups
---
```

To make a new version, run `npm run doc -- new cv <id>`. It creates
`src/content/cvs/<id>.md` with the general CV's selection (which fits on one
page) and lists every id you can pick. Edit it, then run
`npm run doc -- cv <id>`. To keep an old version, copy the file and give the
copy another `name` (for example `…_v1`). Mistakes (unknown id, missing language,
typo in a field) are reported with the file and the field.

The **published** variant (`publish: true`, currently `generic`) is the CV
linked from the website. Its `name` must stay `Simon_Fontaine_CV` (a test
checks it matches `PUBLISHED_CV_NAME` in `src/lib/cv.ts`). The build
regenerates it, so the published CV always matches the website. It is not
committed (`public/cv/` is git-ignored).

### Cover letters

Run `npm run doc -- new letter <company>[-<role>]` (for example
`acme-data-analyst`): it copies `documents/examples/letter.example.md` to
`private/letters/2026-11-acme-data-analyst.md` (the current month is added)
with today's date. Edit it, then run
`npm run doc -- letter 2026-11-acme-data-analyst`.

Naming convention: files are `YYYY-MM-<company>[-<role>].md`, PDFs are
`Simon_Fontaine_LM_<Company>[_<Role>].pdf` (LM: lettre de motivation, also for
letters in English). The `name:` field is filled in for you; edit it to fix
the capitals (`…_LM_RTBF`, not `…_LM_Rtbf`). `npm test` checks that your
letters follow it. The frontmatter gives the company (leave it out for an open application), contact, role, language, the CV
variant whose headline to show (`cv:`) and the output `name`; the text below
is the letter itself (blank line = new paragraph; `**bold**`, `*italic*` and
`[link](url)` work). Unlike the CVs, a letter is written in **one** language.
It keeps the CV's header and fonts, so a letter and its CV look like a set.

Letters are kept out of git because they name companies and contain personal
prose.

### Phone number

The phone number is not part of the content. It exists only in `.env.local`
on your own machine:

```sh
# .env.local (git-ignored, never deployed)
CV_PHONE="your number, written as it should appear"
```

It is added to every CV and letter generated into `out/`, and **never** to the
published CV. `npm test` checks this (no `tel:` link in the published PDF, no
phone number in any file that would be committed). Do not put the number in
`src/content/`, and do not set `CV_PHONE` on Vercel.

### Details

- **One page:** the generator warns, and `npm test` fails, if a CV variant no
  longer fits on one A4 page (with or without the phone number). Select fewer
  entries or shorten some text.
- **ATS-friendly:** single column, real selectable text, standard section
  headings, ligatures disabled so text extraction is exact, PDF metadata
  filled in.
- **Design:** `documents/render/`. Black on white, Source Sans, one column, no
  icons or colour. Content never goes in those files.
- **Boundaries:** a test fails if `src/` imports `documents/`, or if
  `documents/` imports website components or `ui.ts`.

## Languages

French is the default. `/` redirects to `/fr` or `/en` based on the browser's
language (`src/proxy.ts`). Each page has `hreflang` alternates and the
language switch keeps the current section (`/fr#projects` → `/en#projects`).

To add a language (e.g. Dutch):

1. Add `"nl"` to `locales` in `src/i18n/config.ts` and an entry in `localeInfo`.
2. Run `npm run typecheck`: TypeScript lists every `{ fr, en }` that now needs
   an `nl` value. Fill them in.
3. Add `nl` to `languages:` in `src/content/cvs/generic.md` (the published CV
   needs every site language; `npm run cv` says so otherwise).
4. `npm run check && npm run build`. A `/nl` site and a `Simon_Fontaine_CV_NL.pdf` appear.

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
- **Timelines** (experience, education): the year or years sit in their own
  column and stay pinned while the entry is read. Periods shorter than a year
  add their months underneath ("2026 / Février – mai"). On phones the date
  moves above the entry.
- **Projects:** each featured project has its story on one side (summary and
  "my contribution") and a fact sheet on the other (context, date,
  technologies, link, and the screenshot if there is one). The sides alternate
  from one project to the next.
- **Skills and languages:** one section, ruled rows, with technologies written
  as sentences.

`.npmrc` sets `legacy-peer-deps=true`: Papicons depends on
`react-native-svg`, whose `react-native` peer would otherwise add ~500 MB
of packages the website never loads.

## Project structure

```
src/
  content/          ← edit these: cvs/generic.md (the profile) and cvs/*.md (CV versions), ui.ts (site text)
                    master.ts loads and validates the profile; read.ts is the Markdown reader; types.ts
  app/
    [locale]/       pages: home, privacy, error boundary, social preview image
    global-not-found.tsx  bilingual 404 for every unknown URL
    sitemap.ts, robots.ts, icons
  components/       journey rail, timeline, copy button, icons, page sections
  i18n/             locale list, Accept-Language negotiation, localize()
  lib/              content access, date formatting, published-CV URL, theme script
  proxy.ts          "/" → "/fr" or "/en"
documents/                standalone PDF generator (nothing in src/ imports it)
  examples/       letter template
  engine/         reading, validating and applying variants and letters; templates for `new`
  render/         react-pdf layouts: CV, letter, shared header and fonts
  cli.ts          npm run cv / npm run doc
private/letters/          your cover letters (git-ignored)
out/                      generated CVs and letters (git-ignored)
tests/                    content integrity, i18n, documents
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
  and schema.org `Person` structured data. All of it comes from the profile in `generic.md`.
- The CV PDFs are sent with `X-Robots-Tag: noindex` to keep them out of search
  results. The old `/api/cv/<lang>` URLs permanently redirect to the new files.
- Semantic landmarks, skip link, one `h1` per page, visible focus, 44 px touch
  targets, `prefers-reduced-motion` support, AA colour contrast in both themes.
- **No phone number anywhere public:** see "Phone number" above.
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
