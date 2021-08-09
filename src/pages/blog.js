import * as React from "react"
import * as styles from "./blog.module.css"

import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Back from "../components/items/back"

export const query = graphql`
  query {
    allSanityPost {
      edges {
        node {
          title
          _createdAt(formatString: "DD. MMMM, YYYY", locale: "nb_NO")
          _id
          slug {
            current
          }
          excerpt
          author {
            name
            image {
              asset {
                gatsbyImageData(width: 40, height: 40)
              }
            }
          }
          mainImage {
            asset {
              gatsbyImageData(aspectRatio: 1.618)
            }
          }
        }
      }
    }
  }
`
const BlogPage = ({ data }) => (
  <Layout>
    <Seo
      title="Blog"
      description="Nyheter om hva som skjer i foreningen og skriverier om alt og ingenting"
    />
    <div className={styles.container}>
      <div className={styles.back}>
        <Back />
      </div>
      <div className={styles.articleContainer}>
        {data.allSanityPost.edges.map(post => (
          <Link to={post.node.slug.current} className={styles.link}>
            <article className={styles.card}>
              <GatsbyImage
                image={post.node.mainImage.asset.gatsbyImageData}
                className={styles.headerImage}
              />
              <div className={styles.cardContent}>
                <h2 className={styles.header}>{post.node.title}</h2>
                <p className={styles.published}>{post.node._createdAt}</p>
                <div className={styles.author}>
                  <GatsbyImage
                    className={`circular ${styles.authorImage}`}
                    alt={"Forfatteren av innlegget, " + post.node.author.name}
                    image={post.node.author.image.asset.gatsbyImageData}
                  />
                  <p>{post.node.author.name}</p>
                </div>
                <p>{post.node.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  </Layout>
)

export default BlogPage
