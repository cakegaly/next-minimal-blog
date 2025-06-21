import { truncateText } from '@/lib/utils';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn-ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/shadcn-ui/card';

interface AuthorProps {
  name: string;
  imageUrl: string;
  bio?: string;
  role: string;
  variant?: 'card' | 'mini';
}

export function Author({
  name,
  imageUrl,
  bio,
  role,
  variant = 'card',
}: AuthorProps) {
  if (variant === 'card') {
    return (
      <Card className="max-w-sm">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarImage src={imageUrl} alt={name} className="object-cover" />
              <AvatarFallback>ava</AvatarFallback>
            </Avatar>
            <div className="grid gap-2">
              <div className="text-base">{name}</div>
              <div className="text-muted-foreground text-xs">{role}</div>
            </div>
          </div>
        </CardHeader>
        {bio && (
          <CardContent>
            <p className="text-xs leading-relaxed">{truncateText(bio, 104)}</p>
          </CardContent>
        )}
      </Card>
    );
  }

  if (variant === 'mini') {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="size-6">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>ava</AvatarFallback>
        </Avatar>
        <div className="text-[11px] font-semibold text-[#333030]">{name}</div>
      </div>
    );
  }
}
