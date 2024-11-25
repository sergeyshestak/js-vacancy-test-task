const dotenv = require('dotenv-flow');
const { join } = require('path');

const dotenvConfig = dotenv.config({
  node_env: process.env.NEXT_PUBLIC_APP_ENV,
  silent: true,
});

/** @type {import('next').NextConfig} */
module.exports = {
  env: dotenvConfig.parsed,
  webpack(config) {
    // Enable polling based on env variable being set
    if (process.env.NEXT_PUBLIC_WEBPACK_USEPOLLING) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300,
      };
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: join(__dirname, '../../'),
  },
  pageExtensions: ['page.tsx', 'api.ts'],
  transpilePackages: ['app-constants', 'schemas', 'types'],
};
