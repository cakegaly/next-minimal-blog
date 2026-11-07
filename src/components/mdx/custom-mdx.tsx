import * as React from "react"
import * as runtime from "react/jsx-runtime"
import { evaluate, type EvaluateOptions } from "@mdx-js/mdx"
import remarkGfm from "remark-gfm"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { mdxComponents } from "@/components/mdx/mdx-components"

interface CustomMDXProps {
  source: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalComponents?: Record<string, React.ComponentType<any>>
}

type HastNode = {
  type: string
  tagName?: string
  data?: { meta?: string | null }
  properties?: Record<string, unknown>
  children?: HastNode[]
}

/**
 * Copies the code fence meta string (e.g. `title="a.ts" showLineNumbers`)
 * onto the `<code>` element so the `pre` MDX component can read it.
 * MDX keeps it in `node.data.meta`, which is not passed to components.
 */
function rehypeCodeMeta() {
  return (tree: HastNode) => {
    const walk = (node: HastNode) => {
      if (node.tagName === "code" && node.data?.meta) {
        node.properties = { ...node.properties, "data-meta": node.data.meta }
      }
      node.children?.forEach(walk)
    }
    walk(tree)
  }
}

/**
 * Renders MDX content with provided components.
 *
 * The React runtime is passed directly to the MDX evaluator to avoid React
 * version conflicts between Next.js and MDX libraries.
 */
export async function CustomMDX({
  source,
  additionalComponents,
}: CustomMDXProps) {
  const options: EvaluateOptions = {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeCodeMeta],
  }

  let MDXContent: Awaited<ReturnType<typeof evaluate>>["default"]
  try {
    ;({ default: MDXContent } = await evaluate(source, options))
  } catch (error) {
    console.error("Error rendering MDX:", error)
    return (
      <Alert variant="destructive">
        <AlertTitle>Failed to render content</AlertTitle>
        <AlertDescription>
          An error occurred while rendering the content.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <MDXContent components={{ ...mdxComponents, ...additionalComponents }} />
  )
}
