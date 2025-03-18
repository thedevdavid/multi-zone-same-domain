import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  basePath: "/dashboard",
  async redirects() {
    return [
      {
        source: "/",
        missing: [{ type: "cookie", key: "btm_session" }],
        destination: "/catalog",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "cookie", key: "btm_session" }],
        destination: "/dash",
        permanent: false,
      },
    ];
  },
  // assetPrefix: "/dashboard-static",
  // async rewrites() {
  //   return {
  //     beforeFiles: [
  //       {
  //         source: "/dashboard-static/_next/:path+",
  //         destination: "/_next/:path+",
  //       },
  //     ],
  //   };
  // },
};

export default nextConfig;
