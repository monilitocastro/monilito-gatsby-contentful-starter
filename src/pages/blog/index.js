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
  query {
    mdx {
      id
    }
    allMdx(sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          frontmatter {
            title
            date
          }
          id,
          slug
        }
      }
    }
  }
`)
    return (
      <>
        <Layout pageTitle="My Blog">
          
        {
              data.allMdx.edges.map(({node})=>(
                  <article key={node.id}>
                      <Link to={node.slug}>{node.frontmatter.title}</Link>
                      <p>Posted on {node.frontmatter.date}</p>
                  </article>
              ))
          }
        </Layout>
      </>
    )
  }

// Step 3: Export your component
export default BlogPage