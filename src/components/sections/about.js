import * as React from "react"
import * as styles from "./about.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import DiscordButton from "../items/discordButton"
import MemberButton from "../items/memberButton"

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

  return (
    <section>
      <div className={styles.container}>
        <div className="no-mobile">
          <GatsbyImage
            image={data.aboutImage.childImageSharp.gatsbyImageData}
            alt="Medlemmer som spiller"
          />
          <p className="photo-credit">Foto: 장태민, Studentenes Fotoklubb</p>
        </div>
        <div>
          <h2 className="left-section-header">Hvem er vi?</h2>
          <div>
            <p>
              UiO Gaming er en forening med hovedfokus på å danne et
              inkluderende fellesskap rundt videospill og e-sport. Hos oss er
              det enkelt å skaffe seg venner, ettersom alle har felles
              interesser. Vi arrangerer ukentlige spillkvelder og fysiske
              sosiale arrangementer, som for eksempel brettspillkvelder og
              sosiale sammenkomster. Vår hovedkanal er en aktiv Discord-server
              hvor man kan møte nye folk med felles interesser og game med andre
              studenter.
            </p>
            <div className={styles.joinSection}>
              <h3>Interessert?</h3>
              <div className={styles.buttons}>
                <MemberButton />
                <DiscordButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
