import type { DateValue, Period, Place } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Localize } from "@/i18n/localize";

type DateStyle = "numeric" | "long";

function parseDate(value: DateValue) {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

function formatDate(value: DateValue, locale: Locale, style: DateStyle) {
  const { year, month } = parseDate(value);
  if (!month) return String(year);
  if (style === "numeric") return `${String(month).padStart(2, "0")}/${year}`;
  const label = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
  return label;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Format a period for display.
 * - `numeric` (CV):   "02/2026 – 05/2026", "2020 – 2025", "07/2025"
 * - `long` (website): "Février 2026 – mai 2026", "July 2025"
 */
export function formatPeriod(
  period: Period,
  locale: Locale,
  presentLabel: string,
  style: DateStyle = "numeric",
) {
  const start = formatDate(period.start, locale, style);
  if (!period.end || period.end === period.start) return capitalize(start);
  const end =
    period.end === "present"
      ? presentLabel
      : formatDate(period.end, locale, style);
  return capitalize(`${start} – ${end}`);
}

export function formatPlace(place: Localize<Place>) {
  return `${place.city}, ${place.country}`;
}

/** "https://www.example.com/" → "example.com" */
export function displayUrl(url: string) {
  return url
    .replace(/^(https?:|mailto:|tel:)\/{0,2}/, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}
