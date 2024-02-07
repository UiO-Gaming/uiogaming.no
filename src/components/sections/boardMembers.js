import * as React from "react"
import * as styles from "./boardMembers.module.css"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const BoardMembers = () => {
  const data = useStaticQuery(graphql`
    query {
      allSanityAuthor(
        filter: { boardMember: { eq: true } }
        sort: { fields: order }
      ) {
        edges {
          node {
            _id
            boardMember
            email
            name
            role
            image {
              asset {
                gatsbyImageData(width: 256, height: 256)
              }
            }
            bio
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
                  alt={"Bilde av styemedlem, " + member.name}
                />
              </div>
              <div className={styles.info}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
            <p>{member.bio}</p>
            <div className={styles.footer}>
              <p className="text-center">{member.email ? member.email : <i>Ikke oppgitt</i>}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BoardMembers
