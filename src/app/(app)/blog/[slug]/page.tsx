import { notFound } from "next/navigation"

import { author, tags } from "@/lib/blog"
import { siteConfig } from "@/lib/config"
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/mdx"
import { absoluteUrl, formatDate } from "@/lib/utils"
import { Author } from "@/components/blog/author"
import { HeroImage } from "@/components/blog/hero-image"
import { ShareButtons } from "@/components/blog/share-buttons"
import { TagBadge } from "@/components/blog/tag-badge"
import { CustomMDX } from "@/components/mdx/custom-mdx"
import { Breadcrumb } from "@/components/layout/breadcrumb"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const allPosts = await getAllBlogPosts()
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      images: [siteConfig.ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const breadcrumbItems = [
    ...(post.metadata.tags && post.metadata.tags.length > 0
      ? [
          {
            link: `/tag/${post.metadata.tags[0]}`,
            label: tags[post.metadata.tags[0]].name,
          },
        ]
      : []),
    {
      link: "",
      label: post.metadata.title,
    },
  ]
  const thumbnailUrl = post.metadata.thumbnail

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container">
          <div className="hidden py-4 lg:block">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <div className="pt-4">
          {thumbnailUrl && (
            <HeroImage
              imageUrl={thumbnailUrl}
              alt={`${post.metadata.title} thumbnail image`}
            />
          )}
        </div>
      </div>
      <div className="container-wrapper py-8">
        <div className="container flex max-w-3xl flex-col gap-8">
          <section className="flex-1">
            <article className="relative">
              <header className="mb-10 flex flex-col gap-4 border-b pb-8">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <time dateTime={post.metadata.date}>
                    {formatDate(post.metadata.date)}
                  </time>
                  {post.metadata.tags?.map((slug) => (
                    <TagBadge key={slug} slug={slug} label={tags[slug].name} />
                  ))}
                </div>
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                  {post.metadata.title}
                </h1>
                {post.metadata.description && (
                  <p className="text-muted-foreground md:text-lg">
                    {post.metadata.description}
                  </p>
                )}
                <Author
                  name={author.name}
                  twitterId={author.twitter}
                  imageUrl={author.image}
                />
              </header>

              {/* Article Content */}
              <div className="mb-10">
                <CustomMDX source={post.rawContent} />
              </div>

              {/* Share Buttons */}
              <div className="py-4">
                <ShareButtons
                  url={absoluteUrl(`/blog/${slug}`)}
                  title={post.metadata.title}
                  description={post.metadata.description}
                  image={thumbnailUrl}
                />
              </div>
            </article>
          </section>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container py-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
    </div>
  )
}
