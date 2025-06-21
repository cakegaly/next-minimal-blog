import { tags } from '@/config/blog';
import { siteConfig } from '@/lib/config';
import { getBlogPostsByTagSlug } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/utils';

import { BlogCard } from '@/components/content/blog-card';
import { PageHeader } from '@/components/shared/page-header';

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params;
  const tag = tags.slug;
  if (!tag) {
    return {};
  }

  return {
    title: `posts with "${tag.name}" tag`,
    description: `post list with "${tag.name}" tag`,
    openGraph: {
      title: `posts with "${tag.name}" tag`,
      description: `post list with "${tag.name}" tag`,
      type: 'article',
      url: absoluteUrl(`/tag/${slug}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `post with "${tag.name}" tag`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `posts with "${tag.name}" tag`,
      description: `post list with "${tag.name}" tag`,
      images: [siteConfig.ogImage],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(tags).map((slug) => ({
    slug: slug,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  const posts = await getBlogPostsByTagSlug(slug);

  return (
    <section className="container max-w-screen-md py-6 md:py-12">
      <PageHeader heading={`${slug} タグの記事一覧`} />
      <div className="space-y-6">
        {posts.map((blog) => (
          <BlogCard key={blog.slug} data={blog} />
        ))}
      </div>
    </section>
  );
}
