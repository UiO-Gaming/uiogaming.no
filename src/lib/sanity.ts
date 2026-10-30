import { createClient } from "@sanity/client"

import { toOsloDateString } from "./dates"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-02-19",
  useCdn: false,
})

export async function getBlogPost(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      author-> {
        name,
        image {
          asset-> {
            _id,
            url
          }
        }
      },
      mainImage {
        asset-> {
          _id,
          url
        }
      },
      excerpt,
      body
    }
  `

  return sanityClient.fetch(
    query,
    { slug },
    {
      cache: "force-cache",
      next: {
        tags: ["blog-posts", `post-${slug}`],
        revalidate: 3600, // 1 hour
      },
    }
  )
}

export async function getEvent(slug: string) {
  const query = `
    *[_type == "event" && slug.current == $slug][0] {
      _id,
      title,
      location,
      date,
      slug,
      description
    }
  `

  return sanityClient.fetch(
    query,
    { slug },
    {
      cache: "force-cache",
      next: {
        tags: ["events", `event-${slug}`],
        revalidate: 3600, // 1 hour
      },
    }
  )
}

export async function getUpcomingEvents(limit: number) {
  // Most event dates are Oslo wall-clock strings ("2026-11-05 17:00"), which
  // sort correctly as text, so compare them against the current Oslo time in
  // the same format. ISO timestamps from the Studio are compared as datetimes
  const now = toOsloDateString(new Date())

  const query = `
    *[
      _type == "event" &&
      select(
        defined(dateTime(date)) => dateTime(date) >= dateTime(now()),
        date >= $now
      )
    ] | order(date asc)[0...$limit] {
      _id,
      title,
      location,
      date,
      slug,
      description
    }
  `

  return sanityClient.fetch(
    query,
    { now, limit },
    {
      cache: "force-cache",
      next: {
        tags: ["events"],
        revalidate: 1800, // 30 minutes
      },
    }
  )
}

export async function getBoardMembers() {
  const query = `
    *[_type == "author" && boardMember == true] | order(orderRank asc) {
      _id,
      contactInfo,
      name,
      role {
        no,
        en
      },
      image {
        asset->{
          _id,
          url
        }
      },
      bio {
        no,
        en
      }
    }
  `

  return sanityClient.fetch(
    query,
    {},
    {
      cache: "force-cache",
      next: {
        tags: ["authors"],
        revalidate: 3600, // 1 hour
      },
    }
  )
}

export async function getSitemapDocuments(): Promise<{
  posts: { slug: string; _updatedAt: string }[]
  events: { slug: string; _updatedAt: string }[]
}> {
  const query = `
    {
      "posts": *[_type == "post" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      },
      "events": *[_type == "event" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    }
  `

  return sanityClient.fetch(
    query,
    {},
    {
      cache: "force-cache",
      next: {
        tags: ["blog-posts", "events"],
        revalidate: 3600, // 1 hour
      },
    }
  )
}
