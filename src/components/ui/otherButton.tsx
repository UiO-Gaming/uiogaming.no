"use client"

import { useState } from "react"

import * as styles from "./otherButton.module.css"

const OtherButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen(!isOpen)

  const links = [
    { url: "https://vedtekter.uiogaming.no", label: "Vedtekter" },
    { url: "https://klage.uiogaming.no", label: "Klage" },
    { url: "https://github.com/UiO-Gaming/dokumenter", label: "Dokumenter" },
  ]

  return (
    <div>
      <button onClick={toggleDropdown} className={styles.button}>
        Annet{" "}
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
