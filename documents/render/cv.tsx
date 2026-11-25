/**
 * PDF layout of the CV, rendered with @react-pdf/renderer. Content comes from
 * the master profile (`src/content/`) narrowed by a variant
 * (`src/content/cvs/*.md`): edit the content there, and only touch this file to
 * change the CV's design.
 *
 * The CV is deliberately independent from the website's look: it is often
 * sent on its own, so it is a sober, single-column, black-on-white document
 * that prints well and parses cleanly in applicant tracking systems (ATS).
 */
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { formatPeriod, formatPlace } from "@/lib/format";
import type { LocalizedProfile, PrivateDetails } from "../engine/types";
import { Header } from "./header";
import type { Labels } from "./labels";
import { grey, ink, noLigatures } from "./theme";

const s = StyleSheet.create({
  page: {
    fontFamily: "Source Sans",
    fontSize: 9.3,
    lineHeight: 1.26,
    fontFeatureSettings: noLigatures,
    color: ink,
    paddingTop: 28,
    paddingBottom: 18,
    paddingHorizontal: 38,
  },
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
export function CvDocument({
  profile: p,
  locale,
  labels,
  details = {},
}: {
  profile: LocalizedProfile;
  locale: Locale;
  labels: Labels;
  details?: PrivateDetails;
}) {
  const period = (value: Parameters<typeof formatPeriod>[0]) =>
    formatPeriod(value, locale, labels.present);
  const bullets = (items?: { text: string }[]) => items?.map((h) => h.text);

  const lines = [
    ...p.skills.map((group) => ({
      label: group.name,
      value: group.items.join(", "),
    })),
    {
      label: labels.sections.languages,
      value: p.languages
        .map((language) => `${language.name} – ${language.level}`)
        .join(labels.listSeparator),
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
        <Header profile={p} labels={labels} details={details} />

        {p.experience.length > 0 && (
          <Section title={labels.sections.experience}>
            {p.experience.map((job) => (
              <Entry
                key={job.id}
                title={job.role}
                subtitle={job.organization}
                subtitleUrl={job.url}
                period={period(job.period)}
                place={formatPlace(job.location)}
                tech={job.tech}
                summary={job.summary}
                highlights={bullets(job.highlights)}
              />
            ))}
          </Section>
        )}

        {p.projects.length > 0 && (
          <Section title={labels.sections.projects}>
            {p.projects.map((project) => (
              <Entry
                key={project.id}
                title={project.name}
                titleUrl={project.demo ?? project.repository}
                note={project.context}
                period={project.period && period(project.period)}
                tech={project.tech}
                summary={project.summary}
                highlights={bullets(project.highlights)}
              />
            ))}
          </Section>
        )}

        {p.education.length > 0 && (
          <Section title={labels.sections.education}>
            {p.education.map((item) => (
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
        )}

        <Section title={labels.sections.skills}>
          {lines.map((line) => (
            <Text key={line.label} style={s.line}>
              <Text style={s.label}>
                {line.label}
                {labels.colon}
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
