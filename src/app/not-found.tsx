'use client';

import Link from 'next/link';
import { ArrowLeftIcon, HomeIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/shadcn-ui/button';

export default function NotFound() {
  return (
    <div className="container flex min-h-[calc(100vh-16rem)] max-w-screen-lg flex-col items-center justify-center">
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center text-center">
        <h1 className="bg-linear-to-b from-foreground to-foreground/50 bg-clip-text text-6xl font-bold text-transparent sm:text-7xl">
          404
        </h1>

        <div className="mt-4 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Not Found</h2>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
          >
            <HomeIcon className="size-4" />
            Home
          </Link>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>
        </div>

        <div className="mt-8 text-8xl font-bold opacity-10">{':('}</div>
      </div>
    </div>
  );
}
