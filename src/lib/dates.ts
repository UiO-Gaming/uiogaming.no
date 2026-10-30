import type { Locale } from "next-intl"

const TIME_ZONE = "Europe/Oslo"

// Event dates are usually stored as Oslo wall-clock time without an offset
// ("2026-11-05 17:00"). The Studio's datetime field stores ISO timestamps
// instead, so both formats have to be handled
const LOCAL_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/

const osloPartsFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
})

const getOsloParts = (date: Date) =>
  Object.fromEntries(
    osloPartsFormatter
      .formatToParts(date)
      .map(({ type, value }) => [type, value])
  )

/** Formats a date as Oslo wall-clock time, e.g. "2026-11-05 17:00" */
export const toOsloDateString = (date: Date) => {
  const { year, month, day, hour, minute } = getOsloParts(date)
  return `${year}-${month}-${day} ${hour}:${minute}`
}

// How far Oslo's clock is ahead of UTC at the given moment (1 or 2 hours)
const getOsloOffset = (timestamp: number) => {
  const { year, month, day, hour, minute } = getOsloParts(new Date(timestamp))
  const osloAsUtc = Date.UTC(+year, +month - 1, +day, +hour, +minute)
  return osloAsUtc - Math.floor(timestamp / 60_000) * 60_000
}

/**
 * Parses an event date. Oslo wall-clock strings are interpreted in Oslo time
 * regardless of the server's timezone
 */
export const parseEventDate = (value: string) => {
  const match = value.match(LOCAL_DATE_FORMAT)
  if (!match) return new Date(value)

  const [year, month, day, hour, minute] = match.slice(1).map(Number)
  const wallClockAsUtc = Date.UTC(year, month - 1, day, hour, minute)

  // The offset depends on daylight saving time at the resulting moment, so
  // guess with the offset at the wall-clock time, then correct
  const guess = wallClockAsUtc - getOsloOffset(wallClockAsUtc)
  return new Date(wallClockAsUtc - getOsloOffset(guess))
}

/** Formats an event date like "torsdag 5. november 2026 kl. 17:00" */
export const formatEventDate = (value: string, locale: Locale) =>
  parseEventDate(value).toLocaleString(locale, {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  })
