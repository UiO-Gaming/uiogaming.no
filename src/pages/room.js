import * as React from "react"
import * as styles from "./room.module.css"

import Layout from "../components/layout"
import Seo from "../components/seo"

const RoomPage = () => (
  <Layout>
    <Seo
      title="Foreningsrom"
      description="Kalender og booking av foreningsrom"
    />
    <div className={styles.container}>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23D50000&ctz=Europe%2FBerlin&showPrint=0&showTabs=1&showCalendars=0&showTz=1&mode=WEEK&showTitle=0&title=Rombooking&src=N2YxM2IzYWIyNDA3NTEyZGU3ZDk2MTdhZmNkZmI2ZjFmZjg1YzU3N2QwODNjZGIxNzA3MWRiNTdlMmQ3ZDM1NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233F51B5"
        width="800"
        height="600"
        frameborder="0"
        scrolling="no"
      ></iframe>
      <a
        href="https://forms.gle/1aj4yKXpbb788sWo8"
        target="_blank"
        rel="noreferrer"
        className={styles.button}
      >
        Book rommet
      </a>
    </div>
  </Layout>
)

export default RoomPage
