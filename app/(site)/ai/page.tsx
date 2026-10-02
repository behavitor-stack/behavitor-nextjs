import Link from 'next/link';
import FilterBar from '@/components/client/filters';
import Newsletter from '@/components/client/newsletter';
import { NewsRow } from '@/components/news';
import { Arr, Led, PostCard, SectionHead } from '@/components/ui';
import { aiPolicy } from '@/lib/site';
import { getPosts } from '@/lib/posts';
import { getNews } from '@/lib/news';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  path: '/ai/', title: 'AI',
  description: 'People, behavior and AI: how people really use AI features, how we use AI in our work, and how to be found in an AI-first world.',
});

export default async function Ai() {
  const [posts, news] = await Promise.all([getPosts('ai'), getNews()]);
  const topics = [...new Set(posts.map(p => p.tag))];
  return (
    <>
      <header className="aihero">
        <p className="label"><Led />AI</p>
        <h1>People, behavior and AI.</h1>
        <p className="lead">How people really behave with AI features, how we use AI in our own work, and how to be found when AI answers first.</p>
        <ul className="aihero__topics">
          {topics.map(t => <li key={t}><Link href={`/ai/?topic=${encodeURIComponent(t)}`}>{t}</Link></li>)}
          <li><Link href="/ai/news/">Latest AI news</Link></li>
          <li><a href="#how-we-use-ai">How we use AI</a></li>
        </ul>
      </header>

      {posts.length ? <>
        <section className="block block--tight" id="featured"><PostCard p={posts[0]} featured /></section>
        <section className="block block--sm">
          <FilterBar label="Filter by topic" tags={topics} total={posts.length} grid="post-grid" featured="featured" empty="post-empty" />
          <div className="bgrid" id="post-grid">{posts.map((p, i) => <PostCard key={p.slug} p={p} markFeatured={i === 0} />)}</div>
          <p className="filters__empty" id="post-empty" hidden>No articles on this topic yet. <Link href="/ai/">See all AI articles</Link></p>
        </section>
      </> : null}

      {news.items.length ? (
        <section className="block">
          <SectionHead kicker="Updated daily" title="Latest AI news" href="/ai/news/" linkText="All AI news" />
          <div className="nlist nlist--short">{news.items.slice(0, 5).map(n => <NewsRow key={n.link} n={n} />)}</div>
        </section>
      ) : null}

      <section className="block" id="how-we-use-ai">
        <div className="policy">
          <div className="policy__intro">
            <p className="label"><Led />Our approach</p>
            <h2>{aiPolicy.title}</h2>
            <p>{aiPolicy.lead}</p>
            {posts.some(p => p.slug === 'how-we-use-ai-in-a-design-project') ? <Link href="/ai/how-we-use-ai-in-a-design-project/" className="more">See it stage by stage <Arr /></Link> : null}
          </div>
          <ul className="policy__points">
            {aiPolicy.points.map(([t, d]) => <li key={t}><span className="policy__lamp" aria-hidden="true" /><h3>{t}</h3><p>{d}</p></li>)}
          </ul>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
