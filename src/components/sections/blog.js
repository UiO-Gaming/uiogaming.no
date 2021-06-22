import * as React from "react"
import * as styles from "./blog.module.css"

import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allSanityPost(limit: 3, sort: { fields: _createdAt, order: DESC }) {
        edges {
          node {
            _createdAt(formatString: "D. MMMM Y", locale: "nb_NO")
            slug {
              current
            }
            title
            excerpt
            author {
              name
              image {
                asset {
                  gatsbyImageData(width: 50, height: 50)
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <section>
      <h2>Bloggen</h2>
      <div className={styles.container}>
        {data.allSanityPost.edges.map(({ node: post }) => (
          <div className={styles.card}>
            <p className={styles.published}>
              <time>{post._createdAt}</time>
            </p>
            <h3 className={styles.header}>
              <Link
                to={"blog/" + post.slug.current}
                className={styles.link + " no-styling-link"}
              >
                {post.title}
              </Link>
            </h3>
            <p>{post.excerpt}</p>
            <div className={styles.author}>
              <GatsbyImage
                image={post.author.image.asset.gatsbyImageData}
                className={styles.authorImage}
                alt={"Forfatteren av innlegget, " + post.author.name}
              />
              <p>{post.author.name}</p>
            </div>
          </div>
        ))}
        <Link to="/blog" className={styles.allBlogPosts}>
          Se alle blogginnlegg
        </Link>
      </div>
    </section>
  )
}

export default Blog
