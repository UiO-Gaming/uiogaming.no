import "@/app/globals.css"

import { LocaleProvider } from "@/components/localeProvider"
import UmamiAnalytics from "@/components/umamiAnalytics"

import { getAnalyticsConfig } from "@/lib/analyticsConfig"

import type { Metadata } from "next"
import { getLocale } from "next-intl/server"

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = (await getLocale()) as "no" | "en"
  const messages = (await import(`../../messages/${locale}.json`)).default // TODO: duplicate of request.ts?

  const analyticsConfig = getAnalyticsConfig()

  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale} messages={messages}>
          <main>{children}</main>
          {analyticsConfig?.enabled && (
            <UmamiAnalytics
              websiteId={analyticsConfig.websiteId}
              src={analyticsConfig.src}
              domains={analyticsConfig.domains}
            />
          )}
        </LocaleProvider>
      </body>
    </html>
  )
}
