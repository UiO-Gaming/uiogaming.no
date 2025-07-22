import * as React from "react"
import * as styles from "./eventPost.module.css"

import { graphql } from "gatsby"
// Removed: import { useTranslation } from "gatsby-plugin-react-i18next"

import Seo from "../components/seo"
import Back from "../components/items/back"
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"

export const query = graphql`
  query ($id: String) {
    sanityEvent(_id: { eq: $id }) {
      title
      location
      date
      slug {
        current
      }
      description
    }
  }
`

const Event = ({ data }) => {
  const time = new Date(data.sanityEvent.date).toLocaleString("no", {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Europe/Oslo",
  })

  return (
    <>
      <Seo
        title={data.sanityEvent.title}
        description={`Tid: ${time}\nSted: ${data.sanityEvent.location}\n\n${data.sanityEvent.description}`}
        lang="no"
      />
      <div className={styles.container}>
        <Back />
        <div className={styles.event}>
          <h1>{data.sanityEvent.title}</h1>
          <div className={styles.metadata}>
            <FaMapMarkerAlt />
            <p>{data.sanityEvent.location}</p>
          </div>
          <div className={styles.metadata}>
            <FaCalendarAlt />
            <p>
              {new Date(data.sanityEvent.date).toLocaleString("no", {
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
          <p className={styles.description}>{data.sanityEvent.description}</p>
        </div>
      </div>
    </>
  )
}

export default Event
