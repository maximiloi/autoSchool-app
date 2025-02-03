'use client';
import { useSelectedLayoutSegments } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

export default function AppBreadcrumb() {
  const segments = useSelectedLayoutSegments();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => (
          <BreadcrumbItem>
            <BreadcrumbPage key={index}>{segment}</BreadcrumbPage>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
