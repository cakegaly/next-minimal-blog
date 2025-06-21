import Link from 'next/link';
import { notFound } from 'next/navigation';

import { siteConfig } from '@/lib/config';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/mdx';
import { absoluteUrl, formatDate } from '@/lib/utils';

import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { CustomMDX } from '@/components/content/custom-mdx';
import { Icons } from '@/components/icons';

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

  return (
    <>
      <div className="container max-w-screen-md py-6 md:py-12">
        <article>
          {/* Metadata (Date & Tags) */}
          <div className="text-muted-foreground mb-6 flex flex-wrap items-center justify-between text-sm">
            {post.metadata.date && (
              <div className="inline-flex items-center gap-1">
                <Icons.calendar className="size-4" />
                <time dateTime={post.metadata.date}>
                  {formatDate(post.metadata.date)}
                </time>
              </div>
            )}

            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="inline-flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <Link key={tag} href={`/tag/${tag}`}>
                    <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl leading-snug font-bold tracking-normal">
            {post.metadata.title}
          </h1>

          {/* Description */}
          {post.metadata.description && (
            <p className="text-foreground/80 mt-4">
              {post.metadata.description}
            </p>
          )}

          {/* Article Content */}
          <CustomMDX source={post.rawContent} />

          {/* Footer */}
          <footer className="mt-10 border-t pt-8">
            <Button variant="ghost" asChild className="h-9 px-2">
              <Link href="/" className="group inline-flex items-center">
                <Icons.arrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                Back to home
              </Link>
            </Button>
          </footer>
        </article>
      </div>
    </>
  );
}
