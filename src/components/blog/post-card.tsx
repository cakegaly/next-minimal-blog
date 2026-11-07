import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import type { BlogPost } from "@/lib/mdx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PostMeta } from "@/components/blog/post-meta"

interface PostCardProps {
  post: BlogPost
}

/** Text-first post card for grid layouts. */
export function PostCard({ post }: PostCardProps) {
  const { title, description, date, tags } = post.metadata

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group/post rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="h-full transition-colors group-hover/post:bg-muted/50">
        <CardHeader className="gap-2">
          <PostMeta date={date} tags={tags} />
          <CardTitle className="text-lg text-balance">{title}</CardTitle>
          {description && (
            <CardDescription className="line-clamp-3">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="mt-auto flex items-center gap-1 text-sm font-medium">
          Read post
          <ArrowRightIcon className="size-4 transition-transform group-hover/post:translate-x-0.5" />
        </CardContent>
      </Card>
    </Link>
  )
}
