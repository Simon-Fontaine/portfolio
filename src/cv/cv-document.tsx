/**
 * PDF layout of the CV, rendered with @react-pdf/renderer by
 * `scripts/generate-cv.tsx`. Content comes from `src/content/` — edit the
 * content there, and only touch this file to change the CV's design.
 *
 * The CV is deliberately independent from the website's look: it is often
 * sent on its own, so it is a sober, single-column, black-on-white document
 * that prints well and parses cleanly in applicant tracking systems (ATS).
 */
import path from "node:path";
import {
  Document,
  Font,
  Link,
  Page,
  renderToBuffer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { type Content, forCv, getContent } from "@/lib/content";
import { displayUrl, formatPeriod, formatPlace } from "@/lib/format";

// ── Font: Source Sans 3 (SIL Open Font License), from the @fontsource package.
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

const ink = "#111111";
const grey = "#444444";

const s = StyleSheet.create({
  page: {
    fontFamily: "Source Sans",
    fontSize: 9.3,
    lineHeight: 1.26,
    // Ligatures (fi, ff) can break text extraction by ATS: keep plain glyphs.
    fontFeatureSettings: { liga: false, clig: false, dlig: false },
    color: ink,
    paddingTop: 28,
    paddingBottom: 18,
    paddingHorizontal: 38,
  },
  name: { fontSize: 21, fontWeight: 700, lineHeight: 1.1 },
  headline: { fontSize: 11, marginTop: 2, color: grey },
  contactsFirst: { flexDirection: "row", marginTop: 6, fontSize: 9 },
  contacts: { flexDirection: "row", marginTop: 1, fontSize: 9 },
  contactItem: { flexDirection: "row" },
  contact: { color: ink, textDecoration: "none" },
  separator: { color: grey, marginHorizontal: 5 },
  section: { marginTop: 8 },
  sectionTitle: {
    fontSize: 9.8,
    fontWeight: 700,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    paddingBottom: 1.5,
    marginBottom: 4.5,
    borderBottomWidth: 0.8,
    borderBottomColor: ink,
  },
  entry: { marginBottom: 5 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  title: { fontSize: 10.2, fontWeight: 700 },
  titleLine: { flexDirection: "row", alignItems: "baseline", flex: 1 },
  note: { fontStyle: "italic", marginLeft: 3 },
  subtitle: { fontStyle: "italic" },
  aside: { color: grey, textAlign: "right" },
  tech: { fontStyle: "italic", color: grey },
  summary: { marginTop: 1.5 },
  bullets: { marginTop: 1.5 },
  bullet: { flexDirection: "row", marginTop: 0.6 },
  bulletMark: { width: 9, paddingLeft: 1 },
  bulletText: { flex: 1 },
  line: { marginBottom: 1.4 },
  label: { fontWeight: 700 },
  link: { color: ink, textDecoration: "none" },
  pageNumber: {
    position: "absolute",
    bottom: 12,
    right: 38,
    fontSize: 8,
    color: grey,
  },
});

// ── Building blocks ─────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={s.section}>
      {/* Keep the heading with at least the start of its first entry. */}
      <Text style={s.sectionTitle} minPresenceAhead={40}>
        {title}
      </Text>
      {children}
    </View>
  );
}

/** Text that is clickable in the PDF when a URL is given (no visual change). */
function Linked({
  url,
  style,
  children,
}: {
  url?: string;
  style: (typeof s)[keyof typeof s];
  children: string;
}) {
  if (!url) return <Text style={style}>{children}</Text>;
  return (
    <Link src={url} style={s.link}>
      <Text style={style}>{children}</Text>
    </Link>
  );
}

