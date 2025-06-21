import { cn } from '@/lib/utils';

import { Separator } from '@/components/shadcn-ui/separator';

interface PageHeaderProps {
  heading: string;
  text?: string;
  className?: string;
}

export function PageHeader({ heading, text, className }: PageHeaderProps) {
  return (
    <>
      <div className={cn('space-y-4', className)}>
        <h1 className="inline-block text-2xl">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <Separator className="my-4" />
    </>
  );
}
