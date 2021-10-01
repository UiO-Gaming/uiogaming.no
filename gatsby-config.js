module.exports = {
  siteMetadata: {
    title: `UiO Gaming`,
    description: `En hobbyforening som ønsker skape et sosialt miljø rundt gaming og e-sport på UiO!`,
    author: `@uiogaming`,
    url: `https://uiogaming.no`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/logo.jpg",
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `mmqlu667`,
        dataset: `production`,
        watchMode: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `UiO Gaming`,
        short_name: `uiogaming.no`,
        start_url: `/`,
        background_color: `#171520`,
        theme_color: `#E2231A`,
        display: `minimal-ui`,
        icon: `src/images/logo.jpg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
