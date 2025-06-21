'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="bg-muted/30 flex h-full w-full items-center justify-center">
        <span className="text-muted-foreground/20 text-4xl">🔗</span>
      </div>
    );
  }

  return (
    <Image
      src={src || '/placeholder.svg'}
      alt={alt}
      className={cn('object-cover', className)}
      fill
      sizes="148px"
      onError={() => setError(true)}
      unoptimized={src.startsWith('http')}
    />
  );
}
