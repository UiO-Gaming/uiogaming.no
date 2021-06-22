const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/components/blogPost.js")
  const result = await graphql(`
    query {
      allSanityPost {
        nodes {
          _id
          slug {
            current
          }
        }
      }
    }
  `)

  const posts = result.data.allSanityPost.nodes

  posts.forEach(post => {
    const path = `/blog/${post.slug.current}`
    createPage({
      path,
      component: blogTemplate,
      context: {
        id: post._id,
      },
    })
  })
}
