import { BrandIcons } from '@/components/icons/brand-icons';

export const author = {
  slug: 'cakegaly',
  name: 'cakegaly',
  image: '/images/avatars/cakegaly.webp',
  twitter: 'cakegaly',
};

export const tags: Record<
  string,
  { name: string; icon: keyof typeof BrandIcons }
> = {
  mdx: { name: 'MDX', icon: 'mdx' },
  nextjs: { name: 'Next.js', icon: 'nextjs' },
  tailwind: { name: 'Tailwind CSS', icon: 'tailwind' },
  typescript: { name: 'TypeScript', icon: 'ts' },
};
