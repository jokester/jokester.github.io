/* eslint @typescript-eslint/no-var-requires: 0 */
const withPlugins = require('next-compose-plugins');

const webpack = require('webpack');
const withSourceMap = require('@zeit/next-source-maps');
const optimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withTM = require('next-transpile-modules');
const withPreact = require('next-plugin-preact');

const nextConf = {

  trailingSlash: true,

  exportPathMap: async (defaultPathMap) => {
    return {
      ...defaultPathMap,
      '/404.html': { page: '/404' },
    };
  },

  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      // reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      // reportFilename: '../bundles/client.html'
    },
  },

  env: {
    // becomes process.env.SOME_CONSTANT : booleanB
    REPO_ROOT: __dirname,
    GA_TRACKING_ID: 'UA-39627402-1',
  },

  devIndicators: {
    autoPrerender: false,
  },

  // see https://nextjs.org/docs/#customizing-webpack-config
  webpack(config, { buildId, dev, isServer }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        // becomes process.env.NEXT_DEV : boolean
        'process.env.NEXT_DEV': JSON.stringify(!!dev),
      }),
    );

    config.plugins = config.plugins.map((p) => {
      return p;
    });

    config.node = {
      // allow use of __file / __dirname
      ...config.node,
      __filename: true,
    };

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
      },
    };

    return config;
  },
};

module.exports = withPlugins(
  [
    [optimizedImages, { optimizeImages: false }],
    [withBundleAnalyzer],
    // [withSourceMap],  // this does not work
    withTM([/* ES modules used in server code */ 'lodash-es', '@jokester/ts-commonutil']),
    [withPreact],
  ],
  withSourceMap(nextConf),
);
