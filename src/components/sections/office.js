import * as React from "react"
import * as styles from "./office.module.css"

import ReactPannellum from "react-pannellum"

const config = {
  autoLoad: true,
}

const Office = () => (
  <section>
    <h2>Kontoret</h2>
    <div className={styles.container}>
      <p>
        Vi har et foreningskontor på Chateau Neuf der man kan bruke utstyret
        vårt og henge med andre medlemmer!
      </p>

      <ReactPannellum
        id="1"
        sceneId="office"
        config={config}
        imageSource="/3D_office_2023_09_15.jpg"
        style={{ width: "100%", aspectRatio: "1 / 1", background: "#000000" }} // yes, apparantly applying a css class to the component doesn't work
      />
    </div>
  </section>
)

export default Office
