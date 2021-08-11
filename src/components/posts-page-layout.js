import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "../components/layout"


const BlogPost = ({ data }) => {
    return (
        <>
            {
                data.allContentfulBlogPost.edges.map(({node})=>{

                    return (
                        <>
                            <Layout pageTitle={node.title}>
                                <p>{node.createdAt}</p>
                                {JSON.stringify(node.body.raw)}
                            </Layout>
                        </>
                    )
                })
            }
        </>
    )
}


export const pageQuery = graphql`
  query MyContentfulQuery2($id: String) {
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