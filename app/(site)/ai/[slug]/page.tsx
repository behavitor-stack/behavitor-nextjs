import { notFound } from 'next/navigation';
import ArticlePage from '@/components/article-page';
import { getPost, getPosts } from '@/lib/posts';
import { pageMeta } from '@/lib/meta';

// new posts from the editor render on first visit, then stay cached until the next edit
export const dynamicParams = true;
export const generateStaticParams = async () => (await getPosts('ai')).map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getPost('ai', (await params).slug);
  return p ? { ...pageMeta({ path: p.url, title: p.seoTitle || p.title, description: p.excerpt, ogType: 'article', label: 'AI' }), authors: [{ name: 'Behavitor' }] } : {};
}

export default async function AiPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [p, list] = await Promise.all([getPost('ai', slug), getPosts('ai')]);
  if (!p) notFound();
  return <ArticlePage p={p} list={list} sec={{ name: 'AI', base: '/ai/', dark: true }} />;
}
