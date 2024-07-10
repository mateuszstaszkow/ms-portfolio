/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  output: 'export',
  assetPrefix: isProd ? '/your-repo-name/' : '',
  trailingSlash: true,
};
