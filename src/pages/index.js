// Step 1: Import your component
import * as React from 'react'
import Layout from '../components/layout'
import {StaticImage} from "gatsby-plugin-image";

// Step 2: Define your component
const AboutPage = () => {
  return (
      <>
      <Layout pageTitle="Home">
        <p>
          
        I'm making this by following the Gatsby Tutorial
        <StaticImage
          alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
          src="../images/apples.jpeg"
        />
        </p>
        </Layout>
      </>
  )
}

// Step 3: Export your component
export default AboutPage