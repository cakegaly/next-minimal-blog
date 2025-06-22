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
      <Link href={link} aria-label={`Read more: ${title}`}>
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
            <CardContent className="space-y-2 p-3 pb-0 group-hover:opacity-50">
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
          <CardContent className="px-1 py-0">
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
      </Link>
    </Card>
  );
}
