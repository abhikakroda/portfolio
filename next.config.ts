import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  transpilePackages: ["next-mdx-remote"],
  allowedDevOrigins: ["ncdai.localhost", "ncdai-macbook.local"],
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.chanhdai.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
    qualities: [75, 100],
  },
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: "/blog/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/components/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blocks/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/sponsors",
        destination: "/",
        permanent: true,
      },
      {
        source: "/preview/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/doc.mdx/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/rss",
        destination: "/",
        permanent: true,
      },
      {
        source: "/registry/rss",
        destination: "/",
        permanent: true,
      },
      {
        source: "/r/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/testimonials",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wall-of-love",
        destination: "/",
        permanent: true,
      },
      {
        source: "/awards.md",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
