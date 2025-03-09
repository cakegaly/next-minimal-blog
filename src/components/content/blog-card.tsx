import Link from 'next/link';

import { Icons, TechIcons } from '@/components/icons';
import { BlogPost } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  data: BlogPost;
}

export function BlogCard({ data }: BlogCardProps) {
  const { metadata, slug } = data;
  const Icon = TechIcons[metadata.icon ?? 'default'];

  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative flex items-start gap-4 overflow-hidden rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:bg-accent/5 hover:shadow-md"
    >
      {/* Eyecatch (TechIcon) */}
      <div className="size-16 flex-shrink-0 rounded-lg bg-[#F3F4F6] p-4 transition-colors group-hover:bg-muted/70">
        <Icon className="size-8 text-primary transition-colors group-hover:text-primary/80" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col space-y-2">
        {/* Title */}
        <h2 className="line-clamp-2 text-lg font-semibold tracking-tight transition-colors group-hover:underline">
          {metadata.title}
        </h2>

        {/* Description */}
        {metadata.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {metadata.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icons.calendar className="size-4" />
            <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
          </div>

          {metadata.tags && metadata.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <Icons.tag className="size-4" />
              <div className="flex gap-1">
                {metadata.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {metadata.tags.length > 2 && (
                  <span className="text-xs">+{metadata.tags.length - 2}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
