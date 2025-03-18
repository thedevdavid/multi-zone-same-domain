import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  assetPrefix: "/marketing-static",
  async redirects() {
    return [
      // For logged-in users with known team
      {
        source: "/",
        has: [{ type: "cookie", key: "btm_session" }],
        destination: "/dashboard/dash",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      // {
      //   source: "/marketing-static/_next/:path+",
      //   destination: "/_next/:path+",
      // },
      {
        source: "/dashboard",
        destination: `${
          process.env.DASHBOARD_URL ?? "http://localhost:4000"
        }/dashboard`,
      },
      {
        source: "/dashboard/:path+",
        destination: `${
          process.env.DASHBOARD_URL ?? "http://localhost:4000"
        }/dashboard/:path+`,
      },
      // {
      //   source: "/dashboard-static/_next/:path+",
      //   destination: `${DASHBOARD_URL}/dashboard-static/_next/:path+`,
      // },
    ];
    // return {
    //   afterFiles: [
    //     // Rewrites for all non-authenticated paths handled by the app
    //     // {
    //     //   source: "/catalog",
    //     //   destination: `${DASHBOARD_URL}/catalog`,
    //     // },
    //     // {
    //     //   source: "/catalog/:path+",
    //     //   destination: `${DASHBOARD_URL}/catalog/:path+`,
    //     // },
    //     {
    //       source: "/dashboard",
    //       destination: `${DASHBOARD_URL}/dashboard`,
    //     },
    //     {
    //       source: "/dashboard/:path+",
    //       destination: `${DASHBOARD_URL}/dashboard/:path+`,
    //     },

    //     // Team slug routes
    //     // {
    //     //   source: "/:teamSlug",
    //     //   has: [
    //     //     {
    //     //       type: "header",
    //     //       key: "x-use-dashboard",
    //     //       value: "1",
    //     //     },
    //     //   ],
    //     //   destination: `${DASHBOARD_URL}/:teamSlug`,
    //     // },
    //     // {
    //     //   source: "/:teamSlug/:projectSlug",
    //     //   destination: `${DASHBOARD_URL}/:teamSlug/:projectSlug`,
    //     // },
    //     // {
    //     //   source: "/:teamSlug/:projectSlug",
    //     //   destination: `${DASHBOARD_URL}/:teamSlug/:projectSlug`,
    //     // },
    //     // {
    //     //   source: "/:teamSlug/:projectSlug/:path*",
    //     //   destination: `${DASHBOARD_URL}/:teamSlug/:projectSlug/:path*`,
    //     // },
    //   ],
    // };
  },
};

export default nextConfig;
