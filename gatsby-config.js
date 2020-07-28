module.exports = {
  siteMetadata: {
    title: `Beta Calculator`,
    siteUrl: `https://www.beta-calculator.com`,
    description: `Stock / Portfolio CAMP beta calculator`,
    author: `@andrew_wu`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        sitemapSize: 5000
      }
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-5520464837257371`
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.beta-calculator.com`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-yahoo-finance-api",
      options: {
        /* Your Yahoo Finance API Key (Required) */
        key: "1c25da58f4msh79e4e0b3571706ep13b2c4jsnaf3c161e57d0",

        /*
          An array of queries you want to make (The data you want to fetch at build time).
          At least one query object is required.
        */
        queries: [
          /*
            Below is a list of all queries available, with their associated types and params.

            All queries must have a "type" and a "params" field
            The query type determines which query will be made.

            Note: Timestamps for this API are in Unix epoch time. Refer to https:/www.epochconverter.com/ to determine a timestamp for a given date.
          */

          {
            type: "get-historical-data",
            params: {
              period1: "1431010482", // (Required) Epoch timestamp
              period2: "1588863282", // (Required) Epoch timestamp
              symbol: "TSLA", // (Required) Stock ticker/symbol
              frequency: "1d", // (Optional) Options: 1d | 1w | 1mo
            },
          },
          {
            type: "get-balance-sheet",
            params: {
              symbol: "TSLA", // (Required) Stock ticker/symbol
            },
          },
          {
            type: "get-movers",
            params: {
              region: "US", // (Required) Options: AU | CA | FR | DE | HK | US | IT | ES | GB | IN
              lang: "en", // (Required) Options:  en | fr | de | it | es | zh
              count: "10", // (Optional) The number of quotes to display in day gainers / losers / activies
            },
          },
          {
            type: "get-charts",
            params: {
              symbol: "TSLA", // (Required) Stock ticker/symbol
              region: "US", // (Required) Options: AU | CA | FR | DE | HK | US | IT | ES | GB | IN
              lang: "en", // (Required) Options:  en | fr | de | it | es | zh
              range: "3mo", // (Required) Options: 1d | 5d | 3mo | 6mo | 1y | 5y | max
              interval: "1mo", // (Required) Options: 5m | 15m | 1d | 1wk | 1mo
              comparisons: "APPL,GOOG", // (Optional) Comma seperated list of stock symbols to retrieve financial data for
            },
          },
        ],
      },
    },
  ],
}
