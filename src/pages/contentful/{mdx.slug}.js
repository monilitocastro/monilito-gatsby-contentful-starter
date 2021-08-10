import React from "react";
import {graphql} from 'gatsby';
import {MDXRenderer} from "gatsby-plugin-mdx";
import Layout from "../../components/layout";

const BlogPost = ({ data }) => {
    return (
        <>
          {JSON.stringify(data)}
        </>
    //     <Layout pageTitle={data.allContentfulBlogPost.edges.node.title}>
    //     <p>{data.allContentfulBlogPost.edges.node.createdAt}</p>
    //     <MDXRenderer>
    //     {JSON.stringify(data.allContentfulBlogPost.edges.node.body.raw)}
    //     </MDXRenderer>
    // </Layout>
    )
}


// export const query_OLD = graphql`
//   query MyContentfulQueryOLD($id: String) {
//     mdx(id: {eq: $id}) {
//       frontmatter {
//         title
//         date(formatString: "MMMM D, YYYY")
//       }
//       body
//     }
//   }
// `
export const query = graphql`
  query MyContentfulQuery($id: String) {
    allContentfulBlogPost(filter: {slug: {eq: $id}}) {
      edges {
        node {
          body {
            raw
          }
          slug
          title
          updatedAt
          createdAt
          id
        }
      }
    }
  }
  
`

export default BlogPost