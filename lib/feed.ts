import 'server-only';
import { site } from './site';
import type { Post } from './posts';

const xml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rssDate = (d: string) => new Date(`${d.slice(0, 10)}T09:00:00Z`).toUTCString();

export const rss = (title: string, desc: string, path: string, list: Post[]) => new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${xml(title)}</title>
  <link>${site.url}${path}</link>
  <description>${xml(desc)}</description>
  <language>en-us</language>
  <atom:link href="${site.url}${path}feed.xml" rel="self" type="application/rss+xml"/>
${list.map(p => `  <item>
    <title>${xml(p.title)}</title>
    <link>${site.url}${p.url}</link>
    <guid>${site.url}${p.url}</guid>
    <pubDate>${rssDate(p.date)}</pubDate>
    <category>${xml(p.tag)}</category>
    <description>${xml(p.excerpt)}</description>
  </item>`).join('\n')}
</channel>
</rss>
`, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } });
