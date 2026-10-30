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
    <div className={styles.dropdownContainer}>
      <button onClick={toggleDropdown} className={styles.button}>
        {t("other")}{" "}
        <span className={isOpen ? styles.arrowUp : styles.arrowDown}></span>
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {links.map((link, index) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.dropdownLink}
              style={{ marginTop: index === 0 ? "8px" : "4px" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default OtherButton
