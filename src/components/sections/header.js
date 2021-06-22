import * as React from "react"
import * as styles from "./header.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

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

  return (
    <header id="hjem" className={styles.container}>
      <GatsbyImage
        image={data.placeholder.childImageSharp.gatsbyImageData}
        alt="UiO Gaming logo"
      />

      <h1>UiO Gaming</h1>
      <p>
        En hobbyforening som ønsker skape et sosialt miljø rundt gaming og
        E-sport på UiO
      </p>
    </header>
  )
}

export default Header
