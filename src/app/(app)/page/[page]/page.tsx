import { notFound } from 'next/navigation';

import { getBlogPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

import { LinkCard } from '@/components/shared/link-card';
import { Pagination } from '@/components/shared/pagination';

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;

interface BlogListPageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const { totalPages } = await getBlogPosts();

  return await Promise.all(
    Array.from({ length: totalPages }, (_, i) => ({
      page: String(i + 1),
    }))
  );
}

export default async function BlogListPage({ params }: BlogListPageProps) {
  const { page } = await params;
  const pageNum = Number.parseInt(page);

  if (isNaN(pageNum)) {
    return notFound();
  }

  const {
    items: paginatedPosts,
    currentPage,
    totalPages,
  } = await getBlogPosts(pageNum);

  if (currentPage > totalPages) {
    return notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container flex flex-col gap-1">
          <section className="container border-b py-6">
            <div className="flex flex-col gap-1 pb-6">
              <h2 className="text-2xl font-medium tracking-tight">
                Paginated Blog Post List
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {paginatedPosts.map((post) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/page"
      />
    </div>
  );
}
