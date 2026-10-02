import Link from 'next/link';
import { allPosts, blobReady } from '@/lib/posts';
import { fmtDate } from '@/lib/site';
import Top from './top';

export const dynamic = 'force-dynamic';

const STATUS = { published: 'Published', draft: 'Draft', deleted: 'Hidden' } as const;

export default async function Posts({ searchParams }: { searchParams: Promise<{ section?: string }> }) {
  const { section } = await searchParams;
  const posts = (await allPosts()).filter(p => !section || p.section === section);
  return (
    <>
      <Top><Link href="/admin/new/" className="btn btn--dark btn--sm">New post</Link></Top>
      <main className="adm-main">
        {!blobReady() ? (
          <p className="samplenote"><span className="led" aria-hidden="true" /><span><b>Blob storage isn’t connected.</b> You can read posts here, but saving needs a Vercel Blob store connected to this project (see the README).</span></p>
        ) : null}
        <div className="adm-head">
          <h1>Posts</h1>
          <div className="chips" role="group" aria-label="Section">
            {[['', 'All'], ['blog', 'Blog'], ['ai', 'AI']].map(([k, t]) => (
              <Link key={k} href={k ? `/admin/?section=${k}` : '/admin/'} className={`chip${(section || '') === k ? ' is-on' : ''}`}>{t}</Link>
            ))}
          </div>
        </div>
        <table className="adm-table">
          <thead><tr><th>Title</th><th>Section</th><th>Topic</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {posts.map(p => (
              <tr key={`${p.section}/${p.slug}`} className={p.status === 'deleted' ? 'is-muted' : undefined}>
                <td><Link href={`/admin/edit/${p.section}/${p.slug}/`}>{p.title}</Link>{p.source === 'seed' ? <span className="adm-tag">from code</span> : null}</td>
                <td>{p.section === 'ai' ? 'AI' : 'Blog'}</td>
                <td>{p.tag}</td>
                <td>{fmtDate(p.date)}</td>
                <td><span className={`adm-status is-${p.status}`}>{STATUS[p.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
