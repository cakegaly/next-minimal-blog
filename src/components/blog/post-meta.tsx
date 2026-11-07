import { tags as allTags } from "@/lib/blog"
import { cn, formatDate } from "@/lib/utils"

interface PostMetaProps {
  date: string
  tags?: string[]
  className?: string
}

/** "2026/11/7 · MDX · Next.js" — shared by post cards and list items. */
export function PostMeta({ date, tags = [], className }: PostMetaProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-1.5 text-xs text-muted-foreground",
        className
      )}
    >
      <time dateTime={date}>{formatDate(date)}</time>
      {tags.map((slug) => (
        <span key={slug} className="before:mr-1.5 before:content-['·']">
          {allTags[slug]?.name ?? slug}
        </span>
      ))}
    </div>
  )
}
