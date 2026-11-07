import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { siteConfig } from "@/lib/config"
import { getBlogPostBySlug } from "@/lib/mdx"
import { getOGData } from "@/lib/og"
import { cn } from "@/lib/utils"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"

interface LinkPreviewProps {
  url: string
  className?: string
}

interface LinkPreviewCardProps extends LinkPreviewProps {
  title?: string
  description?: string
  image?: string
  error?: boolean
}

function getSlugFromUrl(url: string) {
  return url.split("/").filter(Boolean).at(-1) ?? ""
}

function LinkPreviewCard({
  url,
  title,
  description,
  image,
  className,
  error = false,
}: LinkPreviewCardProps) {
  const isExternal = url.startsWith("http")
  const hostname = isExternal ? new URL(url).hostname : ""

  return (
    <Item
      variant="outline"
      className={cn("my-4 flex-nowrap items-stretch p-0", className)}
      render={
        isExternal ? (
          <a href={url} target="_blank" rel="noopener noreferrer" />
        ) : (
          <Link href={url} />
        )
      }
    >
      <ItemContent className="gap-2 p-4">
        <ItemHeader className="justify-start gap-1.5 text-xs text-muted-foreground">
          {isExternal ? (
            <>
              <Image
                src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`}
                alt=""
                width={16}
                height={16}
                className="rounded-full bg-muted"
              />
              {hostname.replace(/^www\./, "")}
              <ExternalLinkIcon className="size-3" />
            </>
          ) : (
            "Blog Post"
          )}
        </ItemHeader>
        <ItemTitle className="line-clamp-2 text-base">
          {error ? "Page Not Found" : title || "Untitled"}
        </ItemTitle>
        <ItemDescription>
          {error ? "This page may have been moved or deleted." : description}
        </ItemDescription>
      </ItemContent>
      <ItemMedia className="relative hidden w-37 shrink-0 self-stretch overflow-hidden rounded-r-lg bg-muted sm:block">
        <ImageWithFallback src={image} alt={title || "Link preview"} />
      </ItemMedia>
    </Item>
  )
}

async function InternalLinkPreview({ url, className }: LinkPreviewProps) {
  const post = await getBlogPostBySlug(getSlugFromUrl(url))

  if (!post) {
    return <LinkPreviewCard url={url} error className={className} />
  }

  return (
    <LinkPreviewCard
      url={url}
      title={post.metadata.title}
      description={post.metadata.description}
      image={siteConfig.ogImage}
      className={className}
    />
  )
}

async function ExternalLinkPreview({ url, className }: LinkPreviewProps) {
  // getOGData never throws; it returns `{ url }` on failure.
  const ogData = await getOGData(url)

  return (
    <LinkPreviewCard
      url={url}
      title={ogData.title}
      description={ogData.description}
      image={ogData.image}
      error={!ogData.title}
      className={className}
    />
  )
}

/** MDX link card: `<LinkPreview url="https://..." />` or `url="/blog/slug"` */
export function LinkPreview({ url, className }: LinkPreviewProps) {
  const isInternal = url.startsWith("/blog/")

  return (
    <Suspense
      fallback={<Skeleton className={cn("my-4 h-31 w-full", className)} />}
    >
      {isInternal ? (
        <InternalLinkPreview url={url} className={className} />
      ) : (
        <ExternalLinkPreview url={url} className={className} />
      )}
    </Suspense>
  )
}
