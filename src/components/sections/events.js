import * as React from "react"
import * as styles from "./events.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"

const Events = () => {
  const data = useStaticQuery(graphql`
    query {
      eventImage: file(relativePath: { eq: "event.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            transformOptions: { fit: COVER }
            width: 650
          )
        }
      }
      allSanityEvent(sort: { date: ASC }) {
        edges {
          node {
            _id
            title
            location
            date
            slug {
              current
            }
            description
          }
        }
      }
    }
  `)

  const currentDate = new Date()
  const filteredEvents = data.allSanityEvent.edges
    .filter(({ node: event }) => {
      return currentDate <= new Date(event.date)
    })
    .slice(0, 2)

  const mapEvents = events => {
    if (events.length !== 0) {
      return events.map(({ node: event }) => (
        <Link key={event._id} to={"/event/" + event.slug.current}>
          <article className={styles.card}>
            <h3>{event.title}</h3>
            <div>
              <div className={styles.metadata}>
                <FaMapMarkerAlt />
                <p>{event.location}</p>
              </div>
              <div className={styles.metadata}>
                <FaCalendarAlt />
                <p>
                  {new Date(event.date).toLocaleString("no", {
                    weekday: "long",
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "Europe/Oslo",
                  })}
                </p>
              </div>
            </div>
            <p>
              {event.description.length < 120 ? (
                event.description
              ) : (
                <>
                  {event.description.substring(0, 120)}...{" "}
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
    <section className={styles.stretch}>
      <div className={styles.container}>
        <h2 className={styles.sectionHeader}>Hva skjer?</h2>
        <div className={styles.events}>{mapEvents(filteredEvents)}</div>
        <div className={"no-mobile " + styles.image}>
          <GatsbyImage
            image={data.eventImage.childImageSharp.gatsbyImageData}
            alt="Medlemmer spiller brettspill"
          />
          <div>
            <p className="photo-credit">Foto: 장태민, Studentenes Fotoklubb</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events
