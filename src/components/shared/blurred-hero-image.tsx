import Image from 'next/image';

import { AspectRatio } from '@/components/shadcn-ui/aspect-ratio';

interface BlurredHeroImageProps {
  imageUrl: string;
  alt: string;
}

export function BlurredHeroImage({ imageUrl, alt }: BlurredHeroImageProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt="blurred image"
          fill
          className="scale-105 object-cover blur-md brightness-50"
          priority
          aria-hidden="true"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-0">
        <AspectRatio ratio={16 / 9} className="overflow-hidden shadow-lg">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </AspectRatio>
      </div>
    </div>
  );
}
