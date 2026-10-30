import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook"
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

// Expire immediately so the first visit after a publish gets fresh content.
// The "max" profile would serve the stale version once more while refetching
const expireTag = (tag: string) => revalidateTag(tag, { expire: 0 })

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    console.error("SANITY_REVALIDATE_SECRET is not set")
    return NextResponse.json(
      { message: "Webhook is not configured" },
      { status: 500 }
    )
  }

  // Sanity signs the raw body with the webhook secret, so verify it before
  // parsing
  const rawBody = await request.text()
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? ""

  // Throws on a malformed signature header instead of returning false
  const isValid = await isValidSignature(rawBody, signature, secret).catch(
    () => false
  )

  if (!isValid) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
  }

  let body
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
  }

  try {
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
