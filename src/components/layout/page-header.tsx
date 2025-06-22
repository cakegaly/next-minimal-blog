import { cn } from '@/lib/utils';

export function PageHeader({
  className,
  children,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section className={cn('border-grid', className)} {...props}>
      <div className="container-wrapper">
        <div className="container flex flex-col gap-4 py-8">{children}</div>
      </div>
    </section>
  );
}

export function PageHeaderHeading({
  className,
  ...props
}: React.ComponentProps<'h1'>) {
  return (
    <h1 className={cn('text-foreground text-2xl', className)} {...props} />
  );
}

export function PageHeaderDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return <p className={cn('text-foreground text-sm', className)} {...props} />;
}
