// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl"
import { getLocale } from "next-intl/server"

import LanguageSelector from "@components/ui/languageSelector"
import UmamiAnalytics from "@/components/umamiAnalytics"
import { getAnalyticsConfig } from "@/lib/analyticsConfig"

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = (await getLocale()) as "no" | "en"
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
