import * as React from "react"
import * as styles from "./office.module.css"

import ReactPannellum from "react-pannellum"

const config = {
  autoLoad: true,
}

const Office = () => {
  return (
    <section>
      <h2>Kontoret</h2>
      <div className={styles.container}>
        <p>
          Vi har et foreningskontor på Chateau Neuf der man kan bruke utstyret
          vårt og henge med andre medlemmer! Vi har blant annet alle de nyeste
          konsollene, 6 gaming-PCer samt et bredt utvalg av brettspill.
        </p>
        <p>
          Tips: Du kan kikke rundt i kontoret ved å klikke og dra på bildet
          nedenfor 👀
        </p>
        <ReactPannellum
          id="1"
          sceneId="office"
          config={config}
          imageSource="/3D_office_2024_11_03.jpg"
          style={{ width: "100%", aspectRatio: "1 / 1", background: "#000000" }}
        />
      </div>
    </section>
  )
}

export default Office
