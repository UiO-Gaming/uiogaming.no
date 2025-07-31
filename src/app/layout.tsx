import "@/app/globals.css"

import UmamiAnalytics from "@/components/umamiAnalytics"

import { getAnalyticsConfig } from "@/lib/analyticsConfig"

import type { Metadata } from "next"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const analyticsConfig = getAnalyticsConfig()

  return (
    <html lang="no">
      <body>
        <main>{children}</main>
        {analyticsConfig?.enabled && (
          <UmamiAnalytics
            websiteId={analyticsConfig.websiteId}
            src={analyticsConfig.src}
            domains={analyticsConfig.domains}
          />
        )}
      </body>
    </html>
  )
}
