const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2024-05" → "May 2024"; "2024" → "2024"; "" → "". */
export function formatMonthYear(ym?: string | number): string {
  if (ym === undefined || ym === null || ym === "") return "";
  const [y, m] = String(ym).split("-");
  if (!m) return y ?? "";
  return `${MONTHS[Number(m) - 1] ?? ""} ${y}`.trim();
}

/** "2024-05" + "2025-01" → "May 2024 — Jan 2025"; empty end → "… — Present". */
export function formatPeriod(start?: string, end?: string): string {
  const s = formatMonthYear(start);
  const e = end ? formatMonthYear(end) : "Present";
  return s ? `${s} — ${e}` : e;
}
