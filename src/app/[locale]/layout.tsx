import "@/app/globals.css"

import { hasLocale, NextIntlClientProvider } from "next-intl"
import type { Metadata, Viewport } from "next"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"

import LanguageSelector from "@/components/ui/languageSelector"
import { SITE_URL, THEME_COLOR } from "@/components/seo"
import UmamiAnalytics from "@/components/umamiAnalytics"
import { routing } from "@/i18n/routing"

// Namespaces used by client components. Server components read their
// translations on the server, so only these need to be sent to the browser.
// Add to this list when a client component starts using a new namespace
const CLIENT_NAMESPACES = ["about", "buttons", "common", "office"]

export const metadata: Metadata = {
  // Resolves relative URLs in metadata, like Open Graph images and alternates
  metadataBase: new URL(SITE_URL),
  title: "UiO Gaming",
  description:
    "En hobbyforening som ønsker å skape et sosialt miljø rundt gaming og e-sport på UiO!",
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

  const messages = await getMessages()
  const clientMessages = Object.fromEntries(
    CLIENT_NAMESPACES.map(namespace => [namespace, messages[namespace]])
  )

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <LanguageSelector />
          <main>{children}</main>
          <UmamiAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
