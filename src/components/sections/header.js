import * as React from "react"
import * as styles from "./header.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholder: file(relativePath: { eq: "logo.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            transformOptions: { fit: CONTAIN }
            width: 256
          )
        }
      }
    }
  `)

  const { t } = useTranslation()

  return (
    <header id="hjem" className={styles.container}>
      <GatsbyImage
        image={data.placeholder.childImageSharp.gatsbyImageData}
        alt="UiO Gaming logo"
      />

      <h1>UiO Gaming</h1>
      <p>{t("header.text")}</p>
    </header>
  )
}

export default Header
