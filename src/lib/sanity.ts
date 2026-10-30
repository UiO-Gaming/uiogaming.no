import { createClient } from "@sanity/client"

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
  // Event dates are stored as Oslo local time strings ("2026-11-05 17:00"),
  // which sort correctly as text, so compare against the current time in the
  // same format
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Oslo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map(({ type, value }) => [type, value])
  )
  const now = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`

  const query = `
    *[_type == "event" && date >= $now] | order(date asc)[0...$limit] {
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
      boardMember,
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
