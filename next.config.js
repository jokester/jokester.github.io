/* eslint @typescript-eslint/no-var-requires: 0 */
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

/**
 * when in problem, try to sync with {@link https://github.com/vercel/next.js/tree/canary/packages/create-next-app/templates/typescript}
 * @type {import('next').NextConfig}
 */
const nextConf = {
  poweredByHeader: false,

  trailingSlash: false,

  exportPathMap: async (defaultPathMap) => {
    return {
      ...defaultPathMap,
      '/404.html': { page: '/404' },
    };
  },

  /**
   * runtime server-only configuration
   */
  serverRuntimeConfig: {
    // becomes process.env.SOME_CONSTANT : boolean
    serverStartedAt: new Date().toISOString(),
  },
  /**
   * build-time configuration
   */
  env: {
    // becomes process.env.SOME_CONSTANT : boolean
    REPO_ROOT: __dirname,
    GA_TRACKING_ID: 'UA-39627402-1',
    builtAt: new Date().toISOString(),
  },
  // see https://nextjs.org/docs/#customizing-webpack-config
  webpack(config, { buildId, dev, isServer, webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        /**
         * build-time configuration
         */
        'process.env.NEXT_DEV': JSON.stringify(!!dev),
      }),
    );

    config.node = {
      // allow use of __file / __dirname
      ...config.node,
      __filename: true,
    };
    return config;
  },

  transpilePackages: ['lodash-es', '@jokester/ts-commonutil'],

  images: {},

  productionBrowserSourceMaps: true,
  reactStrictMode: true,
};

module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  let merged = { ...nextConf };

  if (phase === PHASE_PRODUCTION_BUILD) {
    merged = require('@next/bundle-analyzer')({ enabled: true, openAnalyzer: false })(merged);
  }

  return merged;
};
