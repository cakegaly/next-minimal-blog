import { SiteConfig } from '@/types';

/**
 * TODO: get site_url via T3 env
 *
 * @see https://env.t3.gg/
 */
export const siteConfig: SiteConfig = {
  name: 'next-minimal-blog',
  description:
    'next-minimal-blog is a lightweight, minimalistic blog template built with Next.js 15, MDX, Tailwind CSS, and shadcn/ui',
  url: 'https://next-minimal-blog-delta.vercel.app/',
  ogImage: 'https://next-minimal-blog-delta.vercel.app/og.png',
  links: {
    twitter: 'https://twitter.com/cakegaly',
    github: 'https://github.com/cakegaly/next-minimal-blog',
  },
  copyRight: 'cakegaly',
  email: 'next-minimal-blog@example.com',
};
