const ROME_TIME_ZONE = "Europe/Rome"

export type HoursSeason = "august" | "august-upcoming" | "regular"

function romeParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ROME_TIME_ZONE,
    month: "numeric",
    day: "numeric",
  }).formatToParts(date)

  return {
    month: Number(parts.find((part) => part.type === "month")?.value ?? 0),
    day: Number(parts.find((part) => part.type === "day")?.value ?? 0),
  }
}

/**
 * Ad agosto il locale è aperto tutti i giorni.
 * Nella seconda metà di luglio lo annunciamo in anticipo, poi la stagione
 * si attiva e si disattiva da sola senza altri interventi.
 */
export function getHoursSeason(date: Date): HoursSeason {
  const { month, day } = romeParts(date)

  if (month === 8) return "august"
  if (month === 7 && day >= 15) return "august-upcoming"
  return "regular"
}

export function isEveryDaySeason(date: Date) {
  return getHoursSeason(date) === "august"
}
