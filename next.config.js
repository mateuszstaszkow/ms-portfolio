/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  output: 'export',
  assetPrefix: isProd ? '/ms-portfolio/' : '',
  basePath: isProd ? '/ms-portfolio' : '',
  trailingSlash: true
};
