import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/promotions/active",
        destination: "https://klippr-backend-production.up.railway.app/api/promotions/active",
      },
      {
        source: "/api/klippr/promotions/active",
        destination: "https://klippr-backend-production.up.railway.app/api/promotions/active",
      },
      {
        source: "/api/klippr/promotions/businesses/:businessId",
        destination: "https://klippr-backend-production.up.railway.app/api/promotions/businesses/:businessId",
      },
      {
        source: "/api/klippr/redemptions/businesses/:businessId",
        destination: "https://klippr-backend-production.up.railway.app/api/redemptions/businesses/:businessId",
      },
      {
        source: "/api/klippr/analytics/dashboard/:businessId",
        destination: "https://klippr-backend-production.up.railway.app/api/analytics/dashboard/:businessId",
      },
    ];
  },
};

export default nextConfig;
