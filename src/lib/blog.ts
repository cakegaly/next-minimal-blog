import { TechIcons } from '@/components/icons/tech-icons';

export const author = {
  slug: 'cakegaly',
  name: 'cakegaly',
  image: '/images/avatars/cakegaly.webp',
  twitter: 'cakegaly',
};

export const tags: Record<
  string,
  { name: string; icon: keyof typeof TechIcons }
> = {
  eslint: { name: 'ESLint', icon: 'eslint' },
  jamstack: { name: 'Jamstack', icon: 'jamstack' },
  nextjs: { name: 'Next.js', icon: 'nextjs' },
  react: { name: 'React', icon: 'react' },
  typescript: { name: 'TypeScript', icon: 'typescript' },
  wordpress: { name: 'WordPress', icon: 'wordpress' },
  vercel: { name: 'Vercel', icon: 'vercel' },
};
