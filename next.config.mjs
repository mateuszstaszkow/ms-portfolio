/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    reactStrictMode: true,
    assetPrefix: isProd ? '/ms-portfolio/' : '',
    trailingSlash: true,
};

export default nextConfig;
