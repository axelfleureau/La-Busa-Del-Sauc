import { getHoursSeason, type HoursSeason } from "./hours"
import { getUpcomingSpecialMenu, type SpecialMenu } from "./special-menu"

const ROME_TIME_ZONE = "Europe/Rome"

const OPENING_MINUTES = 10 * 60 + 30
const CLOSING_MINUTES = 22 * 60 + 30

export type RestaurantStatus = {
  isOpenNow: boolean
  hoursSeason: HoursSeason
  specialMenu: SpecialMenu | null
  year: number
  /** Cambia solo quando cambia qualcosa di visibile: serve a evitare render inutili. */
  key: string
}

/**
 * Tutto cio' che nella pagina dipende dall'orologio, in un unico oggetto.
 * La pagina e' un solo client component: ricalcolare `new Date()` ogni minuto
 * ne ri-renderizzava l'intero albero, quindi qui produciamo una `key` stabile
 * che cambia solo quando apertura, stagione o serata speciale cambiano davvero.
 */
export function computeRestaurantStatus(now: Date): RestaurantStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ROME_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
    year: "numeric",
  }).formatToParts(now)

  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? ""

  const hour = Number(value("hour"))
  const minute = Number(value("minute"))
  const year = Number(value("year"))
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(value("weekday"))
  const minutesOfDay = hour * 60 + minute

  const hoursSeason = getHoursSeason(now)
  const isOpenDay = hoursSeason === "august" || weekday === 0 || weekday >= 3
  const isOpenNow = isOpenDay && minutesOfDay >= OPENING_MINUTES && minutesOfDay < CLOSING_MINUTES
  const specialMenu = getUpcomingSpecialMenu(now)

  return {
    isOpenNow,
    hoursSeason,
    specialMenu,
    year,
    key: `${isOpenNow}|${hoursSeason}|${specialMenu?.id ?? ""}|${year}`,
  }
}
