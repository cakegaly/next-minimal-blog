import type { TechIcons } from '@/components/icons';
import { AuthorConfig } from '@/types';

export const author: AuthorConfig = {
  slug: 'cakegaly',
  name: 'cakegaly',
  image: 'https://github.com/cakegaly.png',
  twitter: 'cakegaly',
};

export const postsPerPage = 5;

export const tags: Record<
  string,
  { name: string; icon: keyof typeof TechIcons }
> = {
  eslint: { name: 'ESLint', icon: 'eslint' },
  jamstack: { name: 'Jamstack', icon: 'jamstack' },
  nextjs: { name: 'Next.js', icon: 'nextjs' },
  react: { name: 'react', icon: 'react' },
  typescript: { name: 'TypeScript', icon: 'typescript' },
  wordpress: { name: 'WordPress', icon: 'wordpress' },
  vercel: { name: 'vercel', icon: 'vercel' },
};
