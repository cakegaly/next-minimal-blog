import Link from "next/link"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface TagBadgeProps {
  slug: string
  label: string
  className?: string
}

export function TagBadge({ slug, label, className }: TagBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("font-normal", className)}
      render={<Link href={`/tag/${slug}`} />}
    >
      {label}
    </Badge>
  )
}
