/**
 * The public URL of the site, used for absolute links (Open Graph, RSS,
 * sitemap). Resolved in this order:
 *
 * 1. `NEXT_PUBLIC_APP_URL` (set it in `.env.local` or your hosting settings)
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` (set automatically on Vercel)
 * 3. `http://localhost:8888` (local development)
 */
function getSiteUrl() {
  const url =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "http://localhost:8888"

  return url.replace(/\/+$/, "")
}

const siteUrl = getSiteUrl()

export const siteConfig = {
  name: "next-minimal-blog",
  description:
    "A minimal, statically generated MDX blog template built with Next.js, Tailwind CSS, and shadcn/ui.",
  url: siteUrl,
  ogImage: `${siteUrl}/og.png`,
  links: {
    twitter: "https://twitter.com/cakegaly",
    github: "https://github.com/cakegaly/next-minimal-blog",
  },
  copyRight: "cakegaly",
  email: "next-minimal-blog@example.com",
}

/** `absoluteUrl("/blog/hello")` -> `https://example.com/blog/hello` */
export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`
}
