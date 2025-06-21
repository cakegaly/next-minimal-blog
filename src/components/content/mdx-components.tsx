import Image from 'next/image';

import { cn } from '@/lib/utils';

import { LinkPreview } from '@/components/content/link-preview';
import { Callout } from '@/components/shared/callout';

export const components = {
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'border-border/50 mt-12 scroll-m-20 border-b pb-2 text-2xl font-bold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        'text-primary decoration-primary/30 hover:text-primary/80 hover:decoration-primary/50 font-medium underline-offset-4',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        'text-foreground/90 leading-7 [&:not(:first-child)]:mt-6',
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        'marker:text-muted-foreground my-6 ml-6 list-disc',
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        'marker:text-muted-foreground my-6 ml-6 list-decimal',
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('text-foreground/90 mt-2', className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'border-primary text-foreground/80 mt-6 border-l-2 pl-6 italic',
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn('border-border/50 rounded-md border', className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-border/50 my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="border-border/50 my-6 w-full overflow-y-auto rounded-lg border">
      <table
        className={cn('w-full border-collapse text-sm', className)}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        'border-border/50 m-0 border-t p-0',
        'transition-colors duration-150',
        'hover:bg-muted/30',
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border-border/50 bg-background border px-4 py-3 text-left font-bold',
        'text-foreground/90',
        '[&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border-border/50 border px-4 py-3 text-left',
        '[&[align=center]]:text-center [&[align=right]]:text-right',
        '[&>code]:bg-muted/30 [&>code]:rounded-sm [&>code]:px-1.5 [&>code]:py-0.5',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'border-border/50 my-6 overflow-x-auto rounded-lg border p-4',
        'bg-[#111A1F] dark:bg-[#151A1E]',
        'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !className?.includes('language-');
    return (
      <code
        className={cn(
          'relative font-mono text-sm',
          // Inline code styling
          isInline && [
            'rounded px-[0.3rem] py-[0.2rem]',
            'text-foreground/90 font-medium',
          ],
          // Code block styling
          !isInline && [
            'block',
            'leading-relaxed',
            '[&>span]:border-l-2 [&>span]:border-l-transparent [&>span]:pl-4',
            '[&>span.line-highlighted]:border-l-primary [&>span.line-highlighted]:bg-primary/5',
          ],
          className
        )}
        {...props}
      />
    );
  },
  'pre > code': ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'grid min-h-0 w-full gap-0.5 p-4',
        'text-[13px] leading-6',
        '[&>span]:border-l-2 [&>span]:border-l-transparent [&>span]:pl-4',
        '[&>span.line-highlighted]:border-l-primary [&>span.line-highlighted]:bg-primary/5',
        className
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  LinkPreview,
};
