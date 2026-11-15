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

/** Years only, for the timeline: "2026", "2020 – 2025", "2024 – Present". */
export function formatYears(period: Period, presentLabel: string) {
  const start = parseDate(period.start).year;
  if (!period.end) return String(start);
  if (period.end === "present") return `${start} – ${presentLabel}`;
  const end = parseDate(period.end).year;
  return end === start ? String(start) : `${start} – ${end}`;
}

/**
 * Months of a period that fits within one year, shown under the year on the
 * timeline: "Février – mai", "July". Longer periods return nothing: their
 * years say enough.
 */
export function formatMonths(period: Period, locale: Locale) {
  const start = parseDate(period.start);
  if (!start.month || period.end === "present") return undefined;
  const month = (value: number) =>
    new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" }).format(
      new Date(Date.UTC(start.year, value - 1, 1)),
    );
  if (!period.end || period.end === period.start)
    return capitalize(month(start.month));
  const end = parseDate(period.end);
  if (end.year !== start.year || !end.month) return undefined;
  return capitalize(`${month(start.month)} – ${month(end.month)}`);
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
