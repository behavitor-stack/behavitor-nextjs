// Posts for the blog and the AI section.
// Seed posts live in /content (posts.js, ai-posts.js). Posts written or edited in the /admin editor are saved
// as JSON in a private Vercel Blob store and take priority over a seed post with the same section and slug.
// A post saved with status "deleted" hides a seed post.
import 'server-only';
import { unstable_cache } from 'next/cache';
import { list, get, put, del } from '@vercel/blob';
import { posts as seedBlog, aiPosts as seedAi } from '@/content/data.js';
import { markdownToHtml } from './markdown';

export type Section = 'blog' | 'ai';
export type Status = 'draft' | 'published' | 'deleted';

// what is stored (seed files and Blob share this shape)
export interface PostInput {
  slug: string;
  section: Section;
  title: string;
  seoTitle?: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  tag: string;
  cover?: string; // a drawing name from content/art/post-art.js
  image?: string; // or an uploaded image (/media/…)
  excerpt: string;
  takeaways: string[];
  format: 'html' | 'md';
  body: string;
  status: Status;
}

// what pages use
export interface Post extends PostInput {
  html: string; // body as HTML
  words: number;
  read: number; // minutes
  url: string;
  source: 'seed' | 'blob';
}

export const blobReady = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const PREFIX = 'posts/';
const pathFor = (section: Section, slug: string) => `${PREFIX}${section}/${slug}.json`;

const finish = (p: PostInput, source: Post['source']): Post => {
  const html = p.format === 'md' ? markdownToHtml(p.body) : p.body;
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return { ...p, html, words, read: Math.max(1, Math.round(words / 230)), url: `/${p.section}/${p.slug}/`, source };
};

type SeedPost = { slug: string; title: string; seoTitle?: string; date: string; updated?: string; tag: string; cover?: string; image?: string; excerpt: string; takeaways?: string[]; body: string };
const seed = (list: SeedPost[], section: Section): PostInput[] =>
  list.map(p => ({ takeaways: [], ...p, section, format: 'html', status: 'published' }));

const seedPosts = (): PostInput[] => [...seed(seedBlog as SeedPost[], 'blog'), ...seed(seedAi as SeedPost[], 'ai')];

async function readBlob(pathname: string): Promise<PostInput | null> {
  const res = await get(pathname, { access: 'private', useCache: false });
  if (!res || res.statusCode !== 200) return null;
  return JSON.parse(await new Response(res.stream).text()) as PostInput;
}

// every post the editor knows about, drafts and deletions included (not cached: the editor needs the latest)
export async function allPosts(): Promise<Post[]> {
  const merged = new Map<string, Post>();
  for (const p of seedPosts()) merged.set(`${p.section}/${p.slug}`, finish(p, 'seed'));
  if (blobReady()) {
    let cursor: string | undefined;
    const paths: string[] = [];
    do {
      const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
      paths.push(...page.blobs.map(b => b.pathname));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    const stored = await Promise.all(paths.map(readBlob));
    for (const p of stored) if (p) merged.set(`${p.section}/${p.slug}`, finish(p, 'blob'));
  }
  return [...merged.values()].sort((a, b) => b.date.localeCompare(a.date));
}

// published posts for the site, cached until the editor saves something (tag: "posts")
const publishedPosts = unstable_cache(
  async () => (await allPosts()).filter(p => p.status === 'published'),
  ['published-posts'],
  { tags: ['posts'] },
);

export async function getPosts(section?: Section) {
  const posts = await publishedPosts();
  return section ? posts.filter(p => p.section === section) : posts;
}

export async function getPost(section: Section, slug: string) {
  return (await getPosts(section)).find(p => p.slug === slug) ?? null;
}

// editor: save, then the caller refreshes the "posts" tag
export async function savePost(p: PostInput) {
  await put(pathFor(p.section, p.slug), JSON.stringify(p, null, 2), {
    access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true,
  });
}

// editor: remove a post. Blob-only posts are deleted; seed posts are hidden with a "deleted" marker.
export async function removePost(section: Section, slug: string) {
  const isSeed = seedPosts().some(p => p.section === section && p.slug === slug);
  if (isSeed) {
    const base = seedPosts().find(p => p.section === section && p.slug === slug)!;
    await savePost({ ...base, status: 'deleted' });
  } else {
    await del(pathFor(section, slug));
  }
}

export const isSeedPost = (section: Section, slug: string) => seedPosts().some(p => p.section === section && p.slug === slug);
