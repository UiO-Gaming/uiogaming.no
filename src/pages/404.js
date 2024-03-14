import * as React from "react"
import * as styles from "./404.module.css"

import { graphql } from "gatsby"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => {
  const { t, i18n } = useTranslation()

  return (
    <Layout>
      <Seo title="404: Not found" description="Uh oh :(" lang={i18n.language} />
      <div className={styles.container}>
        <h1 className={styles.centeredText}>{t("title")}</h1>
        <p className={styles.centeredText}>
          {t("text")}{" "}
          <span role="img" aria-label="eyes">
            👀
          </span>
        </p>
        <Link to="/" className={`${styles.centeredText} ${styles.homeLink}`}>
          {t("back")}
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["404", "seo"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
