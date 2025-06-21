import { notFound } from 'next/navigation';

import { postsPerPage } from '@/config/blog';
import { getAllBlogPosts } from '@/lib/mdx';
import { getPaginatedBlogPosts } from '@/lib/pagination';

import { BlogCard } from '@/components/content/blog-card';
import { Pagination } from '@/components/shared/pagination';

interface BlogListPageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const allPosts = await getAllBlogPosts();
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

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

  const allPosts = await getAllBlogPosts();
  const {
    items: paginatedPosts,
    currentPage,
    totalPages,
  } = getPaginatedBlogPosts(allPosts, pageNum, postsPerPage);

  if (currentPage > totalPages) {
    return notFound();
  }

  return (
    <section className="container max-w-screen-md py-6 md:py-12">
      <div className="space-y-6">
        {paginatedPosts.map((blog) => (
          <BlogCard key={blog.slug} data={blog} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/page"
      />
    </section>
  );
}
