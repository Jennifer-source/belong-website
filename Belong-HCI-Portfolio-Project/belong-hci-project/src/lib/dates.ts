/** Date/time formatting helpers for demo event data. */

export interface FormattedEventDate {
  dayName: string;
  dayNumber: string;
  monthName: string;
  /** e.g. "Fri, 2 Oct" */
  short: string;
  /** e.g. "Friday" */
  weekdayLong: string;
  relative: "today" | "tomorrow" | "later";
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function formatEventDate(iso: string, now: Date = new Date()): FormattedEventDate {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  const dayName = DAY_NAMES[date.getDay()];
  const monthName = MONTH_NAMES[date.getMonth()];
  const dayNumber = String(date.getDate());

  const diffDays = Math.round((startOfDay(date).getTime() - startOfDay(now).getTime()) / 86_400_000);
  const relative: FormattedEventDate["relative"] = diffDays === 0 ? "today" : diffDays === 1 ? "tomorrow" : "later";

  return {
    dayName,
    dayNumber,
    monthName,
    short: `${dayName.slice(0, 3)}, ${dayNumber} ${monthName.slice(0, 3)}`,
    weekdayLong: dayName,
    relative,
  };
}

/** Duration in a human voice: 45 min → "45 min", 150 → "2½ hours". */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return h === 1 ? "1 hour" : `${h} hours`;
  return `${h} h ${m} min`;
}

/** "17:30" → "5:30 PM" style 12h output for wide layouts. */
export function formatTime12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m ?? 0).padStart(2, "0")} ${suffix}`;
}
