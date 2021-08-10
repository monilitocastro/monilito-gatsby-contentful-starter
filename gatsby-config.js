const dotenv= require('dotenv');
if(process.env.NODE_ENV!=="production"){
  dotenv.config();
}


module.exports = {
  siteMetadata: {
    title: "m6o.io - Monilito Castro",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options:{
        name: `blog`,
        path: `${__dirname}/src/blog/`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `${process.env.CONTENTFUL_SPACE_ID}`,
        accessToken: `${process.env.CONTENTFUL_API_KEY}`,
        useNameForId: true,
        name: `contentful`,
        path: `${__dirname}/src/contentful/`,
      }
    },
    "gatsby-plugin-mdx",
  ],
};