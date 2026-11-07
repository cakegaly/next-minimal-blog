'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn-ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem as UICarouselItem,
  type CarouselApi,
} from '@/components/shadcn-ui/carousel';

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  // Lazily create the plugin once (useState instead of useRef so it can be
  // read during render without violating the React Compiler rules).
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) return;

    const onPlay = () => setIsPlaying(true);
    const onStop = () => setIsPlaying(false);

    api.on('autoplay:play', onPlay);
    api.on('autoplay:stop', onStop);

    return () => {
      api.off('autoplay:play', onPlay);
      api.off('autoplay:stop', onStop);
    };
  }, [api]);

  const toggleAutoplay = () => {
    if (autoplay.isPlaying()) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  };

  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <Carousel
        setApi={setApi}
        plugins={[autoplay]}
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full"
        onMouseEnter={autoplay.stop}
        onMouseLeave={autoplay.reset}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item, index) => (
            <UICarouselItem
              key={index}
              className="basis-[80%] pl-2 sm:basis-[70%] md:basis-[50%] md:pl-4 lg:basis-[40%] xl:basis-[30%]"
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
          onClick={() => api?.scrollPrev()}
          variant="outline"
          size="icon"
          className="size-12 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Slide to Prev Item"
        >
          <ChevronLeftIcon className="size-6" />
        </Button>
        <Button
          onClick={toggleAutoplay}
          variant="outline"
          size="icon"
          className="size-12 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label={isPlaying ? 'Pause Slide' : 'Play Slide'}
        >
          {isPlaying ? (
            <PauseIcon className="size-6" />
          ) : (
            <PlayIcon className="ml-0.5 size-6" />
          )}
        </Button>
        <Button
          onClick={() => api?.scrollNext()}
          variant="outline"
          size="icon"
          className="size-12 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Slide to Next Item"
        >
          <ChevronRightIcon className="size-6" />
        </Button>
      </div>
    </div>
  );
}
