import { generateSeoMetadata } from "@/components/seo"
import Back from "@/components/ui/back"

import { formatEventDate } from "@/lib/dates"
import { getEvent } from "@/lib/sanity"

import { Metadata } from "next"
import type { Locale } from "next-intl"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"

import * as styles from "./page.module.css"

interface EventPageParams {
  params: Promise<{
    slug: string
    locale: Locale
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

  return generateSeoMetadata({
    locale,
    path: `/event/${slug}`,
    title: data.title,
    description: [
      `${t("time")}: ${formatEventDate(data.date, locale)}`,
      data.location && `${t("location")}: ${data.location}`,
      data.description && `\n${data.description}`,
    ]
      .filter(Boolean)
      .join("\n"),
  })
}

const Event = async ({ params }: EventPageParams) => {
  const { slug, locale } = await params

  const data = await getEvent(slug)

  if (!data) return notFound()

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
          <p>{formatEventDate(data.date, locale)}</p>
        </div>
        <p className={styles.description}>{data.description}</p>
      </div>
    </div>
  )
}

export default Event
