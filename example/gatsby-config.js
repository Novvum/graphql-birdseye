module.exports = {
  siteMetadata: {
    title: `Gatsby Typescript Starter`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // Add typescript stack into webpack
    `gatsby-plugin-typescript`,
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/styled/typography`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images/`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`
    // "gatsby-plugin-eslint"
  ]
};
