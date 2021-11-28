/* eslint @typescript-eslint/no-var-requires: 0 */
const { withPlugins, optional } = require('next-compose-plugins');

const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

const nextConf = {
  trailingSlash: true,

  exportPathMap: async (defaultPathMap) => {
    return {
      ...defaultPathMap,
      '/404.html': { page: '/404' },
    };
  },

  poweredByHeader: false,

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
  webpack(config, { buildId, dev, isServer, webpack }) {
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

  images: {
    // disableStaticImages: true,
  },

  webpack5: true,

  // productionBrowserSourceMaps: true,

  future: {},
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
});

module.exports = withPlugins(
  [
    [withBundleAnalyzer], // no idea how to make it optional
    // [require('next-images'), {}], // required after { disableStaticImages: true }
    [
      optional(() =>
        // eslint-disable-next-line node/no-unpublished-require
        require('next-transpile-modules')([
          '@jokester/ts-commonutil',
          'lodash-es',
          /* ES modules used in server code */
        ]),
      ),
      {},
      [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD],
    ],
  ],
  nextConf,
);
