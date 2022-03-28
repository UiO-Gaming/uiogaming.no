import * as React from "react"
import * as styles from "./events.module.css"

import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import moment from "moment-timezone"

import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"

const Events = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholder: file(relativePath: { eq: "event.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            transformOptions: { fit: COVER }
            width: 650
          )
        }
      }
      allSanityEvent(sort: { fields: date, order: ASC }) {
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

  moment.locale("nb_NO")
  const currentDate = moment().utc()

  const filteredEvents = data.allSanityEvent.edges
    .filter(({ node: event }) => {
      return currentDate <= moment.utc(event.date)
    })
    .slice(0, 2)

  const mapEvents = events => {
    if (events.length !== 0) {
      return events.map(({ node: event }) => (
        <Link key={event._id} to={"event/" + event.slug.current}>
          <article className={styles.card}>
            <h3>{event.title}</h3>
            <div>
              <div>
                <FaMapMarkerAlt />
                <p>{event.location}</p>
              </div>
              <div>
                <FaCalendarAlt />
                <p>
                  {moment(event.date)
                    .tz("Europe/Oslo")
                    .format("dddd Do MMMM, [kl.] H:mm")}
                </p>
              </div>
            </div>
            <p>{event.description}</p>
          </article>
        </Link>
      ))
    } else {
      return (
        <h3 className={styles.noEvents}>
          Ingen kommende arrangementer
          <br />
          <br />
          (っ˘̩╭╮˘̩)っ
        </h3>
      )
    }
  }

  return (
    <section className={styles.stretch}>
      <div className={styles.container}>
        <h2 className={styles.sectionHeader}>Hva skjer?</h2>
        <div className={styles.events}>{mapEvents(filteredEvents)}</div>
        <div className={"no-mobile " + styles.image}>
          <GatsbyImage
            image={data.placeholder.childImageSharp.gatsbyImageData}
            alt="Medlem som spiller VR"
          />
        </div>
      </div>
    </section>
  )
}

export default Events
