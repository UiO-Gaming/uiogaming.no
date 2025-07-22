import * as React from "react"
import * as styles from "./footer.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

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
              <a href="https://vedtekter.uiogaming.no" rel="noreferrer">
                Vedtekter
              </a>
            </li>
            <li>
              <a href="https://innmelding.uiogaming.no" rel="noreferrer">
                Bli medlem
              </a>
            </li>
            <li>
              <a href="https://klage.uiogaming.no" rel="noreferrer">
                Klage
              </a>
            </li>
            <li>
              <a
                href="https://github.com/UiO-Gaming/uiogaming.no/"
                rel="noreferrer"
              >
                Kildekode
              </a>
            </li>
            <li>
              <a href="https://admin.uiogaming.no" rel="noreferrer">
                Adminområdet
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.orgInfo}>
          <p>Org.Nr.: 925 719 153</p>
          <address>Slemdalsveien 15, 0369 Oslo</address>
        </div>
      </div>
    </footer>
  )
}

export default Footer
