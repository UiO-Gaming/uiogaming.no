import * as React from "react"
import * as styles from "./events.module.css"

import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import moment from "moment"

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
            date(locale: "nb_NO", formatString: "dddd D. MMM Y")
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

  return (
    <section className={styles.stretch}>
      <div className={styles.container}>
        <h2 className={styles.sectionHeader}>Hva skjer?</h2>
        <div className={styles.events}>
          {data.allSanityEvent.edges
            .filter(({ node: event }) => {
              const eventDate = event.date.split(" ").slice(1).join(" ")
              return currentDate < moment(eventDate, "D. MMM Y")
            })
            .slice(0, 2)
            .map(({ node: event }) => (
              <Link to={"event/" + event.slug.current}>
                <article key={event._id} className={styles.card}>
                  <h3>{event.title}</h3>
                  <div>
                    <div>
                      <FaMapMarkerAlt />
                      <p>{event.location}</p>
                    </div>
                    <div>
                      <FaCalendarAlt />
                      <p>{event.date}</p>
                    </div>
                  </div>
                  <p>{event.description}</p>
                </article>
              </Link>
            ))}
        </div>
        <div className={"no-mobile " + styles.image}>
          <GatsbyImage
            image={data.placeholder.childImageSharp.gatsbyImageData}
            alt="Medlemmer som spiller kubb"
          />
        </div>
      </div>
    </section>
  )
}

export default Events
