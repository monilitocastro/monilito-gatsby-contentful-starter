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
    "gatsby-plugin-mdx",
  ],
};