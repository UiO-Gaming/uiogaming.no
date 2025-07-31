"use client"

import Script from "next/script"

interface UmamiAnalyticsProps {
  websiteId: string
  src?: string
  domains?: string[]
}

export default function UmamiAnalytics({
  websiteId,
  src = "https://analytics.umami.is/script.js",
  domains,
}: UmamiAnalyticsProps) {
  if (!websiteId) {
    console.warn("Umami: Website ID is required")
    return null
  }

  // Only load analytics in production or if explicitly enabled
  if (process.env.NODE_ENV !== "production") {
    return null
  }

  // Domain validation (client-side check as additional layer)
  if (domains && typeof window !== "undefined") {
    const currentDomain = window.location.hostname
    const isAllowedDomain = domains.some(
      domain => currentDomain === domain || currentDomain.endsWith(`.${domain}`)
    )

    if (!isAllowedDomain) {
      console.warn(
        `Umami: Domain ${currentDomain} not in allowed list:`,
        domains
      )
      return null
    }
  }

  return (
    <Script
      src={src}
      data-website-id={websiteId}
      data-domains={domains?.join(",")}
      strategy="afterInteractive"
    />
  )
}
