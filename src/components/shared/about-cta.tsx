import { siteConfig } from '@/lib/config';

export function AboutCta() {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-surface p-6 text-sm text-surface-foreground">
      <div className="text-base leading-tight font-semibold">
        Welcome to the demo of next-minimal-blog!
      </div>
      <div className="text-muted-foreground">
        It&apos;s a minimal Next.js blog template, and the source code is
        available on{' '}
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        . Feel free to check it out and build your own!
      </div>
    </div>
  );
}
