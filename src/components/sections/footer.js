import * as React from "react"
import * as styles from "./footer.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo_2024_neon_trans.png" }) {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            transformOptions: { fit: COVER }
            width: 256
          )
        }
      }
    }
  `)

  const { t, i18n } = useTranslation()

  const statutesUrl =
    i18n.language === "en"
      ? "https://statutes.uiogaming.no"
      : "https://vedtekter.uiogaming.no"

  return (
    <footer>
      <div className={styles.footer}>
        <div>
          <GatsbyImage
            image={data.logo.childImageSharp.gatsbyImageData}
            alt="UiO Gaming logo"
          />
        </div>
        <div className={styles.links}>
          <ul className="remove-bullets">
            <li>
              <a href={statutesUrl} rel="noreferrer">
                {t("footer.statutes")}
              </a>
            </li>
            <li>
              <a href="https://innmelding.uiogaming.no" rel="noreferrer">
                {t("join")}
              </a>
            </li>
            <li>
              <a href="https://klage.uiogaming.no" rel="noreferrer">
                {t("footer.complaints")}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/UiO-Gaming/uiogaming.no/"
                rel="noreferrer"
              >
                {t("footer.sourcecode")}
              </a>
            </li>
            <li>
              <a href="https://admin.uiogaming.no" rel="noreferrer">
                {t("footer.admin")}
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.orgInfo}>
          <p>{t("footer.orgnum")}: 925 719 153</p>
          <address>Slemdalsveien 15, 0369 Oslo</address>
        </div>
      </div>
    </footer>
  )
}

export default Footer
