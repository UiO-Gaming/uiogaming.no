import * as React from "react"
import * as styles from "./back.module.css"

import { graphql } from "gatsby"

import { FaArrowLeft } from "react-icons/fa"

const Back = () => {
  return (
    <button
      className={`${styles.container} ${styles.button}`}
      onClick={() => window.history.back()}
    >
      <FaArrowLeft />
      <p>Tilbake</p>
    </button>
  )
}

export default Back
