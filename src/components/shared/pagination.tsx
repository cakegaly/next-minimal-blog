import {
  Pagination as PaginationCN,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/shadcn-ui/pagination';
import { Icons } from '@/components/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

interface PaginationItem {
  pageNumber: number;
  disabled?: boolean;
}

const MAX_LINKS = 5;

const generatePageItems = (
  totalPages: number,
  currentPage: number
): PaginationItem[] => {
  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= MAX_LINKS) {
    return allPages.map((pageNumber) => ({
      pageNumber,
      disabled: pageNumber === currentPage,
    }));
  }

  const halfLinks = Math.floor(MAX_LINKS / 2);
  const endPage = Math.min(totalPages, currentPage + halfLinks);
  const startPage = Math.max(1, endPage - MAX_LINKS + 1);

  const pageRange = allPages.slice(startPage - 1, startPage - 1 + MAX_LINKS);

  return pageRange.map((pageNumber) => ({
    pageNumber,
    disabled: pageNumber === currentPage,
  }));
};

const generatePrevItem = (currentPage: number): PaginationItem | undefined =>
  currentPage > 1 ? { pageNumber: currentPage - 1 } : undefined;

const generateNextItem = (
  totalPages: number,
  currentPage: number
): PaginationItem | undefined =>
  currentPage < totalPages ? { pageNumber: currentPage + 1 } : undefined;

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  const paginationItems = {
    prev: generatePrevItem(currentPage),
    targetPages: generatePageItems(totalPages, currentPage),
    next: generateNextItem(totalPages, currentPage),
  };

  return (
    <PaginationCN className="my-10">
      <PaginationContent className="gap-3">
        {paginationItems.prev && (
          <PaginationItem>
            <PaginationLink
              href={`${basePath}/${paginationItems.prev.pageNumber}`}
            >
              <Icons.chevronLeft className="size-4" />
              <span className="sr-only">Go to prev page</span>
            </PaginationLink>
          </PaginationItem>
        )}
        {paginationItems.targetPages.map((targetPage, index) => {
          const isCurrent = targetPage.disabled;
          return (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={isCurrent}
                href={isCurrent ? '#' : `${basePath}/${targetPage.pageNumber}`}
              >
                {targetPage.pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {paginationItems.next && (
          <PaginationItem>
            <PaginationLink
              href={`${basePath}/${paginationItems.next.pageNumber}`}
            >
              <Icons.chevronRight className="size-4" />
              <span className="sr-only">Go to next page</span>
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationCN>
  );
}
