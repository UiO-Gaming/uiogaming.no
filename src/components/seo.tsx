import { Metadata } from "next"
import type { Locale } from "next-intl"
import { getTranslations } from "next-intl/server"

export const THEME_COLOR = "#7d36e7"

type SeoProps = {
  locale: Locale
  title?: string
  description?: string
  imageURL?: string
  author?: string
}

export async function generateSeoMetadata({
  locale,
  title,
  description,
  imageURL,
  author,
}: SeoProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metaTags" })

  const defaultTitle = "UiO Gaming"
  const metaDescription = description || t("description")
  const siteUrl = "https://uiogaming.no"

  return {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: metaDescription,
    authors: author ? [{ name: author }] : [{ name: "UiO Gaming" }],
    openGraph: {
      title: title || defaultTitle,
      description: metaDescription,
      type: "website",
      locale: locale,
      siteName: defaultTitle,
      images: imageURL
        ? [
            {
              url: imageURL,
              width: 1200,
              height: 630,
              alt: title || defaultTitle,
            },
          ]
        : [
            {
              url: `${siteUrl}/logo_2024_neon_trans.png`,
              alt: defaultTitle,
            },
          ],
    },
    twitter: {
      card: imageURL ? "summary_large_image" : "summary",
      title: title || defaultTitle,
      description: metaDescription,
      images: imageURL ? [imageURL] : [`${siteUrl}/logo_2024_neon_trans.png`],
    },
    other: {
      "msapplication-TileColor": THEME_COLOR,
      "msapplication-navbutton-color": THEME_COLOR,
      "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
  }
}
