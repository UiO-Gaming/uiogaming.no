import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

const locales = ["no", "en"]

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale

  if (!locale || !locales.includes(locale as "no" | "en")) notFound()

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
