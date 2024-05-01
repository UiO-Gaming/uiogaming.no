import * as React from "react"
import * as styles from "./about.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"

import DiscordButton from "../items/discordButton"
import MemberButton from "../items/memberButton"
import OtherButton from "../items/otherButton"

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      aboutImage: file(relativePath: { eq: "about.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            transformOptions: { fit: CONTAIN }
            width: 650
          )
        }
      }
    }
  `)

  const { t } = useTranslation()

  return (
    <section>
      <div className={styles.container}>
        <div className="no-mobile">
          <GatsbyImage
            image={data.aboutImage.childImageSharp.gatsbyImageData}
            alt={t("altText.about")}
          />
          <p className="photo-credit">
            {t("photo")}: 장태민, Studentenes Fotoklubb
          </p>
        </div>
        <div>
          <h2 className="left-section-header">{t("about.title")}</h2>
          <div>
            <p>{t("about.text")}</p>
            <div className={styles.joinSection}>
              <h3>{t("about.interested")}</h3>
              <div className={styles.buttons}>
                <MemberButton />
                <DiscordButton />
                <OtherButton /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
