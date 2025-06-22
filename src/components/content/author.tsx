import Image from 'next/image';
import Link from 'next/link';

interface AuthorProps {
  name: string;
  imageUrl: string;
  twitterId: string;
}

export function Author({ name, imageUrl, twitterId }: AuthorProps) {
  return (
    <Link
      href={`https://x.com/${twitterId}`}
      className="flex items-center gap-3 text-sm"
    >
      <Image
        src={imageUrl}
        alt={name}
        width={42}
        height={42}
        className="bg-muted rounded-full"
      />
      <div className="flex-1 text-left leading-tight">
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground text-xs">@{twitterId}</p>
      </div>
    </Link>
  );
}
