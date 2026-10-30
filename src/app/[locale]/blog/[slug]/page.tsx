import Footer from "@/components/page-sections/footer"
import { generateSeoMetadata } from "@/components/seo"
import Back from "@/components/ui/back"

import { urlFor } from "@/lib/imageUrlBuilder"
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

interface ImageValue {
  asset?: {
    _id: string
    url: string
  }
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
    title: data.title,
    description: data.excerpt,
    imageURL: data.mainImage?.asset?.url,
    author: data.author?.name,
  })
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset) return null
      return (
        <div className={styles.imageContainer}>
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={400}
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

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
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
                src={urlFor(data.mainImage).url()}
                alt={data.title}
                width={800}
                height={400}
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
                  src={urlFor(data.author.image).width(50).height(50).url()}
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
