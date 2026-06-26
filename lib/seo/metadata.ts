import type { Metadata } from 'next';
export function generatePageMetadata({ title, description, path }: { title: string; description: string; path?: string }): Metadata {
  const baseUrl = 'https://kalki.tech';
  return {
    title: `${title} | KALKI TECHNOLOGIES`,
    description,
    openGraph: { title, description, url: path ? `${baseUrl}${path}` : baseUrl, siteName: 'KALKI TECHNOLOGIES', images: [{ url: '/og-image.png', width: 1200, height: 630 }], locale: 'en_IN', type: 'website' },
    alternates: { canonical: path ? `${baseUrl}${path}` : baseUrl },
  };
}
