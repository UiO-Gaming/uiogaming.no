"use client"

import { useTranslations } from "next-intl"
import { FaArrowLeft } from "react-icons/fa"

import { useRouter } from "@/i18n/navigation"

import * as styles from "./back.module.css"

// document.referrer only reflects the last full page load, so it misses
// client-side navigations within the site. Only used where the Navigation
// API isn't supported
const cameFromThisSite = () =>
  document.referrer !== "" &&
  new URL(document.referrer).origin === window.location.origin

const Back = () => {
  const router = useRouter()
  const t = useTranslations("buttons")

  const handleBack = () => {
    // The Navigation API only lists this site's own history entries, so
    // canGoBack is true exactly when the previous page was on this site
    const canGoBack = window.navigation?.canGoBack ?? cameFromThisSite()

    if (canGoBack) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <button
      className={`${styles.container} ${styles.button}`}
      onClick={handleBack}
    >
      <FaArrowLeft />
      <span>{t("back")}</span>
    </button>
  )
}

export default Back
