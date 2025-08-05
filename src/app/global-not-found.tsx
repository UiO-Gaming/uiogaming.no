import Layout from "@/app/layout"

import { generateSeoMetadata, generateSeoViewport } from "@/components/seo"

import { Metadata, Viewport } from "next"
import { useTranslations } from "next-intl"
import Link from "next/link"

import * as styles from "./global-not-found.module.css"

export function generateMetadata(): Metadata {
  return generateSeoMetadata({
    title: "404: Ikke funnet",
    description: "Uh oh :(",
  })
}

export function generateViewport(): Viewport {
  return generateSeoViewport()
}

const NotFoundPage = () => {
  const t = useTranslations("404")

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.centeredText}>{t("title")}</h1>
        <p className={styles.centeredText}>
          {t("text")}{" "}
          <span role="img" aria-label="eyes">
            👀
          </span>
        </p>
        <Link href="/" className={`${styles.centeredText} ${styles.homeLink}`}>
          {t("back")}
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
