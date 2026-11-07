import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ModeSwitcher } from "@/components/layout/mode-switcher"
import { BrandIcons } from "@/components/shared/brand-icons"
import { SiteLogo } from "@/components/shared/site-logo"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper px-6">
        <div className="container flex h-12 items-center gap-2 border-b **:data-[slot=separator]:h-4! md:h-16">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "flex size-10"
            )}
          >
            <SiteLogo className="size-8" />
            <span className="sr-only">{siteConfig.name}</span>
          </Link>
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "sm", variant: "ghost" }),
                "h-8 shadow-none"
              )}
            >
              <BrandIcons.gitHub />
              <span className="sr-only">GitHub Repository</span>
            </Link>
            <Separator orientation="vertical" />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
