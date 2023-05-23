/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images');

const nextConfig = withImages({
  webpack(config) {
    return config;
  },
  images: {
    disableStaticImages: true,
    domains: ['localhost'],
  },
  pageExtensions: ['tsx'],
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://tastyoleg.com/api/:path*', // Proxy to Backend
  //     },
  //   ];
  // },
});

module.exports = nextConfig;
