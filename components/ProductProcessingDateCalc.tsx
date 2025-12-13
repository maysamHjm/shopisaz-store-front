import { ProductDetail } from "../types/product.types";

/**
 * Returns a human-friendly delivery range text like:
 * "Get it by Jul 25–28 if you order today"
 */
export function ProductProcessingDateCalc(
  profile: ProductDetail.ProcessingProfile,
  baseDate: Date = new Date()
): string {
  const start = new Date(baseDate);
  const end = new Date(baseDate);

  // Type 2 = processing required
  if (profile.type === 2) {
    const from = profile.processingDaysFrom ?? 0;
    const to = profile.processingDaysTo ?? from;
    const multiplier = profile.unit === 2 ? 7 : 1; // week → day

    start.setDate(start.getDate() + from * multiplier);
    end.setDate(end.getDate() + to * multiplier);
  }

  return `Get it by ${formatRange(start, end)} if you order today`;
}

/* ------------------------ */
/* Date formatting helpers */
/* ------------------------ */

function formatRange(start: Date, end: Date): string {
  const sameDay =
    start.getDate() === end.getDate() &&
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  if (sameDay) {
    return formatMonthDay(start);
  }

  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  if (sameMonth && sameYear) {
    // Jul 25–28
    return `${formatMonthDay(start)}–${end.getDate()}`;
  }

  if (sameYear) {
    // Jul 28 – Aug 2
    return `${formatMonthDay(start)} – ${formatMonthDay(end)}`;
  }

  // Dec 30, 2025 – Jan 2, 2026
  return `${formatFull(start)} – ${formatFull(end)}`;
}

function formatMonthDay(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

function formatFull(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
