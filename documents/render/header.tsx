/** Name, headline and contact lines: the top of both the CV and the letter. */
import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import { displayUrl, formatPlace } from "@/lib/format";
import type { LocalizedProfile, PrivateDetails } from "../engine/types";
import type { Labels } from "./labels";
import { grey, ink } from "./theme";

const s = StyleSheet.create({
  name: { fontSize: 21, fontWeight: 700, lineHeight: 1.1 },
  headline: { fontSize: 11, marginTop: 2, color: grey },
  contactsFirst: { flexDirection: "row", marginTop: 6, fontSize: 9 },
  contacts: { flexDirection: "row", marginTop: 1, fontSize: 9 },
  contactItem: { flexDirection: "row" },
  contact: { color: ink, textDecoration: "none" },
  separator: { color: grey, marginHorizontal: 5 },
});

type Contact = { label: string; url?: string };

export function Header({
  profile: p,
  labels,
  details,
}: {
  profile: LocalizedProfile;
  labels: Labels;
  details: PrivateDetails;
}) {
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
        label: `${labels.portfolio}${labels.colon}${displayUrl(p.website)}`,
        url: p.website,
      },
      ...p.social.map((link) => ({ label: link.label, url: link.url })),
    ],
  ];

  return (
    <>
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
    </>
  );
}
