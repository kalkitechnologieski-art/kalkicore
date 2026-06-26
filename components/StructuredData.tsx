'use client';

import { usePathname } from 'next/navigation';
import { organizationSchema, websiteSchema } from '@/lib/seo/structuredData';

export default function StructuredData() {
  const pathname = usePathname();

  // Only render on client, but we inject JSON‑LD via script tags
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />
    </>
  );
}
