import Link from 'next/link';
import FilterBar from '@/components/client/filters';
import Newsletter from '@/components/client/newsletter';
import { PageHead, PostCard } from '@/components/ui';
import { getPosts } from '@/lib/posts';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({ path: '/blog/', title: 'Blog', description: 'Practical writing and research on design, search, UX and building websites.' });

export default async function Blog() {
  const posts = await getPosts('blog');
  const topics = [...new Set(posts.map(p => p.tag))];
  return (
    <>
      <PageHead kicker="Blog" title="Notes and research from the studio." lead="Practical writing on design, search, UX and building better websites." />
      {posts.length ? <>
        <section className="block block--tight" id="featured"><PostCard p={posts[0]} featured /></section>
        <section className="block block--sm">
          <FilterBar label="Filter by topic" tags={topics} total={posts.length} grid="post-grid" featured="featured" empty="post-empty" />
          <div className="bgrid" id="post-grid">{posts.map((p, i) => <PostCard key={p.slug} p={p} markFeatured={i === 0} />)}</div>
          <p className="filters__empty" id="post-empty" hidden>No articles on this topic yet. <Link href="/blog/">See all articles</Link></p>
        </section>
      </> : null}
      <Newsletter />
    </>
  );
}
