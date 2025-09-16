"use client"

import { GB, NO } from "country-flag-icons/react/3x2"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"

import * as styles from "./languageSelector.module.css"

const LanguageSelector = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const changeLocale = (newLocale: "no" | "en") => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "")
    router.push(`/${newLocale}${pathWithoutLocale}`)
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
