"use client"

import { FaArrowLeft } from "react-icons/fa"

import * as styles from "./back.module.css"

const Back = () => {
  const handleBack = () => {
    const currentDomain = window.location.hostname
    const referrer = document.referrer

    const isSameDomain =
      referrer && new URL(referrer).hostname === currentDomain

    if (window.history.length > 1 && isSameDomain) {
      window.history.back()
    } else {
      window.location.href = "/"
    }
  }

  return (
    <button
      className={`${styles.container} ${styles.button}`}
      onClick={handleBack}
    >
      <FaArrowLeft />
      <p>Tilbake</p>
    </button>
  )
}

export default Back
