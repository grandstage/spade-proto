/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    experimental: {
      serverActions: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      })
      return config;
    },
  }
  
  module.exports = nextConfig
  