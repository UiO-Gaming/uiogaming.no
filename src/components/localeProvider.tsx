"use client"

import { GB, NO } from "country-flag-icons/react/3x2"
import { NextIntlClientProvider } from "next-intl"
import { ReactNode, useEffect, useState } from "react"

import * as styles from "./localeProvider.module.css"

type LocaleProviderProps = {
  locale: "no" | "en"
  messages: Record<string, string>
  children: ReactNode
}

export function LocaleProvider({
  locale: serverLocale,
  messages,
  children,
}: LocaleProviderProps) {
  const [locale, setLocale] = useState<"no" | "en">(serverLocale)
  const [loadedMessages, setLoadedMessages] =
    useState<Record<string, string>>(messages)

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )locale=([^;]+)/)
    const saved = match ? decodeURIComponent(match[1]) : null

    if (saved && saved !== locale) {
      setLocale(saved as "no" | "en")
      import(`../../messages/${saved}.json`).then(module => {
        setLoadedMessages(module.default)
      })
    }
  }, [locale])

  const changeLocale = (newLocale: "no" | "en") => {
    setLocale(newLocale)
    document.cookie = `locale=${encodeURIComponent(
      newLocale
    )}; path=/; max-age=31536000; SameSite=Lax`
    window.location.reload()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={loadedMessages}>
      {children}

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
    </NextIntlClientProvider>
  )
}
