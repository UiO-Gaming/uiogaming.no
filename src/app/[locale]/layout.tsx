// app/[locale]/layout.tsx
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"

import LanguageSelector from "@components/ui/languageSelector"
import UmamiAnalytics from "@/components/umamiAnalytics"
import { locales } from "@/i18n"
import { getAnalyticsConfig } from "@/lib/analyticsConfig"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // [locale] matches any first path segment, e.g. /favicon.txt or /de
  if (!hasLocale(locales, locale)) notFound()

  const messages = (await import(`../../../messages/${locale}.json`)).default

  const analyticsConfig = getAnalyticsConfig()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageSelector />
      <main>{children}</main>
      {analyticsConfig?.enabled && (
        <UmamiAnalytics
          websiteId={analyticsConfig.websiteId}
          src={analyticsConfig.src}
          domains={analyticsConfig.domains}
        />
      )}
    </NextIntlClientProvider>
  )
}
