import * as React from "react"
import * as styles from "./back.module.css"

import { graphql } from "gatsby"

import { FaArrowLeft } from "react-icons/fa"
import { useTranslation } from "gatsby-plugin-react-i18next"

const Back = () => {
  const { t } = useTranslation()

  return (
    <button
      className={`${styles.container} ${styles.button}`}
      onClick={() => window.history.back()}
    >
      <FaArrowLeft />
      <p>{t("back")}</p>
    </button>
  )
}

export default Back
