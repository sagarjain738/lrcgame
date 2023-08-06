/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "images.pexels.com",
      "bing.com",
      "4.bp.blogspot.com",
    ],
  },
};

module.exports = nextConfig;
