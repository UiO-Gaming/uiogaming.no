"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
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
        <div className={styles.panoramaContainer}>
          <ReactPhotoSphereViewer
            width={"100%"}
            height={"100%"}
            src="/3D_office_2025_08_20.jpg"
            defaultZoomLvl={0}
            navbar={true}
          />
        </div>
        <Image
          src="/pc_room.jpg"
          alt={t("pcRoomImageAlt")}
          className={styles.pcRoomImage}
          width={666}
          height={500}
        />
        <iframe
          width={"100%"}
          className={styles.map}
          src="https://use.mazemap.com/embed.html#v=1&config=uio&zlevel=3&center=10.712463,59.932424&zoom=17&campusid=797&sharepoitype=poi&sharepoi=1000986035&utm_medium=iframe"
          allow="geolocation"
          title="Map by MazeMap"
        ></iframe>
      </div>
    </section>
  )
}

export default Office
