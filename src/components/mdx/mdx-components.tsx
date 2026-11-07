import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LinkPreview } from "@/components/mdx/link-preview"
import { MdxCodeBlock } from "@/components/mdx/mdx-code-block"
import { Callout } from "@/components/mdx/callout"

type CodeElementProps = {
  className?: string
  children?: React.ReactNode
  "data-meta"?: string
}

export const mdxComponents = {
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn(
        "mt-2 scroll-m-28 font-heading text-3xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.ComponentProps<"h2">) => {
    return (
      <h2
        id={props.children
          ?.toString()
          .replace(/ /g, "-")
          .replace(/'/g, "")
          .replace(/\?/g, "")
          .toLowerCase()}
        className={cn(
          "mt-12 scroll-m-28 font-heading text-2xl font-medium tracking-tight first:mt-0 lg:mt-20 [&+p]:mt-4!",
          className
        )}
        {...props}
      />
    )
  },
  h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "mt-8 scroll-m-28 font-heading text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
    <h4
      className={cn(
        "mt-8 scroll-m-28 font-heading text-lg font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
    <h5
      className={cn(
        "mt-8 scroll-m-28 text-lg font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
    <h6
      className={cn(
        "mt-8 scroll-m-28 text-base font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p
      className={cn("leading-relaxed [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn("font-medium", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.ComponentProps<"hr">) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <Table className={cn("my-6", className)} {...props} />
  ),
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <TableHead
      className={cn(
        "[&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <TableCell
      className={cn(
        "[&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  // Fenced code blocks: <pre><code className="language-x" data-meta="...">
  pre: ({ children }: React.ComponentProps<"pre">) => {
    if (!React.isValidElement<CodeElementProps>(children)) {
      return <pre>{children}</pre>
    }
    const { className, children: code, "data-meta": meta } = children.props
    return (
      <MdxCodeBlock
        code={typeof code === "string" ? code : ""}
        language={className?.replace(/^language-/, "")}
        meta={meta}
      />
    )
  },
  // Inline code only (code inside <pre> is handled by `pre` above).
  code: ({ className, ...props }: React.ComponentProps<"code">) => (
    <code
      className={cn(
        "relative rounded-md bg-muted px-[0.3rem] py-[0.1rem] font-mono text-[0.9em]",
        className
      )}
      {...props}
    />
  ),

  Kbd,
  Image: ({
    src,
    className,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<"img">) => (
    <Image
      className={cn("mt-6 rounded-md border", className)}
      src={typeof src === "string" ? src : ""}
      width={Number(width)}
      height={Number(height)}
      alt={alt || ""}
      {...props}
    />
  ),
  Button,
  Callout,
  LinkPreview,
}
