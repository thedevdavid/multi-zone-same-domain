/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "/dashboard-static",

  // async rewrites() {
  //   return {
  //     beforeFiles: [
  //       // Handle your own static assets
  //       {
  //         source: "/dashboard-static/_next/:path*",
  //         destination: "/_next/:path*",
  //       }
  //     ]
  //   };
  // }
};

module.exports = nextConfig;
