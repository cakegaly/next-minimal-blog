import Image from 'next/image';

import { LinkPreview } from '@/components/content/link-preview';
import { Callout } from '@/components/shared/callout';
import { cn } from '@/lib/utils';

export const components = {
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-12 scroll-m-20 border-b border-border/50 pb-2 text-2xl font-bold tracking-tight first:mt-0',
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
        'font-medium text-primary decoration-primary/30 underline-offset-4 hover:text-primary/80 hover:decoration-primary/50',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        'leading-7 text-foreground/90 [&:not(:first-child)]:mt-6',
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        'my-6 ml-6 list-disc marker:text-muted-foreground',
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        'my-6 ml-6 list-decimal marker:text-muted-foreground',
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('mt-2 text-foreground/90', className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-primary pl-6 italic text-foreground/80',
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
      className={cn('rounded-md border border-border/50', className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border/50" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-border/50">
      <table
        className={cn('w-full border-collapse text-sm', className)}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        'm-0 border-t border-border/50 p-0',
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
        'border border-border/50 bg-background px-4 py-3 text-left font-bold',
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
        'border border-border/50 px-4 py-3 text-left',
        '[&[align=center]]:text-center [&[align=right]]:text-right',
        '[&>code]:rounded-sm [&>code]:bg-muted/30 [&>code]:px-1.5 [&>code]:py-0.5',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'my-6 overflow-x-auto rounded-lg border border-border/50 p-4',
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
            'font-medium text-foreground/90',
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
