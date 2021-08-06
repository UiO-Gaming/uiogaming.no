import * as React from "react"
import "../index.css"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

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
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
const BlogPage = ({ data }) => (
  <Layout>
    <Seo title="Blog" />
    <div className="container">
      {data.allSanityPost.edges.map(post => (
        <article>
          <p>{post.node._createdAt}</p>
          <Link to={post.node.slug.current}>
            <h2>{post.node.title}</h2>
          </Link>
          <div>
            <GatsbyImage image={post.node.author.image.asset.gatsbyImageData} />
            <p>{post.node.author.name}</p>
          </div>
          <p>{post.node.excerpt}</p>
        </article>
      ))}
    </div>
  </Layout>
)

export default BlogPage
