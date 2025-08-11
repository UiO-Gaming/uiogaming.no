"use client"

import { useTranslations } from "next-intl"
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer"

import * as styles from "./office.module.css"

const Office = () => {
  const t = useTranslations("office")

  return (
    <section>
      <h2>{t("title")}</h2>
      <div className={styles.container}>
        <p>{t("text")}</p>
        <p>{t("tip")}</p>
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
        <div style={{ width: "100%" }}>
          <iframe
            width="100%"
            height="500px"
            src="https://use.mazemap.com/embed.html#v=1&config=uio&zlevel=3&center=10.712463,59.932424&zoom=17&campusid=797&sharepoitype=poi&sharepoi=1000986035&utm_medium=iframe"
            allow="geolocation"
            title="Map by MazeMap"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default Office
