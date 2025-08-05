"use client"

import { useState } from "react"

import { useLocale, useTranslations } from "next-intl"
import * as styles from "./otherButton.module.css"

const OtherButton = () => {
  const t = useTranslations("about")
  const tCommon = useTranslations("common")
  const locale = useLocale()

  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen(!isOpen)

  const statutesUrl =
    locale === "en"
      ? "https://statutes.uiogaming.no"
      : "https://vedtekter.uiogaming.no"

  const links = [
    { url: statutesUrl, label: tCommon("statutes") },
    { url: "https://klage.uiogaming.no", label: tCommon("complaint") },
    {
      url: "https://github.com/UiO-Gaming/dokumenter",
      label: tCommon("documents"),
    },
  ]

  return (
    <div>
      <button onClick={toggleDropdown} className={styles.button}>
        {t("other")}{" "}
        <span className={isOpen ? styles.arrowUp : styles.arrowDown}></span>
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => window.open(link.url, "_blank")}
              className={styles.dropdownButton}
              style={{ marginTop: index === 0 ? "8px" : "4px" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default OtherButton
