"use client"

import { GB, NO } from "country-flag-icons/react/3x2"
import { type Locale, useLocale } from "next-intl"

import { usePathname, useRouter } from "@/i18n/navigation"

import * as styles from "./languageSelector.module.css"

const LanguageSelector = () => {
  const locale = useLocale()
  const router = useRouter()
  // Pathname without the locale prefix
  const pathname = usePathname()

  const changeLocale = (newLocale: Locale) => {
    // Read at click time, since useSearchParams() would opt pages out of
    // static rendering
    const { search, hash } = window.location
    router.push(`${pathname}${search}${hash}`, { locale: newLocale })
  }

  return (
    <div className={styles.languageSwitcher}>
      {locale === "no" ? (
        <button onClick={() => changeLocale("en")} className={styles.button}>
          <GB className={styles.flag} title="English flag" />
          English
        </button>
      ) : (
        <button onClick={() => changeLocale("no")} className={styles.button}>
          <NO className={styles.flag} title="Norwegian flag" />
          Norsk
        </button>
      )}
    </div>
  )
}

export default LanguageSelector
