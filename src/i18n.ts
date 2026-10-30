import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { locale as rootLocale } from "next/root-params"

export const locales = ["no", "en"] as const
const defaultLocale = "no"

export default getRequestConfig(async ({ locale }) => {
  // An explicit locale (e.g. getTranslations({ locale })) takes precedence.
  // The root param can be any first path segment until the layout rejects it,
  // so fall back to the default instead of throwing
  const requested = locale ?? (await rootLocale())
  const resolved = hasLocale(locales, requested) ? requested : defaultLocale

  return {
    locale: resolved,
    messages: (await import(`../messages/${resolved}.json`)).default,
  }
})
