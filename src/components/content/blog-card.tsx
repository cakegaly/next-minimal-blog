import Link from 'next/link';

import { BlogPost } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

import { Icons, TechIcons } from '@/components/icons';

interface BlogCardProps {
  data: BlogPost;
}

export function BlogCard({ data }: BlogCardProps) {
  const { metadata, slug } = data;
  const Icon = TechIcons[metadata.icon ?? 'default'];

  return (
    <Link
      href={`/blog/${slug}`}
      className="group border-border bg-card hover:bg-accent/5 relative flex items-start gap-4 overflow-hidden rounded-lg border p-5 shadow-sm transition-all hover:shadow-md"
    >
      {/* Eyecatch (TechIcon) */}
      <div className="group-hover:bg-muted/70 size-16 flex-shrink-0 rounded-lg bg-[#F3F4F6] p-4 transition-colors">
        <Icon className="text-primary group-hover:text-primary/80 size-8 transition-colors" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col space-y-2">
        {/* Title */}
        <h2 className="line-clamp-2 text-lg font-semibold tracking-tight transition-colors group-hover:underline">
          {metadata.title}
        </h2>

        {/* Description */}
        {metadata.description && (
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {metadata.description}
          </p>
        )}

        {/* Metadata */}
        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs">
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
                    className="bg-muted inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
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
