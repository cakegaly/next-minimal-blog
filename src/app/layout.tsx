import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import { TailwindIndicator } from "@/components/shared/tailwind-indicator"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  description: siteConfig.description,
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "/rss.xml",
          title: "next-minimal-blog RSS Feed",
        },
      ],
    },
  },
  keywords: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "MDX"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: process.env.NEXT_PUBLIC_APP_URL!,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og.png`],
    creator: "@cakegaly",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${process.env.NEXT_PUBLIC_APP_URL}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, fontMono.variable)}
    >
      <body className="overscroll-none">
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <TailwindIndicator />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
