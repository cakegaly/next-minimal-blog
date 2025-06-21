import { NextResponse } from 'next/server';

import { siteConfig } from '@/config/site';
import { getAllBlogPosts } from '@/lib/mdx';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;
  const posts = await getAllBlogPosts();

  const rssXml = `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Your Blog Name</title>
        <link>${baseUrl}</link>
        <description>Your blog description here</description>
        <language>ja</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        ${posts
          .map((post) => {
            return `
              <item>
                <title><![CDATA[${post.metadata.title}]]></title>
                <link>${baseUrl}/blog/${post.slug}</link>
                <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
                <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
                <description><![CDATA[${post.metadata.description || ''}]]></description>
                ${
                  post.metadata.tags
                    ? post.metadata.tags
                        .map((tag) => `<category>${tag}</category>`)
                        .join('')
                    : ''
                }
              </item>
            `;
          })
          .join('')}
      </channel>
    </rss>
  `.trim();

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
