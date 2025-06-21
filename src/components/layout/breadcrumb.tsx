import React from 'react';

import { cn } from '@/lib/utils';

import {
  Breadcrumb as BreadcrumbCN,
  BreadcrumbItem as BreadcrumbItemCN,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn-ui/breadcrumb';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export interface BreadcrumbItem {
  link?: string;
  label: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <div className={cn('overflow-x-scroll whitespace-nowrap', className)}>
      <BreadcrumbCN>
        <BreadcrumbList className="flex-nowrap">
          <BreadcrumbItemCN className="hover:underline">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItemCN>
          <BreadcrumbSeparator />
          {items.map((item, index) => (
            <React.Fragment key={`breadcrumb_items_${index}`}>
              <BreadcrumbItemCN className={item.link && 'hover:underline'}>
                {item.link ? (
                  <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItemCN>
              {items.length - 1 > index && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </BreadcrumbCN>
    </div>
  );
}
