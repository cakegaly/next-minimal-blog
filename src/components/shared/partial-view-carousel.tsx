'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { Pause, Play } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/shadcn-ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem as UICarouselItem,
  type CarouselApi,
} from '@/components/shadcn-ui/carousel';
import { Icons } from '@/components/icons';

interface CarouselItem {
  title: string;
  imageUrl: string;
  href: string;
}

interface PartialViewCarouselProps {
  items: CarouselItem[];
  className?: string;
}

export function PartialViewCarousel({
  items,
  className,
}: PartialViewCarouselProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    // Set initial viewport width
    setViewportWidth(window.innerWidth);

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!api) return;

    const onAutoplay = () => {
      setIsPlaying(!plugin.current.isPlaying());
    };

    api.on('autoplay:play', onAutoplay);
    api.on('autoplay:stop', onAutoplay);

    return () => {
      api.off('autoplay:play', onAutoplay);
      api.off('autoplay:stop', onAutoplay);
    };
  }, [api]);

  // Calculate optimal item size based on viewport width
  const getItemSize = () => {
    if (viewportWidth < 640) return 'basis-[80%]';
    if (viewportWidth < 768) return 'basis-[70%]';
    if (viewportWidth < 1024) return 'basis-[50%]';
    if (viewportWidth < 1280) return 'basis-[40%]';
    return 'basis-[30%]';
  };

  const toggleAutoplay = () => {
    if (plugin.current.isPlaying()) {
      plugin.current.stop();
    } else {
      plugin.current.play();
    }
  };

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  if (!isMounted) {
    return (
      // TODO: set pc size position for preventing layout shift
      <div className="bg-muted/20 h-[300px] w-full animate-pulse rounded-lg" />
    );
  }

  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item, index) => (
            <UICarouselItem
              key={index}
              className={cn('pl-2 md:pl-4', getItemSize())}
            >
              <Link href={item.href}>
                <div className="flex h-full flex-col gap-6 overflow-hidden rounded-xl border">
                  <div className="relative">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={item.imageUrl || '/placeholder.svg'}
                        alt={`${item.title} thumbnail image`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 640px) 80vw, (max-width: 768px) 70vw, (max-width: 1024px) 50vw, (max-width: 1280px) 40vw, 30vw"
                      />
                    </div>
                    <div className="px-4 py-3">
                      <p className="line-clamp-2 text-sm font-semibold tracking-widest sm:text-base">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </UICarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Custom Control Buttons */}
      <div className="my-4 flex items-center justify-center gap-2">
        <Button
          onClick={scrollPrev}
          variant="outline"
          size="icon"
          className="size-12 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Slide to Prev Item"
        >
          <Icons.chevronLeft className="size-6" />
        </Button>
        <Button
          onClick={toggleAutoplay}
          variant="outline"
          size="icon"
          className="size-12 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label={isPlaying ? 'Pause Slide' : 'Play Slide'}
        >
          {isPlaying ? (
            <Pause className="size-6" />
          ) : (
            <Play className="ml-0.5 size-6" />
          )}
        </Button>
        <Button
          onClick={scrollNext}
          variant="outline"
          size="icon"
          className="size-12 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Slide to Next Item"
        >
          <Icons.chevronRight className="size-6" />
        </Button>
      </div>
    </div>
  );
}
