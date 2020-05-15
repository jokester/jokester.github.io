require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es6',
    strict: true,
    noImplicitAny: false,
  },
  transpileOnly: true,
});

module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Blog`,
    author: {
      name: `Kyle Mathews`,
      summary: `who lives and works in San Francisco building useful things.`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [

    // frontend stuff
    `gatsby-plugin-typescript`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass'),
      },
    },
    'gatsby-plugin-react-helmet',

    // graphql stuff
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        documentPaths: [
          './src/**/*.{ts,tsx,md,mdx}',
        ],
      },
    },

    // SEO/analytics stuff
    // 'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-110549153-1',
      },
    },

    // markdown stuff
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [".mdx", ".md"],
      },
    },
  ].filter(Boolean),
};
