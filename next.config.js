/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // There is a package.json in the home directory (for agentpub), which Next
  // would otherwise pick as the workspace root. Pin it to this repo.
  turbopack: {
    root: __dirname,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
