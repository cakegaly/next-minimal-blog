import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { AboutCta } from "@/components/shared/about-cta"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative z-10 flex min-h-svh flex-col bg-background">
      <SiteHeader />
      {/* Demo notice on every page. Remove it when you use this template. */}
      <div className="container-wrapper">
        <div className="container pt-6">
          <AboutCta />
        </div>
      </div>
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  )
}
