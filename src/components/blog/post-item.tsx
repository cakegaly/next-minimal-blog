import { Fragment } from "react"
import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

import type { BlogPost } from "@/lib/mdx"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { PostMeta } from "@/components/blog/post-meta"

/** One row of a post list. */
export function PostItem({ post }: { post: BlogPost }) {
  const { title, description, date, tags } = post.metadata

  return (
    <Item className="px-2 py-4" render={<Link href={`/blog/${post.slug}`} />}>
      <ItemContent className="gap-1.5">
        <PostMeta date={date} tags={tags} />
        <ItemTitle className="line-clamp-2 text-base">{title}</ItemTitle>
        {description && <ItemDescription>{description}</ItemDescription>}
      </ItemContent>
      <ItemActions className="hidden text-muted-foreground sm:flex">
        <ChevronRightIcon className="size-4" />
      </ItemActions>
    </Item>
  )
}

/** A list of posts separated by dividers. */
export function PostList({ posts }: { posts: BlogPost[] }) {
  return (
    <ItemGroup className="gap-0">
      {posts.map((post, index) => (
        <Fragment key={post.slug}>
          {index > 0 && <ItemSeparator />}
          <PostItem post={post} />
        </Fragment>
      ))}
    </ItemGroup>
  )
}
