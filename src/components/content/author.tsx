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
        className="rounded-full bg-muted"
      />
      <div className="flex-1 text-left leading-tight">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">@{twitterId}</p>
      </div>
    </Link>
  );
}
