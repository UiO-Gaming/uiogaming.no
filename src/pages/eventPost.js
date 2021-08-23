import * as React from "react"
import * as styles from "./eventPost.module.css"

import { graphql } from "gatsby"
import moment from "moment-timezone"

import Seo from "../components/seo"
import Back from "../components/items/back"
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"

export const query = graphql`
  query($id: String) {
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
  const time = moment(data.sanityEvent.date)
    .tz("Europe/Oslo")
    .format("dddd Do MMMM, [kl.] H:mm")

  return (
    <>
      <Seo
        title={data.sanityEvent.title}
        description={`Tidspunkt: ${time}\nSted: ${data.sanityEvent.location}\n\n${data.sanityEvent.description}`}
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
              {moment(data.sanityEvent.date)
                .tz("Europe/Oslo")
                .format("dddd Do MMMM, [kl.] H:mm")}
            </p>
          </div>
          <p className={styles.description}>{data.sanityEvent.description}</p>
        </div>
      </div>
    </>
  )
}

export default Event
