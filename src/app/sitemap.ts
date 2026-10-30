import { getLocalizedPath, SITE_URL } from "@/components/seo"
import { routing } from "@/i18n/routing"
import { getSitemapDocuments } from "@/lib/sanity"

import type { MetadataRoute } from "next"

export const revalidate = 3600 // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, events } = await getSitemapDocuments()

  const pages: { path: string; lastModified?: string }[] = [
    { path: "/" },
    ...posts.map(post => ({
      path: `/blog/${post.slug}`,
      lastModified: post._updatedAt,
    })),
    ...events.map(event => ({
      path: `/event/${event.slug}`,
      lastModified: event._updatedAt,
    })),
  ]

  // One entry per language version, each linking to the other versions
  return pages.flatMap(({ path, lastModified }) => {
    const languages = Object.fromEntries(
      routing.locales.map(locale => [
        locale,
        `${SITE_URL}${getLocalizedPath(locale, path)}`,
      ])
    )

    return routing.locales.map(locale => ({
      url: languages[locale],
      lastModified,
      alternates: { languages },
    }))
  })
}
