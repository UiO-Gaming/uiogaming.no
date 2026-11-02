import Script from "next/script"

// Umami ignores visits from other domains, so local and preview deployments
// aren't counted
const DOMAINS = ["uiogaming.no", "www.uiogaming.no"]

export default function UmamiAnalytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const src =
    process.env.NEXT_PUBLIC_UMAMI_SRC || "https://analytics.umami.is/script.js"

  if (!websiteId || process.env.NODE_ENV !== "production") return null

  return (
    <Script
      src={src}
      data-website-id={websiteId}
      data-domains={DOMAINS.join(",")}
      strategy="afterInteractive"
    />
  )
}
