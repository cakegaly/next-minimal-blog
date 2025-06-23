import type { Metadata } from 'next';
import Link from 'next/link';

import { tags } from '@/lib/blog';
import { getAllBlogPosts } from '@/lib/mdx';
import { cn, formatDate } from '@/lib/utils';

import { Button, buttonVariants } from '@/components/shadcn-ui/button';
import { Icons } from '@/components/icons';
import { AboutCta } from '@/components/shared/about-cta';
import { LinkBadge } from '@/components/shared/link-badge';
import { LinkCard } from '@/components/shared/link-card';
import { PartialViewCarousel } from '@/components/shared/partial-view-carousel';
import { ViewpointIndicator } from '@/components/shared/viewpoint-indicator';

const title = 'Lightweight and Minimalistic Next.js Blog Template';
const description =
  'A minimalistic, easy-to-use blog template built with Next.js. Customize it to your liking and use it for personal blogs, portfolio sites, or tech documentation.';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title,
  description,
};

export default async function IndexPage() {
  const allPosts = await getAllBlogPosts();

  return (
    <div className="flex flex-1 flex-col">
      <section className="py-8">
        <h2 className="sr-only">Hero Carousel Items</h2>
        <HeroCarousel />
      </section>
      <div className="container-wrapper">
        <div className="container py-6">
          <AboutCta />
        </div>
      </div>
      <div className="container-wrapper">
        <section className="container border-b py-6">
          <div className="flex flex-col gap-1 pb-6">
            <h2 className="text-2xl font-medium tracking-tight">Grid View</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allPosts.slice(0, 6).map((post) => (
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
          <div className="mt-10 text-end">
            <Button asChild variant="ghost" className="h-9 px-2">
              <Link
                href="/page/1"
                className="group inline-flex items-center gap-2"
              >
                <span>{'See more posts'}</span>
                <Icons.chevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
      <div className="container-wrapper py-8">
        <div className="container flex flex-col gap-8 lg:flex-row">
          <section className="flex-1">
            <div className="flex flex-col gap-1 pb-6">
              <h2 className="text-2xl font-medium tracking-tight">List View</h2>
            </div>
            <div className="flex flex-col gap-2">
              {allPosts.map((post) => (
                <LinkCard
                  key={post.slug}
                  title={post.metadata.title}
                  imageUrl={post.metadata.thumbnail || '/og.png'}
                  link={`/blog/${post.slug}`}
                  variant="horizontal"
                  badgeText={formatDate(post.metadata.date)}
                  description={post.metadata.description}
                />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="ghost" className="h-9 px-2">
                <Link
                  href="/page/1"
                  className="group inline-flex items-center gap-2"
                >
                  <span>{'See more posts'}</span>
                  <Icons.chevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </section>

          <aside className="sticky mt-8 shrink-0 lg:bottom-6 lg:mt-0 lg:w-80 lg:self-end">
            <section className="pb-6">
              <div className="flex flex-col gap-1 pb-6">
                <h2 className="text-2xl font-medium tracking-tight">
                  Compact List View
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                {allPosts.slice(0, 5).map((post) => (
                  <LinkCard
                    key={post.slug}
                    title={post.metadata.title}
                    imageUrl={post.metadata.thumbnail || '/og.png'}
                    link={`/blog/${post.slug}`}
                    variant="compact"
                    badgeText={formatDate(post.metadata.date)}
                  />
                ))}
              </div>
              <Link
                href="/page/1"
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'mt-4 ml-auto block px-0 text-end text-xs font-normal'
                )}
              >
                {'See more posts'}
              </Link>
            </section>

            <section className="pb-6">
              <div className="flex flex-col gap-1 pb-6">
                <h2 className="text-2xl font-medium tracking-tight">
                  Keywords
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {Object.keys(tags).map((slug) => (
                  <LinkBadge
                    key={slug}
                    label={tags[slug].name}
                    link={`/tag/${slug}`}
                    className="px-2.5 py-2 text-[13px]"
                  />
                ))}
              </div>
            </section>

            <div className="my-4">
              <ViewpointIndicator />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

async function HeroCarousel() {
  const allPosts = await getAllBlogPosts();

  const carouselItems = allPosts.slice(0, 5).map((post) => ({
    title: post.metadata.title,
    href: `/blog/${post.slug}`,
    imageUrl: post.metadata.thumbnail || '/og.png',
  }));

  return <PartialViewCarousel items={carouselItems} />;
}
