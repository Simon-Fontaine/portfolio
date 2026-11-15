import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getContent } from "@/lib/content";
import { displayUrl, formatPlace } from "@/lib/format";

// Social preview image (LinkedIn, Slack, …), generated at build time from the content.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Simon Fontaine";

// Prerender one image per language at build time.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Static files of the display typeface (the image renderer cannot read variable fonts).
const fontFile = (weight: number) =>
  path.join(
    process.cwd(),
    "node_modules/@fontsource/bricolage-grotesque/files",
    `bricolage-grotesque-latin-${weight}-normal.woff`,
  );

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requested } = await params;
  const locale = isLocale(requested) ? requested : defaultLocale;
  const { profile: p } = getContent(locale);
  const [regular, bold] = await Promise.all([
    readFile(fontFile(400)),
    readFile(fontFile(700)),
  ]);
  const accent = "#f0925c";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#1c1917",
        color: "#fafaf9",
        fontFamily: "Bricolage Grotesque",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 26,
          color: "#d6d3d1",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: "#4ade80",
          }}
        />
        {p.availability}, {formatPlace(p.location)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -4,
          }}
        >
          {p.name}
        </div>
        <div style={{ fontSize: 34, color: "#e7e5e4", maxWidth: 1000 }}>
          {p.headline}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "2px solid #44403c",
          paddingTop: 32,
          fontSize: 26,
        }}
      >
        <span style={{ color: accent }}>{displayUrl(p.website)}</span>
        <span style={{ color: "#a8a29e" }}>
          {p.mainStack.slice(0, 5).join(", ")}
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: regular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Bricolage Grotesque",
          data: bold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
