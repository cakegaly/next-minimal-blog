import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { tags } from "@/lib/blog"
import { paginateItems, PaginationResult } from "@/lib/pagination"

const blogDir = path.join(process.cwd(), "src", "content", "blog")

export const DEFAULT_BLOG_LIST_LIMIT = 6

export type Frontmatter<T extends object = object> = {
  title: string
  date: string
  description: string
} & T

export type MDXData<T extends object = object> = {
  metadata: Frontmatter<T>
  slug: string
  content?: React.ReactNode
  rawContent: string
}

export type BlogPost = MDXData<{
  thumbnail?: string
  tags?: string[]
}>

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = await getMDXData(blogDir)
  warnUnknownTags(posts)
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
}

export async function getBlogPosts(
  page = 1,
  pageSize = DEFAULT_BLOG_LIST_LIMIT
): Promise<PaginationResult<BlogPost>> {
  const posts = await getAllBlogPosts()
  return paginateItems(posts, page, pageSize)
}

export async function getBlogPostsByTagSlug(
  tagSlug: string
): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  return posts.filter((post) => post.metadata.tags?.includes(tagSlug))
}

export async function getBlogPostBySlug(slug: string) {
  return getBlogPost((post) => post.slug === slug)
}

async function getBlogPost(
  predicate: (post: BlogPost) => boolean
): Promise<BlogPost | undefined> {
  const posts = await getAllBlogPosts()
  return posts.find(predicate)
}

async function getMDXData<T extends object>(
  dir: string
): Promise<MDXData<T>[]> {
  const files = await getMDXFiles(dir)
  return Promise.all(files.map((file) => readMDXFile<T>(path.join(dir, file))))
}

async function getMDXFiles(dir: string): Promise<string[]> {
  return (await fs.promises.readdir(dir)).filter(
    (file) => path.extname(file) === ".mdx"
  )
}

async function readMDXFile<T extends object>(
  filePath: string
): Promise<MDXData<T>> {
  const rawContent = await fs.promises.readFile(filePath, "utf-8")

  const { data, content } = matter(rawContent)

  return {
    metadata: data as Frontmatter<T>,
    slug: path.basename(filePath, path.extname(filePath)),
    rawContent: content,
  }
}

const warnedTags = new Set<string>()

/**
 * Posts may use tags that are not defined in `src/lib/blog.ts`. They are
 * still shown (without a link or tag page), but we warn so typos are noticed.
 */
function warnUnknownTags(posts: BlogPost[]) {
  for (const post of posts) {
    for (const tag of post.metadata.tags ?? []) {
      const key = `${post.slug}:${tag}`
      if (tag in tags || warnedTags.has(key)) continue
      warnedTags.add(key)
      console.warn(
        `[blog] Tag "${tag}" in "${post.slug}.mdx" is not defined in src/lib/blog.ts. It is shown without a tag page.`
      )
    }
  }
}
