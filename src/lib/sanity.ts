import { createClient } from "@sanity/client"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-02-19",
  useCdn: true,
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

export async function getAllEvents() {
  const query = `
    *[_type == "event"] | order(date asc) {
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
    {},
    {
      cache: "force-cache",
      next: {
        tags: ["events"],
        revalidate: 1800, // 30 minutes
      },
    }
  )
}
