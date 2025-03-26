/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Explicitly disable the App Router to avoid conflicts
  experimental: {
    appDir: false,
  },
}

module.exports = nextConfig

