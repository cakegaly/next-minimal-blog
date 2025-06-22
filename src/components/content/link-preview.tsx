import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getOGData } from '@/actions/fetch-og-metadata';

import { siteConfig } from '@/lib/config';
import { getBlogPostBySlug } from '@/lib/mdx';
import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';

interface LinkCardProps {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  className?: string;
  error?: boolean;
}

interface LinkPreviewProps {
  url: string;
  className?: string;
}

function isInternalBlogLink(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.startsWith('/blog/');
  } catch {
    return url.startsWith('/blog/');
  }
}

function getSlugFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/');
    return parts[parts.length - 1];
  } catch {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}

export function LinkCard({
  url,
  title,
  description,
  image,
  className,
  error = false,
}: LinkCardProps) {
  const isExternal = url.startsWith('http');
  const hostname = isExternal ? new URL(url).hostname : '';

  const CardContent = (
    <>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1">
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            {isExternal ? (
              <>
                <div className="bg-muted relative size-4 overflow-hidden rounded-full">
                  {hostname && (
                    <Image
                      src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`}
                      alt=""
                      className="object-cover"
                      fill
                      sizes="16px"
                    />
                  )}
                </div>
                <span>{hostname.replace(/^www\./, '')}</span>
                <Icons.externalLink className="text-muted-foreground/70 size-3" />
              </>
            ) : (
              <span className="flex items-center gap-1.5">
                <div className="bg-primary/10 size-4 rounded-full">
                  <span className="text-primary flex h-full w-full items-center justify-center text-[10px] font-bold">
                    B
                  </span>
                </div>
                <span>Blog Post</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-foreground group-hover:text-accent leading-tight font-semibold transition-colors">
            {error ? 'Page Not Found' : title || 'Untitled'}{' '}
          </h3>
          {error ? (
            <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm">
              This page may have been moved or deleted.
            </p>
          ) : description ? (
            <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {image ? (
        <div className="hidden w-[148px] shrink-0 sm:block">
          <div className="relative h-full w-full">
            <ImageWithFallback
              src={image || '/placeholder.svg'}
              alt={title || 'Link preview'}
            />
          </div>
        </div>
      ) : (
        <div className="bg-muted/30 hidden w-[148px] shrink-0 sm:block">
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-muted-foreground/20 text-4xl">
              {isExternal ? '🔗' : '📝'}
            </span>
          </div>
        </div>
      )}
    </>
  );

  const cardClasses = cn(
    'group my-4 flex overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:bg-accent/5 hover:shadow-md',
    error && 'border-border/50 bg-card/50',
    className
  );

  return isExternal ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
    >
      {CardContent}
    </a>
  ) : (
    <Link href={url} className={cardClasses}>
      {CardContent}
    </Link>
  );
}

async function InternalLinkCard({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  const slug = getSlugFromUrl(url);
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return <LinkCard url={url} error={true} className={className} />;
  }

  return (
    <LinkCard
      url={url}
      title={post.metadata.title}
      description={post.metadata.description}
      image={siteConfig.ogImage}
      className={className}
    />
  );
}

async function ExternalLinkCard({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  try {
    const ogData = await getOGData(url);

    if (!ogData.title) {
      return <LinkCard url={url} error={true} className={className} />;
    }

    return (
      <LinkCard
        url={url}
        title={ogData.title}
        description={ogData.description}
        image={ogData.image}
        className={className}
      />
    );
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return <LinkCard url={url} error={true} className={className} />;
  }
}

export function LinkPreview({ url, className }: LinkPreviewProps) {
  const isInternal = !url.startsWith('http') && isInternalBlogLink(url);

  return (
    <Suspense
      fallback={
        <div
          className={cn(
            'bg-muted/50 my-4 h-[124px] animate-pulse rounded-lg border',
            className
          )}
        />
      }
    >
      {isInternal ? (
        <InternalLinkCard url={url} className={className} />
      ) : (
        <ExternalLinkCard url={url} className={className} />
      )}
    </Suspense>
  );
}
