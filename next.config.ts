import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/klippr/promotions/active",
        destination: "https://klippr-backend-production.up.railway.app/api/promotions/active",
      },
    ];
  },
};

export default nextConfig;
