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
        <div className="container flex h-12 items-center gap-2 border-b **:data-[slot=separator]:!h-4 md:h-16">
          <Button asChild variant="ghost" size="icon" className="flex size-10">
            <Link href="/">
              <Image
                src="/images/avatars/cakegaly.webp"
                alt="cakegaly icon"
                width={32}
                height={32}
                className="ring-border rounded-full ring-1"
                priority={true}
              />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </Button>
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
