import Image from 'next/image';
import Link from 'next/link';

import { AspectRatio } from '@/components/shadcn-ui/aspect-ratio';
import { Card, CardContent, CardHeader } from '@/components/shadcn-ui/card';

interface LinkCardProps {
  title: string;
  imageUrl: string;
  link: string;
  badgeText?: string;
  description?: string;
  priority?: boolean;
  variant?: 'vertical' | 'horizontal' | 'mini' | 'internal' | 'hero';
}

export function LinkCard({
  title,
  imageUrl,
  link,
  badgeText,
  priority = false,
  variant = 'vertical',
  description,
}: LinkCardProps) {
  return (
    <Card className="group overflow-hidden rounded-none border-none py-2 shadow-none">
      <Link href={link} prefetch={false} aria-label={`記事を読む: ${title}`}>
        {variant === 'vertical' && (
          <>
            <CardHeader className="p-0">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={imageUrl}
                  alt={`${title}のサムネイル画像`}
                  fill
                  className="object-cover transition-opacity group-hover:opacity-50"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={priority}
                />
              </AspectRatio>
            </CardHeader>
            <CardContent className="space-y-2 p-0 pt-3 group-hover:opacity-50">
              <p className="line-clamp-2 text-base">{title}</p>
              {description && (
                <p className="line-clamp-2 text-xs">{description} </p>
              )}
              {badgeText && (
                <p className="text-muted-foreground text-xs">{badgeText}</p>
              )}
            </CardContent>
          </>
        )}
        {variant === 'horizontal' && (
          <CardContent className="p-0 group-hover:opacity-50">
            <div className="hidden gap-4 md:flex">
              <div className="relative w-[30%]">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={imageUrl}
                    alt={`${title}のサムネイル画像`}
                    fill
                    className="object-cover transition-opacity"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    priority={priority}
                  />
                </AspectRatio>
              </div>
              <div className="w-[70%] space-y-1">
                <p className="line-clamp-2 text-base">{title}</p>
                {description && (
                  <p className="line-clamp-2 text-xs">{description} </p>
                )}
                {badgeText && (
                  <p className="text-muted-foreground text-xs">{badgeText}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 md:hidden">
              <div className="relative w-1/5">
                <AspectRatio ratio={1 / 1} className="">
                  <Image
                    src={imageUrl}
                    alt={`${title}のサムネイル画像`}
                    fill
                    className="object-cover transition-opacity group-hover:opacity-50"
                    sizes="(min-width: 768px) 20vw, 30vw"
                    priority={priority}
                  />
                </AspectRatio>
              </div>
              <div className="w-4/5 space-y-1">
                <p className="line-clamp-2 text-[13px] group-hover:opacity-50">
                  {title}
                </p>
                {badgeText && (
                  <p className="text-muted-foreground text-[11px]">
                    {badgeText}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        )}
        {variant === 'mini' && (
          <CardContent className="p-0">
            <div className="flex gap-2">
              <div className="relative w-1/5">
                <AspectRatio ratio={1 / 1} className="">
                  <Image
                    src={imageUrl}
                    alt={`${title}のサムネイル画像`}
                    fill
                    className="object-cover transition-opacity group-hover:opacity-50"
                    sizes="(min-width: 768px) 20vw, 30vw"
                    priority={priority}
                  />
                </AspectRatio>
              </div>
              <div className="w-4/5 space-y-1">
                <p className="line-clamp-2 text-[13px] group-hover:opacity-50">
                  {title}
                </p>
                {badgeText && (
                  <p className="text-muted-foreground text-[11px] group-hover:opacity-50">
                    {badgeText}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        )}
        {variant === 'internal' && (
          <CardContent className="rounded-sm border p-2">
            <div className="flex items-center gap-2">
              <div className="relative w-1/4 md:w-1/6">
                <AspectRatio ratio={1 / 1} className="">
                  <Image
                    src={imageUrl}
                    alt={`${title}のサムネイル画像`}
                    fill
                    className="object-cover transition-opacity group-hover:opacity-50"
                    sizes="(min-width: 1024px) 18vw, (min-width: 768px) 25vw, 30vw"
                    priority={priority}
                  />
                </AspectRatio>
              </div>
              <div className="w-3/4 space-y-1 md:w-5/6">
                <p className="line-clamp-2 text-sm font-bold group-hover:opacity-50 md:text-base">
                  {title}
                </p>
              </div>
            </div>
          </CardContent>
        )}
        {variant === 'hero' && (
          <CardContent className="group relative flex aspect-[300/128] items-center justify-center overflow-hidden p-0">
            <Image
              src={imageUrl}
              alt={`${title}のサムネイル画像`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            <div className="bg-primary/40 absolute inset-0 opacity-100 transition-opacity duration-300" />
            <p className="text-card absolute inset-0 flex items-center justify-center p-4 text-center text-base opacity-100 transition-opacity duration-300">
              {title}
            </p>
          </CardContent>
        )}
      </Link>
    </Card>
  );
}
