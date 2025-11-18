/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Turbopack config (Next.js 16+)
  turbopack: {},
}

module.exports = nextConfig
