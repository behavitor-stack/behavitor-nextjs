import { notFound } from 'next/navigation';
import { allPosts } from '@/lib/posts';
import EditorPage from '../../../editor-page';

export const dynamic = 'force-dynamic';

export default async function EditPost({ params }: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = await params;
  const post = (await allPosts()).find(p => p.section === section && p.slug === slug);
  if (!post) notFound();
  return <EditorPage post={post} />;
}
