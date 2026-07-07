import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (best compression), fall back to WebP
    formats: ["image/avif", "image/webp"],
    // Device breakpoints used to generate srcset candidates
    deviceSizes: [375, 640, 828, 1080, 1200, 1920],
    imageSizes: [32, 64, 128, 256, 384],
    // 1-year CDN/browser cache for optimized images
    minimumCacheTTL: 31536000,
  },
  // Enable gzip/brotli compression on all server responses
  compress: true,
  async headers() {
    return [
      // Fonts — immutable, 1 year cache
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Pre-converted WebP images — immutable, 1 year cache
      {
        source: "/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Original PNG fallbacks — 1 year cache
      {
        source: "/:path*.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
