import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Favicons shown in <LinkPreview> cards for external links.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons",
      },
    ],
  },
}

export default nextConfig
