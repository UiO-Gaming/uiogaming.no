import { generateSeoMetadata, generateSeoViewport } from "@/components/seo"
import Back from "@/components/ui/back"

import { getEvent } from "@/lib/sanity"

import { Metadata, Viewport } from "next"
import { getLocale } from "next-intl/server"
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"

import * as styles from "./page.module.css"

interface EventPageParams {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: EventPageParams): Promise<Metadata> {
  const { slug } = await params
  const data = await getEvent(slug)

  if (!data) {
    return {
      title: "Event Not Found | UiO Gaming",
    }
  }

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
    return date.toLocaleString("no", options)
  }

  return generateSeoMetadata({
    title: data.title,
    description: `Tid: ${formatDate(data.date)}\nSted: ${data.location}\n\n${data.description}`,
  })
}

export function generateViewport(): Viewport {
  return generateSeoViewport()
}

const Event = async ({ params }: EventPageParams) => {
  const { slug }: { slug: string } = await params
  const locale = await getLocale()

  const data = await getEvent(slug)

  if (!data) {
    throw new Error("Event not found")
  }

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
