import { tags } from '@/lib/blog';
import { siteConfig } from '@/lib/config';
import { getBlogPostsByTagSlug } from '@/lib/mdx';
import { absoluteUrl, formatDate } from '@/lib/utils';

import { Badge } from '@/components/shadcn-ui/badge';
import { BrandIcons } from '@/components/icons/brand-icons';
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
        <div className="container pb-6">
          <CardTagTitle
            icon={tags[slug].icon}
            name={tags[slug].name}
            postCount={posts.length}
          />
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container flex flex-col gap-1">
          <section className="container border-b py-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

function CardTagTitle({
  icon,
  name,
  postCount,
}: {
  icon: keyof typeof BrandIcons;
  name: string;
  postCount?: number;
}) {
  const TagIcon = BrandIcons[icon];

  return (
    <div className="pb-8">
      <div className="from-primary/5 via-primary/3 ring-primary/10 relative overflow-hidden rounded-2xl bg-gradient-to-br to-transparent p-6 ring-1">
        <div className="bg-primary/5 absolute -top-4 -right-4 h-24 w-24 rounded-full"></div>
        <div className="relative flex items-start gap-4">
          <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-xl">
            <TagIcon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                TAG
              </Badge>
              {postCount && (
                <span className="text-muted-foreground text-sm">
                  • {postCount} posts
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
            <p className="text-muted-foreground mt-1">
              Explore all posts tagged with {name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
