import * as React from "react"
import * as styles from "./events.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"
import moment from "moment-timezone"
import "moment/locale/nb"

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

  const { t, i18n } = useTranslation()

  moment.locale(i18n.language)
  const currentDate = moment().utc()

  const filteredEvents = data.allSanityEvent.edges
    .filter(({ node: event }) => {
      return currentDate <= moment.utc(event.date)
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
                  {moment(event.date)
                    .tz("Europe/Oslo")
                    .format("dddd Do MMMM, H:mm")}
                </p>
              </div>
            </div>
            <p>
              {event.description.length < 120 ? (
                event.description
              ) : (
                <>
                  {event.description.substring(0, 120)}...{" "}
                  <span className={styles.readMore}>
                    {t("events.readMore")}
                  </span>
                </>
              )}
            </p>
          </article>
        </Link>
      ))
    } else {
      return (
        <h3 className={styles.noEvents}>
          {t("events.noEvents")}
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
        <h2 className={styles.sectionHeader}>{t("events.title")}</h2>
        <div className={styles.events}>{mapEvents(filteredEvents)}</div>
        <div className={"no-mobile " + styles.image}>
          <GatsbyImage
            image={data.eventImage.childImageSharp.gatsbyImageData}
            alt={t("altText.events")}
          />
          <div>
            <p className="photo-credit">
              {t("photo")}: 장태민, Studentenes Fotoklubb
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events
