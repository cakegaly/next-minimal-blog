import { notFound } from "next/navigation"

import { getBlogPosts } from "@/lib/mdx"
import { PostList } from "@/components/blog/post-item"
import { PostPagination } from "@/components/blog/post-pagination"

export const dynamic = "force-static"
export const revalidate = false
export const dynamicParams = false

interface BlogListPageProps {
  params: Promise<{ page: string }>
}

export async function generateStaticParams() {
  const { totalPages } = await getBlogPosts()

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }))
}

export default async function BlogListPage({ params }: BlogListPageProps) {
  const { page } = await params
  const pageNum = Number.parseInt(page)

  if (isNaN(pageNum)) {
    notFound()
  }

  const { items, currentPage, totalPages } = await getBlogPosts(pageNum)

  if (currentPage > totalPages) {
    notFound()
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <section className="container pt-12 pb-6 md:pt-16">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            All posts
          </h1>
          <p className="mt-2 text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="mt-8">
            <PostList posts={items} />
          </div>
        </section>
      </div>
      <PostPagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/page"
      />
    </div>
  )
}
