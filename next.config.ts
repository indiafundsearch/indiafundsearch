import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Legacy IA → new drawing-set IA (301s preserve any earned link equity)
    return [
      // Consolidate the *.vercel.app production alias onto the canonical .com
      // host (301). Exact-host match, so preview deployments are unaffected.
      {
        source: "/:path*",
        has: [{ type: "host", value: "indiafundsearch.vercel.app" }],
        destination: "https://www.indiafundsearch.com/:path*",
        statusCode: 301,
      },
      { source: "/knowledge", destination: "/learn", permanent: true },
      { source: "/knowledge/:slug", destination: "/learn", permanent: true },
      { source: "/explore", destination: "/", permanent: true },
      { source: "/explore/:slug", destination: "/", permanent: true },
      { source: "/insights", destination: "/learn", permanent: true },
      { source: "/insights/:slug", destination: "/learn", permanent: true },
      { source: "/diagnostic", destination: "/fit-finder", permanent: true },
      { source: "/tools", destination: "/fit-finder", permanent: true },
      { source: "/tools/:slug", destination: "/fit-finder", permanent: true },
      // NOTE: /about is now a real E-E-A-T page (P3-26) — no longer redirected.
    ];
  },
};

export default nextConfig;
