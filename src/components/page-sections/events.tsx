import { getAllEvents } from "@/lib/sanity"

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
  description: string
}

const Events = async () => {
  const data: Event[] = await getAllEvents()

  const currentDate = new Date()
  const filteredEvents = data
    .filter((event: Event) => {
      return currentDate <= new Date(event.date)
    })
    .slice(0, 2)

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

  const mapEvents = (events: Event[]) => {
    if (events.length !== 0) {
      return events.map((event: Event) => (
        <Link key={event._id} href={"/event/" + event.slug.current}>
          <article className={styles.card}>
            <h3>{event.title}</h3>
            <div>
              <div className={styles.metadata}>
                <FaMapMarkerAlt />
                <p>{event.location}</p>
              </div>
              <div className={styles.metadata}>
                <FaCalendarAlt />
                <p>{formatDate(event.date)}</p>
              </div>
            </div>
            <p>
              {event.description.length < 70 ? (
                event.description
              ) : (
                <>
                  {event.description.substring(0, 70)}...{" "}
                  <span className={styles.readMore}>Les mer</span>
                </>
              )}
            </p>
          </article>
        </Link>
      ))
    } else {
      return <h3 className={styles.noEvents}>Ingen kommende arrangementer</h3>
    }
  }

  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.sectionHeader}>Hva skjer?</h2>
        <div className={styles.events}>{mapEvents(filteredEvents)}</div>
        <div className={"no-mobile " + styles.image}>
          <Image
            src="/event.jpg"
            width={850}
            height={480}
            style={{ borderRadius: "1rem", objectFit: "cover", height: "100%" }}
            alt="Medlemmer spiller brettspill"
          />
          <p className="photo-credit">Foto: 장태민, Studentenes Fotoklubb</p>
        </div>
      </div>
    </section>
  )
}

export default Events
