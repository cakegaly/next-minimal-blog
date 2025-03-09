import { ImageLoader, ImageLoaderProps } from 'next/image';

const microCMSLoader: ImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  const url = new URL(src);
  const params = url.searchParams;

  params.set('w', Math.min(width, 640).toString());
  params.set('fit', params.get('fit') || 'max');
  params.set('q', (quality || 50).toString());

  if (!src.endsWith('.gif')) {
    params.set('fm', 'webp');
  }

  return url.href;
};

const localLoader: ImageLoader = ({ src, width }: ImageLoaderProps) => {
  return `${src}?w=${width}`;
};

const customLoader: ImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) =>
  src.startsWith('/')
    ? localLoader({ src, width, quality })
    : microCMSLoader({ src, width, quality });

export default customLoader;
