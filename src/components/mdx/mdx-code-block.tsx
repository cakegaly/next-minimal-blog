import { highlightCode } from "@/lib/highlighter"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import { getIconForLanguageExtension } from "@/components/shared/brand-icons"

interface MdxCodeBlockProps {
  code: string
  language?: string
  /** Code fence meta, e.g. `title="next.config.ts" showLineNumbers` */
  meta?: string
}

function parseMeta(meta = "") {
  return {
    title: /(?:title|filename)="([^"]*)"/.exec(meta)?.[1],
    showLineNumbers: /\bshowLineNumbers\b/.test(meta),
  }
}

/**
 * Server-rendered code block for MDX, built on shadcn/ui `CodeBlock` and the
 * shiki highlighter in `lib/highlighter.tsx`. Highlighting happens at build
 * time, so no highlighter code is shipped to the browser.
 */
export async function MdxCodeBlock({
  code,
  language = "plaintext",
  meta,
}: MdxCodeBlockProps) {
  const value = code.replace(/\n$/, "")
  const { title, showLineNumbers } = parseMeta(meta)
  // Unsupported languages (e.g. `plaintext`) fall back to plain lines.
  const lines = (await highlightCode(value, language)) ?? value.split("\n")

  const copyButton = <CodeBlockCopyButton value={value} />

  return (
    <CodeBlock className="mt-6">
      {title ? (
        <CodeBlockHeader>
          <CodeBlockTitle>
            {getIconForLanguageExtension(language)}
            {title}
          </CodeBlockTitle>
          <CodeBlockActions>{copyButton}</CodeBlockActions>
        </CodeBlockHeader>
      ) : (
        <CodeBlockActions>{copyButton}</CodeBlockActions>
      )}
      <CodeBlockContent lineNumbers={showLineNumbers}>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
