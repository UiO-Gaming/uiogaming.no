import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

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
      revalidateTag("blog-posts")
      if (slug?.current) {
        revalidateTag(`post-${slug.current}`)
      }
    } else if (_type === "event") {
      revalidateTag("events")
      if (slug?.current) {
        revalidateTag(`event-${slug.current}`)
      }
    }

    revalidateTag("home")

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
