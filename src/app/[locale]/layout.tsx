import "@/app/globals.css"

import { hasLocale, NextIntlClientProvider } from "next-intl"
import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"

import LanguageSelector from "@components/ui/languageSelector"
import { THEME_COLOR } from "@/components/seo"
import UmamiAnalytics from "@/components/umamiAnalytics"
import { routing } from "@/i18n/routing"

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

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  colorScheme: "dark",
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
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
  if (!hasLocale(routing.locales, locale)) notFound()

  const messages = (await import(`../../../messages/${locale}.json`)).default

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageSelector />
          <main>{children}</main>
          <UmamiAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
