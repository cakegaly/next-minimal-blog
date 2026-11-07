import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { tags } from "@/lib/blog"
import { siteConfig } from "@/lib/config"
import { getAllBlogPosts } from "@/lib/mdx"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { PostCard } from "@/components/blog/post-card"
import { PostList } from "@/components/blog/post-item"
import { TagBadge } from "@/components/blog/tag-badge"
import { BrandIcons } from "@/components/shared/brand-icons"

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: siteConfig.description,
}

const LATEST_COUNT = 3
const LIST_COUNT = 5

export default async function IndexPage() {
  const posts = await getAllBlogPosts()
  const latestPosts = posts.slice(0, LATEST_COUNT)
  const morePosts = posts.slice(LATEST_COUNT, LATEST_COUNT + LIST_COUNT)

  const tagCounts = Object.entries(tags).map(([slug, tag]) => ({
    slug,
    name: tag.name,
    count: posts.filter((post) => post.metadata.tags?.includes(slug)).length,
  }))

  return (
    <div className="container-wrapper">
      <div className="container flex flex-col gap-16 pt-12 pb-16 md:gap-20 md:pt-16">
        <section className="flex flex-col items-start gap-4">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-2xl text-base text-balance text-muted-foreground md:text-lg">
            {siteConfig.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              href="/blog/welcome"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Read the guide
              <ArrowRightIcon />
            </Link>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <BrandIcons.gitHub />
              GitHub
            </a>
          </div>
        </section>

        <section>
          <SectionHeader title="Latest posts" />
          <div className="grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {morePosts.length > 0 && (
          <section>
            <SectionHeader title="More posts">
              <Link
                href="/page/1"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-muted-foreground"
                )}
              >
                View all posts
                <ArrowRightIcon />
              </Link>
            </SectionHeader>
            <PostList posts={morePosts} />
          </section>
        )}

        <section>
          <SectionHeader title="Browse by tag" />
          <div className="flex flex-wrap gap-2">
            {tagCounts.map((tag) => (
              <TagBadge
                key={tag.slug}
                slug={tag.slug}
                label={`${tag.name} (${tag.count})`}
                className="h-7 px-3 text-sm"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionHeader({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="font-heading text-xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </div>
  )
}
