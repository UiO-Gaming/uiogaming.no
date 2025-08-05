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
      </div>
    </section>
  )
}

export default Office
