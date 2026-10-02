// Page metadata: title, description, canonical address and share image, the same for every page.
import type { Metadata } from 'next';
import ogList from '@/content/og-list.json';
import { site } from './site';

const OG = new Set<string>(ogList);
// share images: a ready-made PNG in /public/og when there is one, otherwise one drawn on demand by /api/og
const ogName = (path: string) => (path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '-'));

export function pageMeta({ title, description = site.description, path, ogType = 'website', noindex = false, label }: {
  title?: string; description?: string; path: string; ogType?: 'website' | 'article'; noindex?: boolean; label?: string;
}): Metadata {
  const fullTitle = path === '/' ? 'Behavitor · Design & development studio' : `${title} · Behavitor`;
  const name = ogName(path);
  const image = OG.has(name)
    ? { url: `/og/${name}.png`, width: 1200, height: 630, alt: title || site.headline }
    : { url: `/api/og?title=${encodeURIComponent(title || site.headline)}${label ? `&label=${encodeURIComponent(label)}` : ''}`, width: 1200, height: 630, alt: title || site.headline };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: { url: path, type: ogType, siteName: 'Behavitor', locale: 'en_US', title: fullTitle, description, images: [image] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
