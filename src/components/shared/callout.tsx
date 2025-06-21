import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';

type CalloutType = 'info' | 'note' | 'warning' | 'danger';

interface CalloutProps {
  children?: React.ReactNode;
  type?: CalloutType;
  title?: string;
  className?: string;
}

const calloutStyles: Record<
  CalloutType,
  {
    icon: React.ElementType;
    title: string;
    containerClasses: string;
    iconClasses: string;
    titleClasses: string;
  }
> = {
  info: {
    icon: Icons.info,
    title: 'Info',
    containerClasses:
      'border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/30',
    iconClasses: 'text-blue-600 dark:text-blue-400',
    titleClasses: 'text-blue-800 dark:text-blue-300',
  },
  note: {
    icon: Icons.fileText,
    title: 'Note',
    containerClasses:
      'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30',
    iconClasses: 'text-slate-600 dark:text-slate-400',
    titleClasses: 'text-slate-800 dark:text-slate-300',
  },
  warning: {
    icon: Icons.alertTriangle,
    title: 'Warning',
    containerClasses:
      'border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/30',
    iconClasses: 'text-amber-600 dark:text-amber-400',
    titleClasses: 'text-amber-800 dark:text-amber-300',
  },
  danger: {
    icon: Icons.xCircle,
    title: 'Danger',
    containerClasses:
      'border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/30',
    iconClasses: 'text-red-600 dark:text-red-400',
    titleClasses: 'text-red-800 dark:text-red-300',
  },
};

export function Callout({
  children,
  type = 'info',
  title,
  className,
  ...props
}: CalloutProps) {
  const {
    icon: Icon,
    title: defaultTitle,
    containerClasses,
    iconClasses,
    titleClasses,
  } = calloutStyles[type];

  const calloutTitle = title || defaultTitle;

  return (
    <div
      className={cn(
        'my-6 rounded-lg border p-4 shadow-sm',
        containerClasses,
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 shrink-0">
          <Icon className={cn('size-5', iconClasses)} />
        </div>
        <div className="w-full min-w-0">
          <div className={cn('mb-1 font-medium', titleClasses)}>
            {calloutTitle}
          </div>
          <div className="text-foreground/90 [&>p]:my-0 [&>p:not(:first-child)]:mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
