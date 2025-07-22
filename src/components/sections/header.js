import * as React from "react"
import * as styles from "./header.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholder: file(relativePath: { eq: "logo_2024_black_trans.png" }) {
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
      <p>
        En hobbyforening som ønsker å skape et sosialt miljø rundt gaming og
        e-sport på UiO
      </p>
    </header>
  )
}

export default Header
