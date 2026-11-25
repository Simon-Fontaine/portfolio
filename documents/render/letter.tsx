/**
 * PDF layout of a cover letter. Same header and fonts as the CV, so that a
 * letter and its CV look like one set. One A4 page.
 */
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Locale } from "@/i18n/config";
import type { Letter, LocalizedProfile, PrivateDetails } from "../engine/types";
import { Header } from "./header";
import { Inline } from "./inline";
import type { Labels } from "./labels";
import { ink, noLigatures } from "./theme";

const s = StyleSheet.create({
  page: {
    fontFamily: "Source Sans",
    fontSize: 10.4,
    lineHeight: 1.38,
    fontFeatureSettings: noLigatures,
    color: ink,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 56,
  },
  meta: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
  },
  recipient: { flex: 1 },
  date: { textAlign: "right" },
  subject: { marginTop: 22, fontWeight: 700 },
  greeting: { marginTop: 18 },
  paragraph: { marginTop: 9 },
  closing: { marginTop: 14 },
  signature: { marginTop: 22, fontWeight: 700 },
});

function longDate(iso: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function LetterDocument({
  profile: p,
  letter,
  labels,
  details = {},
}: {
  profile: LocalizedProfile;
  letter: Letter;
  labels: Labels;
  details?: PrivateDetails;
}) {
  const { lang } = letter;
  const place = letter.place ?? p.location.city;
  const date = longDate(letter.date, lang);
  const subject =
    letter.subject ??
    (letter.role
      ? `${labels.letter.application} – ${letter.role}`
      : labels.letter.unsolicited);

  return (
    <Document
      title={`${p.name} – ${subject}`}
      author={p.name}
      subject={subject}
      creator={p.name}
      producer={p.name}
      language={lang}
    >
      <Page size="A4" style={s.page}>
        <Header profile={p} labels={labels} details={details} />

        <View style={s.meta}>
          <View style={s.recipient}>
            {letter.contact && <Text>{letter.contact}</Text>}
            {letter.company && <Text>{letter.company}</Text>}
            {letter.address.map((line) => (
              <Text key={line}>{line}</Text>
            ))}
          </View>
          <Text style={s.date}>
            {lang === "fr" ? `${place}, le ${date}` : `${place}, ${date}`}
          </Text>
        </View>

        <Text style={s.subject}>
          {labels.letter.subject}
          {labels.colon}
          {subject}
        </Text>

        <Text style={s.greeting}>
          {letter.greeting ?? labels.letter.greeting}
        </Text>
        {letter.paragraphs.map((paragraph) => (
          <Text key={paragraph} style={s.paragraph}>
            <Inline text={paragraph} />
          </Text>
        ))}
        <Text style={s.closing}>{letter.closing ?? labels.letter.closing}</Text>
        <Text style={s.signature}>{p.name}</Text>
      </Page>
    </Document>
  );
}
