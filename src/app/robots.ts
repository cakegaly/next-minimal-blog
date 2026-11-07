import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/config"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/preview/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
