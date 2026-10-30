import "@/app/globals.css"

import { hasLocale, NextIntlClientProvider } from "next-intl"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import LanguageSelector from "@components/ui/languageSelector"
import UmamiAnalytics from "@/components/umamiAnalytics"
import { locales } from "@/i18n"
import { getAnalyticsConfig } from "@/lib/analyticsConfig"

export const metadata: Metadata = {
  title: "UiO Gaming",
  description:
    "En hobbyforening som ønsker skape et sosialt miljø rundt gaming og e-sport på UiO!",
  icons: {
    icon: "/logo_2024_neon_pink.png",
    shortcut: "/logo_2024_neon_pink.png",
    apple: "/logo_2024_neon_pink.png",
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function RootLayout({
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
    <html lang={locale}>
      <body>
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
      </body>
    </html>
  )
}
