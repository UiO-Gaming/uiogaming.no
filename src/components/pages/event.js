import * as React from "react"
import * as styles from "./event.module.css"
import Seo from "../seo"
import { graphql } from "gatsby"
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"
import Back from "../items/back"

export const query = graphql`
  query($id: String!) {
    sanityEvent(_id: { eq: $id }) {
      _createdAt(formatString: "DD. MMMM, YYYY", locale: "nb_NO")
      title
      location
      date(locale: "nb_NO", formatString: "dddd D. MMM Y")
      slug {
        current
      }
      description
    }
  }
`

const Event = ({ data }) => {
  return (
    <>
      <Seo
        title={data.sanityEvent.title}
        description={`Tidspunkt: ${data.sanityEvent.date}\nSted: ${data.sanityEvent.location}\n\n${data.sanityEvent.description}`}
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
            <p>{data.sanityEvent.date}</p>
          </div>
          <p className={styles.description}>{data.sanityEvent.description}</p>
        </div>
      </div>
    </>
  )
}

export default Event
