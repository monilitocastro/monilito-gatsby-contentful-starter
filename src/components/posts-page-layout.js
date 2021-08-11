import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import { Bold, Text } from "./common/bundle";
import { StaticImage } from "gatsby-plugin-image";

const assets = {}

const renderOption = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        const id = node.data.target.sys.id;
        if(assets[id] ){
          const {url, height, width} = assets[id];
          return (<img src={url} height={height} width={width}/>)
        }
        return <></>
        
      },
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    }
  }

const BlogPost = ({ data }) => {
    data.allContentfulAsset.edges.map(({node})=>{
      const {file:{url, contentType, details:{image:{height, width}}}, contentful_id} = node;
      assets[contentful_id] = {url, contentType, height, width}
    })
    return (
        <>
            {
                data.allContentfulBlogPost.edges.map(({node})=>{
                    console.log("NODE",node)
                    return (
                        <>
                            <Layout pageTitle={node.title}>
                                <p>{node.createdAt}</p>
                                {documentToReactComponents(JSON.parse(node.body.raw), renderOption)}
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
          children {id}
          id
        }
      }
    }
    allContentfulAsset {
      edges {
        node {
          file {
            url
            contentType
            details {
              image {
                height
                width
              }
            }
          }
          contentful_id
        }
      }
    }
  }
  `

  export default BlogPost