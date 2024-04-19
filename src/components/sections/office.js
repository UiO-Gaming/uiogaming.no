import * as React from "react"
import * as styles from "./office.module.css"

import ReactPannellum from "react-pannellum"
import { useTranslation } from "gatsby-plugin-react-i18next"

const config = {
  autoLoad: true,
}

const Office = () => {
  const { t } = useTranslation()

  return (
    <section>
      <h2>{t("office.title")}</h2>
      <div className={styles.container}>
        <p>{t("office.text")}</p>
        <p>{t("office.tip")}</p>
        <ReactPannellum
          id="1"
          sceneId="office"
          config={config}
          imageSource="/3D_office_2024_04_18.jpg"
          style={{ width: "100%", aspectRatio: "1 / 1", background: "#000000" }} // yes, apparantly applying a css class to the component doesn't work
        />
      </div>
    </section>
  )
}

export default Office
