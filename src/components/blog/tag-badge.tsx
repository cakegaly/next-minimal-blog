import Link from "next/link"

import { tags } from "@/lib/blog"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface TagBadgeProps {
  slug: string
  /** Defaults to the tag name defined in `src/lib/blog.ts`. */
  label?: string
  className?: string
}

export function TagBadge({ slug, label, className }: TagBadgeProps) {
  const tag = tags[slug]
  const text = label ?? tag?.name ?? slug

  // Tags not defined in `src/lib/blog.ts` have no tag page, so no link.
  if (!tag) {
    return (
      <Badge variant="outline" className={cn("font-normal", className)}>
        {text}
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className={cn("font-normal", className)}
      render={<Link href={`/tag/${slug}`} />}
    >
      {text}
    </Badge>
  )
}
