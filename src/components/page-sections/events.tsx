import { formatEventDate } from "@/lib/dates"
import { getUpcomingEvents } from "@/lib/sanity"

import { getLocale, getTranslations } from "next-intl/server"
import Image from "next/image"
import Link from "next/link"
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"

import * as styles from "./events.module.css"

interface Event {
  _id: string
  title: string
  location: string
  date: string
  slug: {
    current: string
  }
  description: string | null
}

const DESCRIPTION_PREVIEW_LENGTH = 70

const Events = async () => {
  const t = await getTranslations("events")
  const tCommon = await getTranslations("common")
  const locale = await getLocale()

  const events: Event[] = await getUpcomingEvents(2)

  const previewDescription = (description: string | null) => {
    if (!description) return null

    // Count graphemes so emoji and accented characters are never cut in half
    const graphemes = Array.from(new Intl.Segmenter().segment(description))
    if (graphemes.length <= DESCRIPTION_PREVIEW_LENGTH) return description

    const preview = graphemes
      .slice(0, DESCRIPTION_PREVIEW_LENGTH)
      .map(({ segment }) => segment)
      .join("")
      .trimEnd()

    return (
      <>
        {preview}... <span className={styles.readMore}>{t("readMore")}</span>
      </>
    )
  }

  const mapEvents = (events: Event[]) => {
    if (events.length !== 0) {
      return events.map((event: Event) => (
        <Link key={event._id} href={`/${locale}/event/${event.slug.current}`}>
          <article className={styles.card}>
            <h3>{event.title}</h3>
            <div>
              <div className={styles.metadata}>
                <FaMapMarkerAlt />
                <p>{event.location}</p>
              </div>
              <div className={styles.metadata}>
                <FaCalendarAlt />
                <p>{formatEventDate(event.date, locale)}</p>
              </div>
            </div>
            <p>{previewDescription(event.description)}</p>
          </article>
        </Link>
      ))
    } else {
      return (
        <h3 className={styles.noEvents}>
          {t("noEvents")}
          <br />
          <br />
          (っ˘̩╭╮˘̩)っ
        </h3>
      )
    }
  }

  return (
    <section id="events">
      <div className={styles.container}>
        <h2 className={styles.sectionHeader}>{t("title")}</h2>
        <div className={styles.events}>{mapEvents(events)}</div>
        <div className={"no-mobile " + styles.image}>
          <Image
            src="/event.jpg"
            width={850}
            height={480}
            style={{ borderRadius: "1rem", objectFit: "cover", height: "100%" }}
            alt={t("imageAlt")}
          />
          <p className="photo-credit">
            {tCommon("photo")}: 장태민, Studentenes Fotoklubb
          </p>
        </div>
      </div>
    </section>
  )
}

export default Events
