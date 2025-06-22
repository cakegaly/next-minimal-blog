import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Button } from '@/components/shadcn-ui/button';
import { LinkPreview } from '@/components/content/link-preview';
import { getIconForLanguageExtension } from '@/components/icons/brand-icons';
import { Callout } from '@/components/shared/callout';
import { CopyButton } from '@/components/shared/copy-button';

export const mdxComponents = {
  h1: ({ className, ...props }: React.ComponentProps<'h1'>) => (
    <h1
      className={cn(
        'font-heading mt-2 scroll-m-28 text-3xl font-bold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.ComponentProps<'h2'>) => {
    return (
      <h2
        id={props.children
          ?.toString()
          .replace(/ /g, '-')
          .replace(/'/g, '')
          .replace(/\?/g, '')
          .toLowerCase()}
        className={cn(
          'font-heading mt-12 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-20 [&+p]:!mt-4',
          className
        )}
        {...props}
      />
    );
  },
  h3: ({ className, ...props }: React.ComponentProps<'h3'>) => (
    <h3
      className={cn(
        'font-heading mt-8 scroll-m-28 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.ComponentProps<'h4'>) => (
    <h4
      className={cn(
        'font-heading mt-8 scroll-m-28 text-lg font-medium tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.ComponentProps<'h5'>) => (
    <h5
      className={cn(
        'mt-8 scroll-m-28 text-lg font-medium tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.ComponentProps<'h6'>) => (
    <h6
      className={cn(
        'mt-8 scroll-m-28 text-base font-medium tracking-tight',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.ComponentProps<'a'>) => (
    <a
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.ComponentProps<'p'>) => (
    <p
      className={cn('leading-relaxed [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn('font-medium', className)} {...props} />
  ),
  ul: ({ className, ...props }: React.ComponentProps<'ul'>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<'ol'>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<'li'>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.ComponentProps<'hr'>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<'table'>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn(
          'relative w-full overflow-hidden border-none text-sm',
          className
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.ComponentProps<'tr'>) => (
    <tr
      className={cn('last:border-b-none m-0 border-b', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<'th'>) => (
    <th
      className={cn(
        'px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<'td'>) => (
    <td
      className={cn(
        'px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: React.ComponentProps<'pre'>) => {
    return (
      <pre
        className={cn(
          'no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0',
          className
        )}
        {...props}
      >
        {children}
      </pre>
    );
  },
  figure: ({ className, ...props }: React.ComponentProps<'figure'>) => {
    return <figure className={cn(className)} {...props} />;
  },
  figcaption: ({
    className,
    children,
    ...props
  }: React.ComponentProps<'figcaption'>) => {
    const iconExtension =
      'data-language' in props && typeof props['data-language'] === 'string'
        ? getIconForLanguageExtension(props['data-language'])
        : null;

    return (
      <figcaption
        className={cn(
          'text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70',
          className
        )}
        {...props}
      >
        {iconExtension}
        {children}
      </figcaption>
    );
  },
  code: ({
    className,
    __raw__,
    __src__,
    ...props
  }: React.ComponentProps<'code'> & {
    __raw__?: string;
    __src__?: string;
  }) => {
    // inline code style
    if (typeof props.children === 'string') {
      return (
        <code
          className={cn(
            'bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] outline-none',
            className
          )}
          {...props}
        />
      );
    }

    // default codeblock style
    return (
      <>
        {__raw__ && <CopyButton value={__raw__} src={__src__} />}
        <code {...props} />
      </>
    );
  },

  Image: ({
    src,
    className,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<'img'>) => (
    <Image
      className={cn('mt-6 rounded-md border', className)}
      src={typeof src === 'string' ? src : ''}
      width={Number(width)}
      height={Number(height)}
      alt={alt || ''}
      {...props}
    />
  ),
  Button,
  Callout,
  LinkPreview,
};
