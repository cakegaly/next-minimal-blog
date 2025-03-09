import Image from 'next/image';
import Link from 'next/link';

import { ModeSwitch } from '@/components/layout/mode-switch';

export function SiteHeader() {
  return (
    <header className="container sticky top-0 z-40 border-b bg-background/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-md items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 rounded-sm p-2">
          <Image
            src="/images/cakegaly.webp"
            alt="logo"
            width="40"
            height="40"
            title="logo"
            className="rounded-full"
          />
          <span className="hidden font-mono text-foreground sm:inline">
            next-minimal-blog
          </span>
        </Link>
        <ModeSwitch />
      </div>
    </header>
  );
}
