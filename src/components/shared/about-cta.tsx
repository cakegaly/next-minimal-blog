import { InfoIcon } from "lucide-react"

import { siteConfig } from "@/lib/config"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/** Demo notice, rendered in `src/app/(app)/layout.tsx`. */
export function AboutCta() {
  return (
    <Alert>
      <InfoIcon />
      <AlertTitle>This is a demo of next-minimal-blog</AlertTitle>
      <AlertDescription>
        <p>
          A minimal Next.js blog template. The source code is available on{" "}
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          . Feel free to use it to build your own blog!
        </p>
      </AlertDescription>
    </Alert>
  )
}
