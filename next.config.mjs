/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["casestudyphoenix.com", "lh3.googleusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, module: false };
    }
    return config;
  },
};

export default nextConfig;
