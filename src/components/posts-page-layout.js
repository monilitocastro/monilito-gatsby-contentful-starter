import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import { Bold, Text } from "./common/bundle";



const renderOption = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
    //   [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
    //     return (<EmbeddedMedia sysId={node.data.target.sys.id}
    //     />)
    //   },
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    }
  }

const BlogPost = ({ data }) => {
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
  }
  `

  export default BlogPost