import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { locale as rootLocale } from "next/root-params"

import { routing } from "./routing"

export default getRequestConfig(async ({ locale }) => {
  // An explicit locale (e.g. getTranslations({ locale })) takes precedence.
  // The root param can be any first path segment until the layout rejects it,
  // so fall back to the default instead of throwing
  const requested = locale ?? (await rootLocale())
  const resolved = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  }
})
