import Layout from "@/app/layout"

import { generateSeoMetadata, generateSeoViewport } from "@/components/seo"

import { Metadata, Viewport } from "next"
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
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.centeredText}>404: Siden ble ikke funnet</h1>
        <p className={styles.centeredText}>
          Reisen vår endte her. Vennligst ikke forlat oss
          <span role="img" aria-label="eyes">
            👀
          </span>
        </p>
        <Link href="/" className={`${styles.centeredText} ${styles.homeLink}`}>
          Tilbake til trygg grunn
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
