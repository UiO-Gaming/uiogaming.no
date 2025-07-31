"use client"

import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer"

import * as styles from "./office.module.css"

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
        <div
          style={{
            width: "100%",
            height: "500px",
            background: "#000000",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <ReactPhotoSphereViewer
            src="/3D_office_2024_11_03.jpg"
            height="100%"
            width="100%"
            defaultZoomLvl={0}
            navbar={true}
          />
        </div>
      </div>
    </section>
  )
}

export default Office
