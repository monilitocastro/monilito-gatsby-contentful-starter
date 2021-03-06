

const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    query MySlugQuery {
        allContentfulBlogPost {
            edges {
                node {
                    slug
                    internal {
                      type
                    }
                }
            }
        }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create blog post pages.
  const posts = result.data.allContentfulBlogPost.edges
  // you'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
      console.log("NODE", node)
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: `/contentfulblog/${node.slug}`,
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/posts-page-layout.js`),
      // You can use the values in this context in
      // our page layout component
      context: { slug: node.slug },
    })
  })
}