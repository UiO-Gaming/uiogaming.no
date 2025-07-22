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
        icon: "src/images/logo_2024_neon_pink.png",
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
    // Removed locale and i18n plugins
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
        background_color: `#1D1320`,
        theme_color: `#7D36E7`,
        display: `minimal-ui`,
        icon: `src/images/logo_2024_neon_pink.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
