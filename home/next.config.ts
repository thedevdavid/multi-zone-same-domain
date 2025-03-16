const { DASHBOARD_URL } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:teamSlug",
          // Don't rewrite for known marketing routes
          has: [
            {
              type: "header",
              key: "x-use-dashboard",
              value: "1",
            },
          ],
          destination: `${DASHBOARD_URL}/:teamSlug`,
        },
        {
          source: "/:teamSlug/:projectSlug",
          destination: `${DASHBOARD_URL}/:teamSlug/:projectSlug`,
        },
        {
          source: "/:teamSlug/:projectSlug/:path*",
          destination: `${DASHBOARD_URL}/:teamSlug/:projectSlug/:path*`,
        },
        // Handle dashboard app's static assets
        {
          source: "/dashboard",
          destination: `${DASHBOARD_URL}/dashboard`,
        },
        {
          source: "/dashboard/:path+",
          destination: `${DASHBOARD_URL}/dashboard/:path+`,
        },
        {
          source: "/dashboard-static/_next/:path+",
          destination: `${DASHBOARD_URL}/dashboard-static/_next/:path+`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
