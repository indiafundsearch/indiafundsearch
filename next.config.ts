import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Legacy IA → new drawing-set IA (301s preserve any earned link equity)
    return [
      { source: "/knowledge", destination: "/learn", permanent: true },
      { source: "/knowledge/:slug", destination: "/learn", permanent: true },
      { source: "/explore", destination: "/", permanent: true },
      { source: "/explore/:slug", destination: "/", permanent: true },
      { source: "/insights", destination: "/learn", permanent: true },
      { source: "/insights/:slug", destination: "/learn", permanent: true },
      { source: "/diagnostic", destination: "/fit-finder", permanent: true },
      { source: "/tools", destination: "/fit-finder", permanent: true },
      { source: "/tools/:slug", destination: "/fit-finder", permanent: true },
      { source: "/about", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
