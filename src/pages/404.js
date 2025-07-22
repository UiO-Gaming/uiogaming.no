import * as React from "react"
import * as styles from "./404.module.css"

import { graphql } from "gatsby"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => {
  return (
    <Layout>
      <Seo title="404: Ikke funnet" description="Uh oh :(" lang="no" />
      <div className={styles.container}>
        <h1 className={styles.centeredText}>404: Siden ble ikke funnet</h1>
        <p className={styles.centeredText}>
          Reisen vår endte her. Vennligst ikke forlat oss
          <span role="img" aria-label="eyes">
            👀
          </span>
        </p>
        <Link to="/" className={`${styles.centeredText} ${styles.homeLink}`}>
          Tilbake til trygg grunn
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
