"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer"

import * as styles from "./office.module.css"

const Office = () => {
  const t = useTranslations("office")
  const [supportsWebGL2, setSupportsWebGL2] = useState<boolean | null>(null)

  useEffect(() => {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl2")
    setSupportsWebGL2(Boolean(gl))
  }, [])

  return (
    <section id="office">
      <h2>{t("title")}</h2>
      <div className={styles.container}>
        <p>{t("text")}</p>
        <p>{t("tip")}</p>
        <div className={styles.panoramaContainer}>
          {supportsWebGL2 === true ? (
            <ReactPhotoSphereViewer
              width={"100%"}
              height={"100%"}
              src="/3D_office_2025_08_20.jpg"
              defaultZoomLvl={0}
              navbar={true}
            />
          ) : (
            <Image
              src="/3D_office_2025_08_20.jpg"
              alt={t("title")}
              className={styles.panoramaFallback}
              width={1200}
              height={900}
            />
          )}
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
