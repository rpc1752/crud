/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add these settings for better Netlify compatibility
  swcMinify: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
