import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Important for exporting as static files
  images: {
    unoptimized: true, // If you are using the Next.js image optimization feature, disable it for GitHub Pages
  },
  assetPrefix: isProd ? "/not-a-human.github.io" : "", // Add a prefix in production
  trailingSlash: true, // Add trailing slash to URLs
};

export default nextConfig;
