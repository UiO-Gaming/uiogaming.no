import { getTranslations } from "next-intl/server"
import Link from "next/link"

import * as styles from "./notFound.module.css"

const NotFound = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale, namespace: "404" })

  return (
    <div className={styles.container}>
      <h1 className={styles.centeredText}>{t("title")}</h1>
      <p className={styles.centeredText}>
        {t("text")}{" "}
        <span role="img" aria-label="eyes">
          👀
        </span>
      </p>
      <Link
        href={`/${locale}`}
        className={`${styles.centeredText} ${styles.homeLink}`}
      >
        {t("back")}
      </Link>
    </div>
  )
}

export default NotFound
