import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/lib/config';

import { Button } from '@/components/shadcn-ui/button';
import { Separator } from '@/components/shadcn-ui/separator';
import { BrandIcons } from '@/components/icons/brand-icons';
import { ModeSwitcher } from '@/components/layout/mode-switcher';

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container-wrapper px-6">
        <div className="container flex h-12 items-center justify-between border-b md:h-20">
          <Link
            href="/"
            className="hover:bg-accent/20 flex items-center gap-4 rounded-md p-2"
            aria-label="Return to top page"
            title="Return to top page"
          >
            <Image
              src="/images/avatars/cakegaly.webp"
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
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="h-8 shadow-none"
            >
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <BrandIcons.gitHub />
              </Link>
            </Button>
            <Separator orientation="vertical" />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
