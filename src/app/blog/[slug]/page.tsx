import Layout from "@/app/layout"

import Footer from "@/components/page-sections/footer"
import { generateSeoMetadata, generateSeoViewport } from "@/components/seo"
import Back from "@/components/ui/back"

import { urlFor } from "@/lib/imageUrlBuilder"
import { getBlogPost } from "@/lib/sanity"

import { PortableText, PortableTextComponents } from "@portabletext/react"
import { Metadata, Viewport } from "next"
import Image from "next/image"

import * as styles from "./page.module.css"

interface BlogPageParams {
  params: Promise<{
    slug: string
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

export async function generateMetadata({
  params,
}: BlogPageParams): Promise<Metadata> {
  const { slug } = await params
  const data = await getBlogPost(slug)

  if (!data) {
    return {
      title: "Blog Post Not Found | UiO Gaming",
    }
  }

  return generateSeoMetadata({
    title: data.title,
    description: data.excerpt,
    imageURL: data.mainImage?.asset?.url,
    author: data.author?.name,
  })
}

export function generateViewport(): Viewport {
  return generateSeoViewport()
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
    }) => (
      <a
        href={value?.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {children}
      </a>
    ),
  },
}

const BlogPost = async ({ params }: BlogPageParams) => {
  const { slug }: { slug: string } = await params

  const data = await getBlogPost(slug)

  if (!data) {
    throw new Error("Blog post not found")
  }

  const createdAt = new Date(data._createdAt).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <Layout>
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
                  alt={`Forfatteren av innlegget, ${data.author.name}`}
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
    </Layout>
  )
}

export default BlogPost
