/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  env: {
    NEXT_PUBLIC_MAIN_HUB_ADDRESS: process.env.NEXT_PUBLIC_MAIN_HUB_ADDRESS,
    NEXT_PUBLIC_NFT_ADDRESS: process.env.NEXT_PUBLIC_NFT_ADDRESS,
    NEXT_PUBLIC_DEFAULT_CHAIN: process.env.NEXT_PUBLIC_DEFAULT_CHAIN,
    NEXT_PUBLIC_CELO_RPC: process.env.NEXT_PUBLIC_CELO_RPC,
    NEXT_PUBLIC_ALFAJORES_RPC: process.env.NEXT_PUBLIC_ALFAJORES_RPC,
  },
}

module.exports = nextConfig
