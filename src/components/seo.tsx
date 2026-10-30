import { Metadata } from "next"
import type { Locale } from "next-intl"
import { getTranslations } from "next-intl/server"

import { routing } from "@/i18n/routing"

export const SITE_URL = "https://uiogaming.no"
export const THEME_COLOR = "#7d36e7"

type SeoProps = {
  locale: Locale
  /** Path without the locale prefix, e.g. "/" or "/event/some-slug" */
  path: string
  title?: string
  description?: string
  imageURL?: string
  author?: string
  /** Marks the page as an article, e.g. a blog post */
  publishedTime?: string
}

export async function generateSeoMetadata({
  locale,
  path,
  title,
  description,
  imageURL,
  author,
  publishedTime,
}: SeoProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metaTags" })

  const defaultTitle = "UiO Gaming"
  const metaDescription = description || t("description")
  const localizedPath = (pageLocale: Locale) =>
    path === "/" ? `/${pageLocale}` : `/${pageLocale}${path}`

  return {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: metaDescription,
    authors: author ? [{ name: author }] : [{ name: "UiO Gaming" }],
    // Tells search engines that the Norwegian and English versions are the
    // same page. The unprefixed path redirects based on the browser language
    alternates: {
      canonical: localizedPath(locale),
      languages: {
        ...Object.fromEntries(
          routing.locales.map(pageLocale => [
            pageLocale,
            localizedPath(pageLocale),
          ])
        ),
        "x-default": path,
      },
    },
    openGraph: {
      title: title || defaultTitle,
      description: metaDescription,
      ...(publishedTime
        ? { type: "article", publishedTime, authors: author && [author] }
        : { type: "website" }),
      locale: locale,
      url: localizedPath(locale),
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
              url: "/logo_2024_neon_trans.png",
              alt: defaultTitle,
            },
          ],
    },
    twitter: {
      card: imageURL ? "summary_large_image" : "summary",
      title: title || defaultTitle,
      description: metaDescription,
      images: imageURL ? [imageURL] : ["/logo_2024_neon_trans.png"],
    },
    other: {
      "msapplication-TileColor": THEME_COLOR,
      "msapplication-navbutton-color": THEME_COLOR,
      "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
  }
}
