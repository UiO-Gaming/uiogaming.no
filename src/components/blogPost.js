import * as React from "react"
import * as styles from "./blogPost.module.css"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import PortableText from "@sanity/block-content-to-react"
import urlBuilder from "@sanity/image-url"

export const query = graphql`
  query($id: String!) {
    sanityPost(_id: { eq: $id }) {
      _createdAt(formatString: "DD. MMMM, YYYY", locale: "nb_NO")
      title
      author {
        name
        image {
          asset {
            gatsbyImageData(width: 64, height: 64)
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
      body {
        children {
          _key
          _type
          text
          marks
        }
        _type
        list
        style
      }
    }
  }
`

const urlFor = source =>
  urlBuilder({ projectId: "mmqlu667", dataset: "production" }).image(source)

const serializer = {
  types: {
    mainImage: props => (
      <figure>
        <img src={urlFor(props.node.asset).width(600).url()} />

        <figcaption>{props.node.caption}</figcaption>
      </figure>
    ),
  },
}

const BlogPost = ({ data }) => {
  return (
    <>
      <Seo
        title={data.sanityPost.title}
        image={data.sanityPost.mainImage.asset.url}
        description={data.sanityPost.excerpt}
        author={data.sanityPost.author.name}
      />
      <div className={styles.container}>
        <article>
          <header>
            <p className={styles.published}>{data.sanityPost._createdAt}</p>
            <GatsbyImage
              image={data.sanityPost.mainImage.asset.gatsbyImageData}
              className={styles.headerImage}
            />
            <h1>{data.sanityPost.title}</h1>
            <p>{data.sanityPost.excerpt}</p>
            <div className={styles.author}>
              <GatsbyImage
                image={data.sanityPost.author.image.asset.gatsbyImageData}
              />
              <p>{data.sanityPost.author.name}</p>
            </div>
          </header>
          <div className={styles.content}>
            <PortableText
              blocks={data.sanityPost.body}
              serializer={serializer}
            />
          </div>
        </article>
      </div>
    </>
  )
}

export default BlogPost
