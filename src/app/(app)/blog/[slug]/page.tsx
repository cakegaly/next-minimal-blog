import { notFound } from 'next/navigation';

import { author, tags } from '@/lib/blog';
import { siteConfig } from '@/lib/config';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/mdx';
import { absoluteUrl, formatDate } from '@/lib/utils';

import { ArticleShareButtons } from '@/components/content/article-share-buttons';
import { Author } from '@/components/content/author';
import { CustomMDX } from '@/components/content/custom-mdx';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { BlurredHeroImage } from '@/components/shared/blurred-hero-image';
import { LinkBadge } from '@/components/shared/link-badge';

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allPosts = await getAllBlogPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: 'article',
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
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
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
      link: '',
      label: post.metadata.title,
    },
  ];
  const thumbnailUrl = post.metadata.thumbnail;

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
            <BlurredHeroImage
              imageUrl={thumbnailUrl}
              alt={`${post.metadata.title} thumbnail image`}
            />
          )}
        </div>
      </div>
      <div className="container-wrapper py-8">
        <div className="container flex max-w-screen-md flex-col gap-8">
          <section className="flex-1">
            <article className="relative">
              <header className="mb-10 space-y-2 md:space-y-6">
                {/* Date & Time */}
                <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-[11px] md:text-xs">
                  {post.metadata.date && (
                    <div className="inline-flex items-center gap-1">
                      <time dateTime={post.metadata.date}>
                        {`${formatDate(post.metadata.date)}`}
                      </time>
                    </div>
                  )}
                  <div className="hidden md:flex md:gap-2">
                    {post.metadata.tags?.map((slug) => (
                      <LinkBadge
                        key={slug}
                        link={`/tag/${slug}`}
                        label={tags[slug].name}
                      />
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-lg leading-normal font-bold tracking-tight md:text-2xl md:leading-tight md:font-normal">
                  {post.metadata.title}
                </h1>

                <div className="py-4">
                  <Author
                    name={author.name}
                    twitterId={author.twitter}
                    imageUrl={author.image}
                  />
                </div>
              </header>

              {/* Article Content */}
              <div className="mb-10">
                <CustomMDX source={post.rawContent} />
              </div>

              {/* Share Buttons */}
              <div className="py-4">
                <ArticleShareButtons
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
  );
}
