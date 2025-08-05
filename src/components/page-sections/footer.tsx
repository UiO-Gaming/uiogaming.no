import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"

import * as styles from "./footer.module.css"

const Footer = () => {
  const t = useTranslations("footer")
  const tCommon = useTranslations("common")
  const locale = useLocale()

  const statutesUrl =
    locale === "en"
      ? "https://statutes.uiogaming.no"
      : "https://vedtekter.uiogaming.no"

  return (
    <footer className={styles.container}>
      <div className={styles.footer}>
        <Image
          src="/logo_2024_neon_trans.png"
          alt="UiO Gaming logo"
          className={styles.logo}
          width={187}
          height={256}
        />
        <div className={styles.links}>
          <ul className="remove-bullets">
            <li>
              <a href={statutesUrl} rel="noreferrer">
                {tCommon("statutes")}
              </a>
            </li>
            <li>
              <a href="https://innmelding.uiogaming.no" rel="noreferrer">
                {tCommon("join")}
              </a>
            </li>
            <li>
              <a href="https://klage.uiogaming.no" rel="noreferrer">
                {tCommon("complaint")}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/UiO-Gaming/uiogaming.no/"
                rel="noreferrer"
              >
                {t("sourceCode")}
              </a>
            </li>
            <li>
              <a href="https://admin.uiogaming.no" rel="noreferrer">
                {t("admin")}
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.orgInfo}>
          <p>{t("orgNum")}: 925 719 153</p>
          <address>Slemdalsveien 15, 0369 Oslo</address>
        </div>
      </div>
    </footer>
  )
}

export default Footer
