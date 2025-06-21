import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/shadcn-ui/badge';

interface LinkBadgeProps {
  label: string;
  link: string;
  className?: string;
}

export function LinkBadge({ label, link, className }: LinkBadgeProps) {
  return (
    <Badge
      className={cn('rounded-full font-normal', className)}
      variant="outline"
      asChild
    >
      <Link href={link}>{label}</Link>
    </Badge>
  );
}
