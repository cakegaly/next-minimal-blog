import type { MetadataRoute } from 'next';

import { tags } from '@/lib/blog';
import { siteConfig } from '@/lib/config';
import { getAllBlogPosts } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;

  const posts = await getAllBlogPosts();
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
  }));

  const tagPages = Object.keys(tags).map((slug) => ({
    url: `${baseUrl}/tag/${slug}`,
  }));

  const staticPages = [
    {
      url: baseUrl,
    },
  ];

  return [...staticPages, ...blogPages, ...tagPages];
}
