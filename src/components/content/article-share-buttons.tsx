'use client';

import { cn } from '@/lib/utils';

import { Button } from '@/components/shadcn-ui/button';
import { BrandIcons } from '@/components/icons/brand-icons';

interface ArticleShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  className?: string;
}

export function ArticleShareButtons({
  url,
  title,
  description,
  image,
  className = '',
}: ArticleShareButtonsProps) {
  return (
    <div className={`bg-muted rounded-xl p-4 md:p-8 ${className}`}>
      <div className="flex flex-col gap-4">
        <SnsShareButtons
          url={url}
          title={title}
          description={description}
          image={image}
        />
      </div>
    </div>
  );
}

interface ShareButtonProps {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  className?: string;
}

export function SnsShareButtons({
  url,
  title,
  description,
  image,
  className = '',
}: ShareButtonProps) {
  return (
    <div className={cn('flex flex-wrap justify-between gap-3', className)}>
      <FacebookShareButton url={url} title={title} className="min-w-0 flex-1" />
      <XShareButton url={url} title={title} className="min-w-0 flex-1" />
      <LineShareButton url={url} title={title} className="min-w-0 flex-1" />
      <PinterestShareButton
        url={url}
        description={description}
        image={image}
        className="min-w-0 flex-1"
      />
    </div>
  );
}

interface IndividualShareButtonProps extends ShareButtonProps {
  onClick?: () => void;
}

// Facebook Share Button
export function FacebookShareButton({
  url,
  className = '',
  onClick,
}: IndividualShareButtonProps) {
  const handleShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    onClick?.();
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleShare}
      className={cn(
        'border-brand-facebook bg-brand-facebook hover:border-brand-facebook/80 hover:bg-brand-facebook/80',
        'dark:border-brand-facebook dark:bg-brand-facebook dark:hover:border-brand-facebook/80 dark:hover:bg-brand-facebook/80',
        'text-primary-foreground hover:text-primary-foreground/80',
        'dark:text-secondary-foreground dark:hover:text-secondary-foreground/80',
        className
      )}
    >
      <BrandIcons.facebook className="size-6" />
      <span className="sr-only">Facebook share</span>
    </Button>
  );
}

// X (Twitter) Share Button
export function XShareButton({
  url,
  title = '',
  className = '',
  onClick,
}: IndividualShareButtonProps) {
  const handleShare = () => {
    const text = title ? `${title} ` : '';
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    onClick?.();
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleShare}
      className={cn(
        'border-brand-x bg-brand-x hover:border-brand-x/80 hover:bg-brand-x/80',
        'dark:border-brand-x dark:bg-brand-x dark:hover:border-brand-x/80 dark:hover:bg-brand-x/80',
        'text-primary-foreground hover:text-primary-foreground/80',
        'dark:text-secondary-foreground dark:hover:text-secondary-foreground/80',
        className
      )}
    >
      <BrandIcons.x className="size-6" />
      <span className="sr-only">X Post</span>
    </Button>
  );
}

// LINE Share Button
export function LineShareButton({
  url,
  title = '',
  className = '',
  onClick,
}: IndividualShareButtonProps) {
  const handleShare = () => {
    const text = title ? `${title} ` : '';
    const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    onClick?.();
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleShare}
      className={cn(
        'border-brand-line bg-brand-line hover:border-brand-line/80 hover:bg-brand-line/80',
        'dark:border-brand-line dark:bg-brand-line dark:hover:border-brand-line/80 dark:hover:bg-brand-line/80',
        'text-primary-foreground hover:text-primary-foreground/80',
        'dark:text-secondary-foreground dark:hover:text-secondary-foreground/80',
        className
      )}
    >
      <BrandIcons.line className="size-6" />
      <span className="sr-only">LINE Share</span>
    </Button>
  );
}

// Pinterest Share Button
export function PinterestShareButton({
  url,
  description = '',
  image = '',
  className = '',
  onClick,
}: IndividualShareButtonProps) {
  const handleShare = () => {
    const shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}&media=${encodeURIComponent(image)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    onClick?.();
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleShare}
      className={cn(
        'border-brand-pinterest bg-brand-pinterest hover:border-brand-pinterest/80 hover:bg-brand-pinterest/80',
        'dark:border-brand-pinterest dark:bg-brand-pinterest dark:hover:border-brand-pinterest/80 dark:hover:bg-brand-pinterest/80',
        'text-primary-foreground hover:text-primary-foreground/80',
        'dark:text-secondary-foreground dark:hover:text-secondary-foreground/80',
        className
      )}
    >
      <BrandIcons.pinterest className="size-6" />
      <span className="sr-only">Pinterest save</span>
    </Button>
  );
}