function Entry({
  title,
  titleUrl,
  note,
  subtitle,
  subtitleUrl,
  tech,
  period,
  place,
  summary,
  highlights,
}: {
  title: string;
  titleUrl?: string;
  /** Short qualifier printed after the title, e.g. "Final-year project". */
  note?: string;
  subtitle?: string;
  subtitleUrl?: string;
  tech?: string[];
  period?: string;
  place?: string;
  summary?: string;
  highlights?: string[];
}) {
  return (
    <View style={s.entry} wrap={false}>
      <View style={s.row}>
        <View style={s.titleLine}>
          <Linked url={titleUrl} style={s.title}>
            {title}
          </Linked>
          {note && <Text style={s.note}>{` – ${note}`}</Text>}
        </View>
        {period && <Text style={s.aside}>{period}</Text>}
      </View>
      {(subtitle || place) && (
        <View style={s.row}>
          <Linked url={subtitleUrl} style={s.subtitle}>
            {subtitle ?? ""}
          </Linked>
          {place && <Text style={s.aside}>{place}</Text>}
        </View>
      )}
      {tech?.length ? <Text style={s.tech}>{tech.join(", ")}</Text> : null}
      {summary && <Text style={s.summary}>{summary}</Text>}
      {highlights?.length ? (
        <View style={s.bullets}>
          {highlights.map((item) => (
            <View key={item} style={s.bullet}>
              <Text style={s.bulletMark}>•</Text>
              <Text style={s.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

// ── Document ────────────────────────────────────────────────────────────────
/**
 * Details that are never part of the public content (see README → "Private
 * CV"). They only exist on the machine that generates a CV for an application.
 */
export interface PrivateDetails {
  phone?: string;
}

export function CvDocument({
  content,
  details = {},
}: {
  content: Content;
  details?: PrivateDetails;
}) {
  const { profile: p, t, locale } = content;
  const period = (value: Parameters<typeof formatPeriod>[0]) =>
    formatPeriod(value, locale, t.labels.present);
  // French typography puts a (non-breaking) space before a colon.
  const colon = locale === "fr" ? " : " : ": ";

  type Contact = { label: string; url?: string };
  // Two deliberate lines: how to reach me, then where to see my work.
  const contactLines: Contact[][] = [
    [
      { label: p.email, url: `mailto:${p.email}` },
      ...(details.phone
        ? [
            {
              label: details.phone,
              url: `tel:${details.phone.replaceAll(" ", "")}`,
            },
          ]
        : []),
      { label: formatPlace(p.location) },
    ],
    [
      {
        label: `${t.cv.portfolio}${colon}${displayUrl(p.website)}`,
        url: p.website,
      },
      ...p.social.map((link) => ({ label: link.label, url: link.url })),
    ],
  ];

  const lines = [
    ...p.skills.map((group) => ({
      label: group.name,
      value: group.items.join(", "),
    })),
    {
      label: t.sections.languages,
      value: p.languages
        .map((language) => `${language.name} – ${language.level}`)
        .join(locale === "fr" ? " ; " : "; "),
    },
  ];

  return (
    <Document
      title={`${p.name} – CV`}
      author={p.name}
      subject={p.headline}
      keywords={p.skills.flatMap((group) => group.items).join(", ")}
      creator={p.name}
      producer={p.name}
      language={locale}
    >
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{p.name}</Text>
        <Text style={s.headline}>{p.headline}</Text>
        {contactLines.map((line, row) => (
          <View key={line[0].label} style={row ? s.contacts : s.contactsFirst}>
            {line.map((item, index) => (
              <View key={item.label} style={s.contactItem}>
                {index > 0 && <Text style={s.separator}>|</Text>}
                {item.url ? (
                  <Link src={item.url} style={s.contact}>
                    {item.label}
                  </Link>
                ) : (
                  <Text>{item.label}</Text>
                )}
              </View>
            ))}
          </View>
        ))}

        <Section title={t.sections.experience}>
          {forCv(p.experience).map((job) => (
            <Entry
              key={job.id}
              title={job.role}
              subtitle={job.organization}
              subtitleUrl={job.url}
              period={period(job.period)}
              place={formatPlace(job.location)}
              tech={job.tech}
              summary={job.summary}
              highlights={job.highlights}
            />
          ))}
        </Section>

        <Section title={t.sections.projects}>
          {forCv(p.projects).map((project) => (
            <Entry
              key={project.id}
              title={project.name}
              titleUrl={project.demo ?? project.repository}
              note={project.context}
              period={project.period && period(project.period)}
              tech={project.tech}
              summary={project.summary}
              highlights={project.highlights}
            />
          ))}
        </Section>

        <Section title={t.sections.education}>
          {forCv(p.education).map((item) => (
            <Entry
              key={item.id}
              title={item.degree}
              subtitle={item.school}
              subtitleUrl={item.url}
              period={period(item.period)}
              place={formatPlace(item.location)}
              summary={item.summary}
            />
          ))}
        </Section>

        <Section title={t.sections.skills}>
          {lines.map((line) => (
            <Text key={line.label} style={s.line}>
              <Text style={s.label}>
                {line.label}
                {colon}
              </Text>
              {line.value}
            </Text>
          ))}
        </Section>

        <Text
          style={s.pageNumber}
          fixed
          render={({ pageNumber, totalPages }) =>
            totalPages > 1 ? `${p.name} – ${pageNumber}/${totalPages}` : ""
          }
        />
      </Page>
    </Document>
  );
}

// ── Rendering helpers (used by scripts/generate-cv.tsx and the tests) ───────
export function renderCv(locale: Locale, details?: PrivateDetails) {
  return renderToBuffer(
    <CvDocument content={getContent(locale)} details={details} />,
  );
}

/** Count pages without a PDF parser: each page object has `/Type /Page`. */
export function countPdfPages(pdf: Buffer) {
  return pdf.toString("latin1").match(/\/Type\s*\/Page\b/g)?.length ?? 0;
}
