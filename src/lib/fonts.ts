import {
  M_PLUS_1_Code as FontMono,
  M_PLUS_1 as FontSans,
  Inter,
} from 'next/font/google';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
});

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontInter.variable
);
