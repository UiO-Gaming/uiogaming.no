import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

export const locales = ["no", "en"] as const
export const defaultLocale = "no"

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // An explicit locale (e.g. getTranslations({ locale })) takes precedence.
  // Fall back to the default instead of throwing, so pages rendered outside
  // a valid locale (like the root not-found page) can still be translated
  const requested = locale ?? (await requestLocale)
  const resolved = hasLocale(locales, requested) ? requested : defaultLocale

  return {
    locale: resolved,
    messages: (await import(`../messages/${resolved}.json`)).default,
  }
})
