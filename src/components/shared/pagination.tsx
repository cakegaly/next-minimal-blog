import Link from 'next/link';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/shadcn-ui/button';
import { Icons } from '@/components/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="flex items-center justify-center space-x-6 py-8">
      {prevPage ? (
        <Link
          href={`${basePath}${`/${prevPage}`}`}
          className={cn(buttonVariants({ variant: 'outline' }), 'gap-1 pl-2.5')}
        >
          <Icons.chevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Link>
      ) : (
        <div
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'pointer-events-none gap-1 pl-2.5 opacity-50'
          )}
        >
          <Icons.chevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </div>
      )}

      <div className="font-mono text-sm">{`${currentPage} | ${totalPages}`}</div>

      {nextPage ? (
        <Link
          href={`${basePath}/${nextPage}`}
          className={cn(buttonVariants({ variant: 'outline' }), 'gap-1 pr-2.5')}
        >
          <span className="sr-only">Next</span>
          <Icons.chevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'pointer-events-none gap-1 pr-2.5 opacity-50'
          )}
        >
          <span className="sr-only">Next</span>
          <Icons.chevronRight className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
