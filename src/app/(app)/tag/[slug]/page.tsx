import type { Metadata } from "next"

import { tags } from "@/lib/blog"
import { absoluteUrl, siteConfig } from "@/lib/config"
import { getBlogPostsByTagSlug } from "@/lib/mdx"
import { Badge } from "@/components/ui/badge"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
} from "@/components/ui/item"
import { PostList } from "@/components/blog/post-item"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { BrandIcons } from "@/components/shared/brand-icons"

export const dynamic = "force-static"
export const revalidate = false
export const dynamicParams = false

interface TagPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(tags).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = tags[slug]

  if (!tag) {
    return {}
  }

  const title = `Posts tagged with "${tag.name}"`
  const description = `All posts tagged with "${tag.name}"`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: absoluteUrl(`/tag/${slug}`),
      images: [
        { url: siteConfig.ogImage, width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const tag = tags[slug]
  const posts = await getBlogPostsByTagSlug(slug)
  const TagIcon = BrandIcons[tag.icon]

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container">
          <div className="hidden py-4 lg:block">
            <Breadcrumb items={[{ label: tag.name }]} />
          </div>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container py-6">
          <Item variant="muted" className="p-6">
            <ItemMedia className="size-12 rounded-xl bg-primary text-primary-foreground">
              <TagIcon className="size-6" />
            </ItemMedia>
            <ItemContent>
              <div className="flex items-center gap-2">
                <Badge variant="outline">TAG</Badge>
                <span className="text-sm text-muted-foreground">
                  {posts.length} posts
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold tracking-tight">
                {tag.name}
              </h1>
              <ItemDescription>
                Explore all posts tagged with {tag.name}
              </ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </div>
      <div className="container-wrapper">
        <section className="container pb-12">
          <PostList posts={posts} />
        </section>
      </div>
    </div>
  )
}
