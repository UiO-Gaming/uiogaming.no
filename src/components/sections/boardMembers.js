import * as React from "react"
import * as styles from "./boardMembers.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const BoardMembers = () => {
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

  return (
    <section>
      <h2>Styret</h2>
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
                  alt={`Bilde av styremedlem, ` + member.name}
                />
              </div>
              <div className={styles.info}>
                <h3>{member.name}</h3>
                <p>{member.role.no}</p>
              </div>
            </div>
            <p>{member.bio.no}</p>
            <div className={styles.footer}>
              <p className="text-center">
                {member.contactInfo ? (
                  member.contactInfo
                ) : (
                  <i>Ingen kontaktinfo</i>
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
