import { Metadata, Viewport } from "next"

type SeoProps = {
  title?: string
  description?: string
  imageURL?: string
  author?: string
}

export function generateSeoMetadata({
  title,
  description,
  imageURL,
  author,
}: SeoProps): Metadata {
  const defaultTitle = "UiO Gaming"
  const metaDescription =
    description ||
    "En hobbyforening som ønsker skape et sosialt miljö rundt gaming og e-sport på UiO!"
  const siteUrl = "https://uiogaming.no"
  const themeColor = "#7d36e7"

  return {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: metaDescription,
    authors: author ? [{ name: author }] : [{ name: "UiO Gaming" }],
    openGraph: {
      title: title || defaultTitle,
      description: metaDescription,
      type: "website",
      locale: "no",
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
      "theme-color": themeColor,
      "msapplication-TileColor": themeColor,
      "msapplication-navbutton-color": themeColor,
      "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
  }
}

export function generateSeoViewport(): Viewport {
  return {
    themeColor: "#7d36e7",
    colorScheme: "dark",
  }
}
