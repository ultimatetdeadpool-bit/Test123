import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  serverExternalPackages: ["cheerio", "axios"],
};

export default nextConfig;
