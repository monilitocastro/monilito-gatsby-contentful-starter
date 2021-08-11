// const { createFilePath } = require("gatsby-source-filesystem")

const path = require("path")

// const BlogPosts = require("./src/components/posts-page-layout").default;

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   // you only want to operate on `Mdx` nodes. If you had content from a
//   // remote CMS you could also check to see if the parent node was a
//   // `File` node here
//   console.log("INTERNAL TYPE", node.internal.type)
//   if (node.internal.type === "ContentfulBlogPost") {
//     console.log("ONCREATENODE", node, actions)
//     const value = `/posts/${node.slug}`;//createFilePath({ node, getNode, basePath: "posts", })

//     createNodeField({
//       // Name of the field you are adding
//       name: "slug",
//       // Individual MDX node
//       node,
//       // Generated value based on filepath with "blog" prefix. you
//       // don't need a separating "/" before the value because
//       // createFilePath returns a path with the leading "/".
//       value,
//     })
//   }
// }

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