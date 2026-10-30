import { generateSeoMetadata, generateSeoViewport } from "@/components/seo"
import Back from "@/components/ui/back"

import { getEvent } from "@/lib/sanity"

import { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"

import * as styles from "./page.module.css"

interface EventPageParams {
  params: Promise<{
    slug: string
    locale: string
  }>
}

// Render events on first visit and cache them, instead of on every request
export async function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: EventPageParams): Promise<Metadata> {
  const { slug, locale } = await params
  const data = await getEvent(slug)

  if (!data) notFound()

  const t = await getTranslations({ locale, namespace: "metaTags" })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Europe/Oslo",
    }
    return date.toLocaleString(locale, options)
  }

  return generateSeoMetadata({
    locale,
    title: data.title,
    description: `${t("time")}: ${formatDate(data.date)}\n${t("location")}: ${data.location}\n\n${data.description}`,
  })
}

export function generateViewport(): Viewport {
  return generateSeoViewport()
}

const Event = async ({ params }: EventPageParams) => {
  const { slug, locale } = await params

  const data = await getEvent(slug)

  if (!data) return notFound()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Europe/Oslo",
    }

    return date.toLocaleString(locale, options)
  }

  return (
    <div className={styles.container}>
      <Back />
      <div className={styles.event}>
        <h1>{data.title}</h1>
        <div className={styles.metadata}>
          <FaMapMarkerAlt />
          <p>{data.location}</p>
        </div>
        <div className={styles.metadata}>
          <FaCalendarAlt />
          <p>{formatDate(data.date)}</p>
        </div>
        <p className={styles.description}>{data.description}</p>
      </div>
    </div>
  )
}

export default Event
