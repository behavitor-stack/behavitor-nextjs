// AI news: headlines from public RSS/Atom feeds, refreshed daily by the cron job at /api/cron/news.
// - Headlines, a short summary and a link to the original article only; the full story stays with the publisher.
// - Politics, government, regulation, legal and military stories are filtered out on purpose.
// - If every feed fails, the previous headlines are kept.
import 'server-only';
import { unstable_cache } from 'next/cache';
import { get, put } from '@vercel/blob';
import seedNews from '@/content/news-seed.json';
import { blobReady } from './posts';

export interface NewsItem { title: string; link: string; source: string; kind: 'news' | 'labs'; date: string; summary: string }
export interface News { updated: string | null; items: NewsItem[] }

const BLOB_PATH = 'news/cache.json';
const DAYS = 14;
const MAX = 60;

// kind: 'news' (reporting) or 'labs' (announcements straight from AI companies and research groups)
const FEEDS: { source: string; kind: NewsItem['kind']; url: string }[] = [
  { source: 'TechCrunch', kind: 'news', url: 'https://techcrunch.com/category/artificial-intelligence/feed/' },
  { source: 'The Verge', kind: 'news', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml' },
  { source: 'Ars Technica', kind: 'news', url: 'https://arstechnica.com/ai/feed/' },
  { source: 'MIT Technology Review', kind: 'news', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed' },
  { source: 'Wired', kind: 'news', url: 'https://www.wired.com/feed/tag/ai/latest/rss' },
  { source: 'OpenAI', kind: 'labs', url: 'https://openai.com/news/rss.xml' },
  { source: 'Google', kind: 'labs', url: 'https://blog.google/technology/ai/rss/' },
  { source: 'Google DeepMind', kind: 'labs', url: 'https://deepmind.google/blog/rss.xml' },
  { source: 'Hugging Face', kind: 'labs', url: 'https://huggingface.co/blog/feed.xml' },
];

// stories we deliberately leave out: politics, government, regulation, legal fights and military
const OFF_TOPIC = /\b(elections?|electoral|senat\w*|congress\w*|parliament\w*|lawmakers?|legislat\w*|regulat\w*|government\w*|governor|white house|president\w*|prime minister|minister\w*|trump|biden|harris|vance|pentagon|military|defen[cs]e department|department of|national security|sanctions?|tariffs?|export controls?|politic\w*|campaign\w*|court\w*|judge\w*|lawsuits?|sued|sues|suing|antitrust|ftc|doj|attorney general|eu ai act|geopolitic\w*|gov'?t|gov’t|govt|protest\w*|activis\w*|unions?|strikes?|\.gov)\b/i;

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', hellip: '…', mdash: '—', ndash: '–' };
const decode = (s: string) => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&(amp|lt|gt|quot|apos|nbsp|rsquo|lsquo|ldquo|rdquo|hellip|mdash|ndash);/g, (_, e) => ENTITIES[e]);
const text = (s?: string) => decode(decode(s || '')).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const tag = (block: string, name: string) => (block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i')) || [, ''])[1];
const clip = (s: string, n = 170) => (s.length <= n ? s : `${s.slice(0, s.lastIndexOf(' ', n))}…`);

const parse = (xml: string, feed: (typeof FEEDS)[number]): NewsItem[] => {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
  return blocks.map(b => {
    const title = text(tag(b, 'title'));
    let link = text(tag(b, 'link'));
    if (!link) link = (b.match(/<link[^>]*href="([^"]+)"/i) || [, ''])[1] || '';
    const when = text(tag(b, 'pubDate')) || text(tag(b, 'published')) || text(tag(b, 'updated')) || text(tag(b, 'dc:date'));
    const summary = clip(text(tag(b, 'description')) || text(tag(b, 'summary')) || text(tag(b, 'content')));
    const date = new Date(when);
    return { title, link, source: feed.source, kind: feed.kind, date: isNaN(+date) ? '' : date.toISOString(), summary };
  }).filter(x => x.title && /^https?:\/\//.test(x.link) && x.date);
};

// fetch every feed, filter and save. Returns a short report for the cron log.
export async function refreshNews() {
  const results = await Promise.allSettled(FEEDS.map(async feed => {
    const res = await fetch(feed.url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; BehavitorNews/1.0; +https://behavitor.com)' }, signal: AbortSignal.timeout(15000), cache: 'no-store' });
    if (!res.ok) throw new Error(String(res.status));
    return parse(await res.text(), feed);
  }));
  const report = FEEDS.map((f, i) => `${results[i].status === 'fulfilled' ? 'ok' : 'failed'} ${f.source}`);
  const items = results.flatMap(r => (r.status === 'fulfilled' ? r.value : []));
  if (!items.length) return { saved: 0, report, note: 'no feeds reachable; kept the previous headlines' };

  const since = Date.now() - DAYS * 864e5;
  const seen = new Set<string>();
  const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').slice(0, 8).join(' ');
  const fresh = items
    .filter(x => +new Date(x.date) >= since && +new Date(x.date) <= Date.now() + 36e5)
    .filter(x => !OFF_TOPIC.test(`${x.title} ${x.summary}`) && !OFF_TOPIC.test(x.link))
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter(x => { const k = norm(x.title); if (seen.has(k)) return false; seen.add(k); return true; })
    .slice(0, MAX);
  if (!fresh.length) return { saved: 0, report, note: 'nothing new passed the filters; kept the previous headlines' };

  await put(BLOB_PATH, JSON.stringify({ updated: new Date().toISOString(), items: fresh } satisfies News), {
    access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true,
  });
  return { saved: fresh.length, report };
}

// headlines for the pages, cached until the next refresh (tag: "news")
export const getNews = unstable_cache(async (): Promise<News> => {
  if (blobReady()) {
    const res = await get(BLOB_PATH, { access: 'private', useCache: false }).catch(() => null);
    if (res && res.statusCode === 200) return JSON.parse(await new Response(res.stream).text()) as News;
  }
  return seedNews as News;
}, ['news'], { tags: ['news'] });
