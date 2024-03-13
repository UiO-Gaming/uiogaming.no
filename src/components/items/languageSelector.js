import * as React from "react"
import * as styles from "./languageSelector.module.css"

import { NO, GB } from "country-flag-icons/react/3x2"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"

const LanguageSelector = () => {
  const { languages, changeLanguage } = useI18next()
  const { t, i18n } = useTranslation()

  if (i18n.language === "no") {
    return (
      <a
        className={styles.button}
        href="#"
        onClick={e => {
          e.preventDefault()
          changeLanguage("en")
        }}
      >
        <GB className={styles.flag} title={t("altText.flag")} />
        English
      </a>
    )
  } else {
    return (
      <a
        className={styles.button}
        href="#"
        onClick={e => {
          e.preventDefault()
          changeLanguage("no")
        }}
      >
        <NO className={styles.flag} title={t("altText.flag")} />
        Norsk
      </a>
    )
  }
}

export default LanguageSelector
