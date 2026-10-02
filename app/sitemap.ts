import type { MetadataRoute } from 'next';
import { site, work, about, terms } from '@/lib/site';
import { getPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const today = new Date().toISOString().slice(0, 10);
  const pages = [
    '/', '/services/', '/work/', '/blog/', '/ai/', '/ai/news/', '/contact/', '/checklist/', '/sample-audit/', '/privacy/', '/accessibility/',
    ...(about.published ? ['/about/'] : []),
    ...(terms.published ? ['/terms/'] : []),
    ...work.map(w => `/work/${w.slug}/`),
  ];
  return [
    ...pages.map(p => ({ url: `${site.url}${p}`, lastModified: today })),
    ...posts.map(p => ({ url: `${site.url}${p.url}`, lastModified: p.updated || p.date })),
  ];
}
