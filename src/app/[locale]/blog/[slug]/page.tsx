import Footer from "@/components/page-sections/footer"
import { generateSeoMetadata } from "@/components/seo"
import Back from "@/components/ui/back"

import { type SanityImage, urlFor } from "@/lib/imageUrlBuilder"
import { getBlogPost } from "@/lib/sanity"

import { PortableText, PortableTextComponents } from "@portabletext/react"
import { Metadata } from "next"
import type { Locale } from "next-intl"
import { notFound } from "next/navigation"
import Image from "next/image"

import * as styles from "./page.module.css"

interface BlogPageParams {
  params: Promise<{
    slug: string
    locale: Locale
  }>
}

type ImageValue = Partial<SanityImage> & {
  alt?: string
  caption?: string
}

interface LinkValue {
  href: string
}

const SAFE_LINK_PROTOCOLS = ["http:", "https:", "mailto:"]

// Links come from the CMS, so reject schemes like javascript: that would run
// code when clicked. Parsing with URL also catches tricks like leading
// whitespace or mixed case that a simple prefix check would miss
const getSafeHref = (href?: string) => {
  if (!href) return null

  try {
    const { protocol } = new URL(href, "https://uiogaming.no")
    return SAFE_LINK_PROTOCOLS.includes(protocol) ? href : null
  } catch {
    return null
  }
}

// Render posts on first visit and cache them, instead of on every request
export async function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: BlogPageParams): Promise<Metadata> {
  const { slug, locale } = await params
  const data = await getBlogPost(slug)

  if (!data) notFound()

  return generateSeoMetadata({
    locale,
    path: `/blog/${slug}`,
    title: data.title,
    description: data.excerpt,
    // Cropped around the hotspot to the size link previews expect
    imageURL: data.mainImage?.asset
      ? urlFor(data.mainImage).width(1200).height(630).url()
      : undefined,
    author: data.author?.name,
    publishedTime: data._createdAt,
  })
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset) return null
      return (
        <div className={styles.imageContainer}>
          <Image
            // Only a width, so the image keeps its shape and just the crop
            // applies. fit("max") avoids upscaling small images
            src={urlFor(value).width(1200).fit("max").url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={400}
            sizes="(max-width: 640px) 100vw, 640px"
            style={{ width: "100%", height: "auto" }}
          />
          {value.caption && (
            <p className={styles.imageCaption}>{value.caption}</p>
          )}
        </div>
      )
    },
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode
      value?: LinkValue
    }) => {
      const href = getSafeHref(value?.href)
      if (!href) return <>{children}</>

      // Only links to other sites open in a new tab, not mailto: or links
      // within this site
      const isExternal = /^https?:\/\//i.test(href)

      return (
        <a
          href={href}
          className={styles.link}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
        </a>
      )
    },
  },
}

const BlogPost = async ({ params }: BlogPageParams) => {
  const { slug, locale } = await params

  const data = await getBlogPost(slug)

  if (!data) return notFound()

  const createdAt = new Date(data._createdAt).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <>
      <div className={styles.container}>
        <div className={styles.backButton}>
          <Back />
        </div>
        <article className={styles.article}>
          <header className={styles.header}>
            {data.mainImage && (
              <Image
                src={urlFor(data.mainImage).width(1600).fit("max").url()}
                alt={data.title}
                width={800}
                height={400}
                sizes="(max-width: 850px) 100vw, 850px"
                className={styles.headerImage}
              />
            )}
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.excerpt}>{data.excerpt}</p>
            <div className={styles.author}>
              {data.author?.image && (
                <Image
                  className="circular"
                  alt={data.author.name}
                  src={urlFor(data.author.image).width(100).height(100).url()}
                  width={50}
                  height={50}
                />
              )}
              <div className={styles.authorNameSection}>
                <p>{data.author?.name}</p>
                <p>{createdAt}</p>
              </div>
            </div>
          </header>
          <div className={styles.content}>
            <PortableText value={data.body} components={components} />
          </div>
        </article>
      </div>
      <Footer />
    </>
  )
}

export default BlogPost
