// Step 1: Import your component
import * as React from 'react'
import {Link, useStaticQuery, graphql} from "gatsby"
import { 
    container,
    heading,
    navLinks,
    navLinkItem,
    navLinkText } from '../pages.module.css'
import Layout from "../../components/layout"

const BlogPage = ({ pageTitle, children }) => {
const data = useStaticQuery(graphql`
query MyAllContentfulBlogPostQuery {
  allContentfulBlogPost {
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

`)
    return (
      <>
        <Layout pageTitle="My Blog">
          
        {
              data.allContentfulBlogPost.edges.map(({node})=>(
                  <article key={node.id}>
                      <Link to={`/contentfulblog/${node.slug}`}>{node.title}</Link>
                      <p>Posted on {node.date}</p>
                  </article>
              ))
          }
        </Layout>
      </>
    )
  }

// Step 3: Export your component
export default BlogPage