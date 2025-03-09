import type { BlogPost } from '@/lib/mdx';

export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export function paginateItems<T>(
  items: T[],
  page = 1,
  pageSize = 10
): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    items: items.slice(startIndex, endIndex),
    currentPage,
    totalPages,
    totalItems,
  };
}

export function getPaginatedBlogPosts(
  allPosts: BlogPost[],
  page = 1,
  pageSize = 10
): PaginationResult<BlogPost> {
  return paginateItems(allPosts, page, pageSize);
}
