interface AnalyticsConfig {
  websiteId: string
  src: string
  domains: string[]
  enabled: boolean
}

export function getAnalyticsConfig(): AnalyticsConfig | null {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const src =
    process.env.NEXT_PUBLIC_UMAMI_SRC || "https://analytics.umami.is/script.js"

  if (!websiteId) {
    return null
  }

  // Define allowed domains
  const domains = ["uiogaming.no", "www.uiogaming.no"]

  // Additional environment-based checks
  const enabled = process.env.NODE_ENV === "production"

  return {
    websiteId,
    src,
    domains,
    enabled,
  }
}
