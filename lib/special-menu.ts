const ROME_TIME_ZONE = "Europe/Rome"

export type SpecialMenu = {
  /** Prefisso delle chiavi di traduzione in language-provider.tsx */
  id: string
  /** Data della serata, formato YYYY-MM-DD (ora di Roma) */
  date: string
  price: string
  courses: string[]
}

/**
 * Serate speciali a menu fisso. Ogni voce sparisce dal sito da sola il giorno
 * dopo la data indicata: per aggiungerne una basta una riga qui piu' le
 * traduzioni con lo stesso `id`.
 */
export const SPECIAL_MENUS: SpecialMenu[] = [
  {
    id: "brezzaMarina",
    date: "2026-08-07",
    price: "€42",
    courses: ["tartare", "pacchero", "branzino", "dolce"],
  },
]

/** Data odierna a Roma come YYYY-MM-DD, confrontabile in ordine lessicografico. */
function romeDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ROME_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

/** La serata piu' vicina non ancora passata, oppure null. */
export function getUpcomingSpecialMenu(now: Date): SpecialMenu | null {
  const today = romeDate(now)

  return (
    [...SPECIAL_MENUS].sort((a, b) => a.date.localeCompare(b.date)).find((menu) => menu.date >= today) ?? null
  )
}

const DATE_LOCALES: Record<string, string> = {
  IT: "it-IT",
  EN: "en-GB",
  DE: "de-DE",
  BS: "bs-BA",
  RU: "ru-RU",
  CZ: "cs-CZ",
  AL: "sq-AL",
}

/** "venerdì 7 agosto" nella lingua scelta dal visitatore. */
export function formatSpecialMenuDate(isoDate: string, language: string) {
  const [year, month, day] = isoDate.split("-").map(Number)

  return new Intl.DateTimeFormat(DATE_LOCALES[language] ?? "it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)))
}
