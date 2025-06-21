import Image from 'next/image';
import Link from 'next/link';
import profilePic from '@/assets/images/cakegaly.webp';

import { siteConfig } from '@/lib/config';

import { ModeSwitch } from '@/components/layout/mode-switch';

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container-wrapper px-6">
        <div className="container flex h-12 items-center justify-between border-b md:h-20">
          <Link
            href="/"
            className="hover:bg-accent/20 flex items-center gap-4 rounded-md p-2"
            aria-label="トップページに戻る"
            title="トップページに戻る"
          >
            <Image
              src={profilePic}
              alt="cakegaly icon"
              width={32}
              height={32}
              className="ring-border rounded-full ring-1"
              priority={true}
            />
            <span className="hidden font-mono text-sm tracking-widest md:block">
              {siteConfig.name}
            </span>
          </Link>
          <ModeSwitch />
        </div>
      </div>
    </header>
  );
}
