import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  serverExternalPackages: ["better-auth", "@better-auth/core", "mongodb", "jsonwebtoken"]
};
export default nextConfig;
