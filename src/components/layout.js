// Step 1: Import your component
import * as React from 'react'
import {Link, useStaticQuery, graphql} from "gatsby"
import { 
    container,
    heading,
    navLinks,
    navLinkItem,
    navLinkText } from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`)
    return (
      <div className={container}>
        <title>{data.site.siteMetadata.title} - {pageTitle}</title>
        <main>
        <nav>
          <h1>{data.site.siteMetadata.title}</h1>
            <ul className={navLinks}>
                <li className={navLinkItem}><Link to="/" className={navLinkText}>Home</Link></li>
                <li className={navLinkItem}><Link to="/contentfulblog" className={navLinkText}>Blog</Link></li>
                <li className={navLinkItem}><Link to="/about" className={navLinkText}>About</Link></li>
            </ul>
        </nav>
          <h3 className={heading}>{pageTitle || data.site.siteMetadata.title}</h3>
        <p>{data.site.siteMetadata.description}</p>
          {children}
        </main>
      </div>
    )
  }

// Step 3: Export your component
export default Layout