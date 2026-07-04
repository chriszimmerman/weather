import type { NextConfig } from "next";

const nextConfig: NextConfig = {/* config options here */};

module.exports = {
  allowedDevOrigins: ["192.168.1.14"],
  env: {
    GEOCODING_API_KEY: process.env.GEOCODING_API_KEY,
  },
};

export default nextConfig;
