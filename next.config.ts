import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/fonts/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/:path*.woff2",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/butterflies_webp/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/llms.txt",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Content-Type", value: "text/plain; charset=utf-8" },
      ],
    },
    {
      source: "/llms-full.txt",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Content-Type", value: "text/plain; charset=utf-8" },
      ],
    },
    {
      source: "/robots.txt",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
      ],
    },
    {
      source: "/sitemap.xml",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
      ],
    },
  ],
};

export default nextConfig;
