import * as React from "react"
import * as styles from "./404.module.css"

import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <div className={styles.container}>
      <h1 className={styles.centeredText}>404: Siden finnes ikke</h1>
      <p className={styles.centeredText}>
        Du har nådd en blindvei, men ikke på Blindern{" "}
        <span role="img" aria-label="eyes">
          👀
        </span>
      </p>
      <Link to="/" className={`${styles.centeredText} ${styles.homeLink}`}>
        Tilbake til hjemmesiden
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
