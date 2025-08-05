"use client"

import { useTranslations } from "next-intl"
import { FaArrowLeft } from "react-icons/fa"

import * as styles from "./back.module.css"

const Back = () => {
  const t = useTranslations("buttons")

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
      <p>{t("back")}</p>
    </button>
  )
}

export default Back
