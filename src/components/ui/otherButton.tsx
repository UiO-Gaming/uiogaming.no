"use client"

import { useEffect, useId, useRef, useState } from "react"

import { useLocale, useTranslations } from "next-intl"
import * as styles from "./otherButton.module.css"

const OtherButton = () => {
  const t = useTranslations("about")
  const tCommon = useTranslations("common")
  const locale = useLocale()

  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen(open => !open)

  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownId = useId()

  // Close when clicking outside the dropdown or pressing Escape
  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

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
    <div
      ref={containerRef}
      className={styles.dropdownContainer}
      // Close when keyboard focus moves out of the dropdown
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false)
        }
      }}
    >
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={styles.button}
        aria-expanded={isOpen}
        aria-controls={dropdownId}
      >
        {t("other")}{" "}
        <span
          className={isOpen ? styles.arrowUp : styles.arrowDown}
          aria-hidden="true"
        ></span>
      </button>
      {isOpen && (
        <div id={dropdownId} className={styles.dropdown}>
          {links.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.dropdownLink}
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
