import { MetadataRoute } from 'next';
import servicesData from '@/lib/content/services-full.json';
import blogPosts from '@/lib/content/blog.json';

const BASE_URL = 'https://kalki.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/ki-bot', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/ki-cloud', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/blog', priority: 0.8, changeFrequency: 'daily' },
    { url: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/hiring', priority: 0.6, changeFrequency: 'weekly' },
    { url: '/contact', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/legal/privacy', priority: 0.4, changeFrequency: 'yearly' },
    { url: '/legal/terms', priority: 0.4, changeFrequency: 'yearly' },
  ];

  const servicePages = servicesData.map((s: any) => ({
    url: `/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  }));

  const blogPages = blogPosts.map((p: any) => ({
    url: `/blog/${p.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: new Date(p.date || Date.now()),
  }));

  const all = [...staticPages, ...servicePages, ...blogPages];

  return all.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: page.lastModified || new Date(),
    changeFrequency: page.changeFrequency || 'weekly',
    priority: page.priority || 0.5,
  }));
}
