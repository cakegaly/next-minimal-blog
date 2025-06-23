import { tags } from '@/lib/blog';
import { siteConfig } from '@/lib/config';
import { getBlogPostsByTagSlug } from '@/lib/mdx';
import { absoluteUrl, formatDate } from '@/lib/utils';

import { Breadcrumb } from '@/components/layout/breadcrumb';
import { AboutCta } from '@/components/shared/about-cta';
import { LinkCard } from '@/components/shared/link-card';

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(tags).map((slug) => ({
    slug,
  }));
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

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const posts = await getBlogPostsByTagSlug(slug);

  const breadcrumbItems = [
    {
      link: '',
      label: tags[slug].name,
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container">
          <div className="hidden py-4 lg:block">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container py-6">
          <AboutCta />
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container flex flex-col gap-1">
          <section className="container border-b py-6">
            <div className="flex flex-col gap-1 pb-6">
              <h2 className="text-2xl font-medium tracking-tight">
                {`Posts with "${slug}" Tag`}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {posts.map((post) => (
                <LinkCard
                  key={post.slug}
                  title={post.metadata.title}
                  imageUrl={post.metadata.thumbnail || '/og.png'}
                  link={`/blog/${post.slug}`}
                  badgeText={formatDate(post.metadata.date)}
                  description={post.metadata.description}
                  priority={true}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
