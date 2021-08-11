import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import { Bold, Image, Text } from "./common/bundle";



const renderOption = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        return (<Image
          src={`https:${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
        />)
      },
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    }
  }

const BlogPost = ({ data }) => {
    return (
        <>
            {
                data.allContentfulBlogPost.edges.map(({node})=>{

                    return (
                        <>
                            <Layout pageTitle={node.title}>
                                <p>{node.createdAt}</p>
                                {documentToReactComponents(JSON.parse(node.body.raw))}
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