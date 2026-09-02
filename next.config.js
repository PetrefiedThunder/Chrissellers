/** @type {import('next').NextConfig} */
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

module.exports = nextConfig
