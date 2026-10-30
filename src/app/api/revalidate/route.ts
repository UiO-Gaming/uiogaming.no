import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

// Expire immediately so the first visit after a publish gets fresh content.
// The "max" profile would serve the stale version once more while refetching
const expireTag = (tag: string) => revalidateTag(tag, { expire: 0 })

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { _type, slug } = body

    console.log(
      `Revalidating content: ${_type}${slug ? ` (${slug.current})` : ""}`
    )

    if (_type === "post") {
      expireTag("blog-posts")
      if (slug?.current) {
        expireTag(`post-${slug.current}`)
      }
    } else if (_type === "event") {
      expireTag("events")
      if (slug?.current) {
        expireTag(`event-${slug.current}`)
      }
    } else if (_type === "author") {
      expireTag("authors")
      // Blog posts show the author's name and image
      expireTag("blog-posts")
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
      slug: slug?.current,
    })
  } catch (err) {
    console.error("Error revalidating:", err)
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
