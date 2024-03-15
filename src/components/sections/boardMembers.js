import * as React from "react"
import * as styles from "./boardMembers.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"

const BoardMembers = () => {
  const { t, i18n } = useTranslation();
  const { language } = useI18next(); 
  const data = useStaticQuery(graphql`
    query {
      allSanityAuthor(
        filter: { boardMember: { eq: true } }
        sort: { orderRank: ASC }
      ) {
        edges {
          node {
            _id
            boardMember
            contactInfo
            name
            role {
              no
              en
            }
            image {
              asset {
                gatsbyImageData(width: 256, height: 256)
              }
            }
            bio {
              no
              en
            }
          }
        }
      }
    }
  `)

  console.log(data)

  return (
    <section>
      <h2>{t("boardMembers.title")}</h2>
      <div className={styles.container}>
        {data.allSanityAuthor.edges.map(({ node: member }) => (
          <article key={member._id} className={styles.card}>
            <div className={styles.header}>
              <div
                className={`circular-container ${styles.headerImageContainer}`}
              >
                <GatsbyImage
                  image={member.image.asset.gatsbyImageData}
                  className="circular"
                  alt={`${t("altText.boardMember")}, ` + member.name}
                />
              </div>
              <div className={styles.info}>
                <h3>{member.name}</h3>
                <p>{member.role[language]}</p>
              </div>
            </div>
            <p>{member.bio[language]}</p>
            <div className={styles.footer}>
              <p className="text-center">
                {member.contactInfo ? (
                  member.contactInfo
                ) : (
                  <i>{t("boardMembers.noContact")}</i>
                )}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BoardMembers
