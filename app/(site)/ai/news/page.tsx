import Link from 'next/link';
import FilterBar from '@/components/client/filters';
import Newsletter from '@/components/client/newsletter';
import { NewsRow } from '@/components/news';
import { Led, PostCard, SectionHead } from '@/components/ui';
import { fmtDate } from '@/lib/site';
import { getPosts } from '@/lib/posts';
import { getNews } from '@/lib/news';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  path: '/ai/news/', title: 'AI news',
  description: 'The latest from across the AI world, updated daily: launches, research and tools from leading publications and AI labs. No politics.',
});

export default async function AiNews() {
  const [news, posts] = await Promise.all([getNews(), getPosts('ai')]);
  return (
    <>
      <header className="aihero aihero--sm">
        <nav className="crumbs crumbs--dark" aria-label="Breadcrumb"><ol><li><Link href="/ai/">AI</Link></li><li>News</li></ol></nav>
        <h1>What’s happening in AI.</h1>
        <p className="lead">The latest from across the AI world, updated daily: launches, research and tools. No politics.</p>
        {news.updated ? <p className="aihero__updated"><Led />Updated <time dateTime={news.updated}>{fmtDate(news.updated)}</time></p> : null}
      </header>

      <section className="block block--tight">
        {news.items.length ? <>
          <FilterBar label="Filter by source type" tags={['News', 'From the labs']} total={news.items.length} grid="news-grid" empty="news-empty" />
          <div className="nlist" id="news-grid">{news.items.map(n => <NewsRow key={n.link} n={n} />)}</div>
          <p className="filters__empty" id="news-empty" hidden>Nothing here right now. <Link href="/ai/news/">See all AI news</Link></p>
        </> : (
          <div className="soon"><div><p className="label"><Led />Warming up</p><h2>Headlines arrive with the next update.</h2><p>This page refreshes every day with the latest AI launches, research and tools.</p></div></div>
        )}
        <p className="studies__note">Headlines and short summaries come from each publisher’s public feed and link to the original article. They are selected automatically, not endorsed by us, and we leave out politics on purpose.</p>
      </section>

      <section className="block">
        <SectionHead kicker="Our view" title="What it means for design" href="/ai/" linkText="All AI articles" />
        <div className="bgrid">{posts.slice(0, 3).map(p => <PostCard key={p.slug} p={p} />)}</div>
      </section>

      <Newsletter />
    </>
  );
}
