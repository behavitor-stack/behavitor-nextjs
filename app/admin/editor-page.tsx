// Shared by "New post" and "Edit post": loads topics and cover drawings for the editor.
import { allPosts, blobReady, type Post } from '@/lib/posts';
import { coverNames, postArt } from '@/lib/site';
import Editor from './editor';
import Top from './top';

export default async function EditorPage({ post }: { post: Post | null }) {
  const posts = await allPosts();
  const topics = {
    blog: [...new Set(posts.filter(p => p.section === 'blog').map(p => p.tag))],
    ai: [...new Set(posts.filter(p => p.section === 'ai').map(p => p.tag))],
  };
  const covers = Object.fromEntries(coverNames.map(n => [n, postArt(n, 'slice')]));
  const initial = post ? {
    slug: post.slug, section: post.section, title: post.title, seoTitle: post.seoTitle, date: post.date, updated: post.updated, tag: post.tag,
    cover: post.cover, image: post.image, excerpt: post.excerpt, takeaways: post.takeaways, format: post.format, body: post.body, status: post.status,
  } : null;
  return (
    <>
      <Top />
      <main className="adm-main adm-main--wide">
        {!blobReady() ? (
          <p className="samplenote"><span className="led" aria-hidden="true" /><span><b>Blob storage isn’t connected.</b> You can try the editor, but saving needs a Vercel Blob store connected to this project.</span></p>
        ) : null}
        <Editor initial={initial} topics={topics} covers={covers} canSave={blobReady()} />
      </main>
    </>
  );
}
