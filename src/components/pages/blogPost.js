import * as React from "react"
import * as styles from "./blogPost.module.css"
import Seo from "../seo"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import BlockContent from "@sanity/block-content-to-react"
import Back from "../items/back"

export const query = graphql`
  query($id: String!) {
    sanityPost(_id: { eq: $id }) {
      _createdAt(formatString: "DD. MMMM, YYYY", locale: "nb_NO")
      title
      author {
        name
        image {
          asset {
            gatsbyImageData(width: 50, height: 50)
          }
        }
      }
      mainImage {
        asset {
          url
          gatsbyImageData
        }
      }
      excerpt
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`

const BlogPost = ({ data }) => {
  return (
    <>
      <Seo
        title={data.sanityPost.title}
        imageURL={data.sanityPost.mainImage.asset.url}
        description={data.sanityPost.excerpt}
        author={data.sanityPost.author.name}
      />
      <div className={styles.container}>
        <div className={styles.backButton}>
          <Back />
        </div>
        <article className={styles.article}>
          <header className={styles.header}>
            <GatsbyImage
              image={data.sanityPost.mainImage.asset.gatsbyImageData}
              className={styles.headerImage}
            />
            <h1 className={styles.title}>{data.sanityPost.title}</h1>
            <p className={styles.excerpt}>{data.sanityPost.excerpt}</p>
            <div className={styles.author}>
              <GatsbyImage
                className="circular"
                image={data.sanityPost.author.image.asset.gatsbyImageData}
              />
              <div className={styles.authorNameSection}>
                <p>{data.sanityPost.author.name}</p>
                <p>{data.sanityPost._createdAt}</p>
              </div>
            </div>
          </header>
          <BlockContent
            className={styles.content}
            blocks={data.sanityPost._rawBody}
          />
        </article>
      </div>
    </>
  )
}

export default BlogPost
