import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Label, Led, Plate, Raw } from '@/components/ui';
import { site, work, lawById, conceptArt, conceptNote } from '@/lib/site';
import { pageMeta } from '@/lib/meta';

export const dynamicParams = false;
export const generateStaticParams = () => work.map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = work.find(w => w.slug === slug);
  return p ? pageMeta({ path: `/work/${p.slug}/`, title: p.title, description: p.summary }) : {};
}

export default async function Concept({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = work.findIndex(w => w.slug === slug);
  if (i < 0) notFound();
  const p = work[i], next = work[(i + 1) % work.length], law = lawById[p.law];
  const art = (conceptArt as Record<string, { before: string; after: string }>)[p.slug];
  return (
    <>
      <header className="phead">
        <nav className="crumbs" aria-label="Breadcrumb"><ol><li><Link href="/work/">Work</Link></li><li>Concept</li></ol></nav>
        <h1>{p.title}</h1>
        <p className="lead">{p.summary}</p>
      </header>

      <Plate p={p} cls="plate--hero" />

      <dl className="specstrip">
        <div><dt>Concept for</dt><dd>{p.subject}</dd></div>
        <div><dt>Sector</dt><dd>{p.sector}</dd></div>
        <div><dt>Principle</dt><dd>{law.name}</dd></div>
        <div><dt>Year</dt><dd>{p.year}</dd></div>
      </dl>

      <article className="case">
        <section className="case__part"><h2 className="case__h">The problem</h2><p className="case__lead">{p.problem}</p></section>
        <section className="case__part case__law"><h2 className="case__h">The behavior behind it</h2><p><b>{law.name}.</b> {law.short}</p></section>
        <section className="case__part"><h2 className="case__h">What gets in the way</h2><ul className="issues">{p.issues.map(x => <li key={x}>{x}</li>)}</ul></section>
      </article>

      {art ? (
        <section className="ba" aria-label="Before and after">
          <figure className="ba__panel"><Raw className="ba__art" html={art.before} /><figcaption><b>Before</b> The common pattern</figcaption></figure>
          <figure className="ba__panel ba__panel--after"><Raw className="ba__art" html={art.after} /><figcaption><b>After</b> Our concept</figcaption></figure>
        </section>
      ) : null}

      <article className="case">
        <section className="case__part"><h2 className="case__h">Our concept</h2><p className="case__lead">{p.concept}</p></section>
        <section className="case__result">
          <h2 className="case__h"><Led />What we would expect</h2>
          <ul className="ticks ticks--lg">{p.expect.map(x => <li key={x}>{x}</li>)}</ul>
        </section>
        <p className="studies__note">{conceptNote}</p>
      </article>

      <section className="block">
        <div className="nextstep">
          <div>
            <p className="label"><Led />Seeing this on your site?</p>
            <h2>We can look at your website the same way.</h2>
            <p>An audit tests your own site against all twelve principles, with real visitors and your analytics, and ranks every fix by impact.</p>
          </div>
          <div className="actions">
            <Link href="/contact/?service=audit" className="btn btn--dark">Book an audit</Link>
            <Link href={`/checklist/#check-${p.law}`} className="btn">Check this on your site</Link>
            {site.bookingUrl ? <a href={site.bookingUrl} className="btn" target="_blank" rel="noopener" data-book>Book a 20-minute call</a> : null}
          </div>
        </div>
      </section>

      {work.length > 1 ? (
        <section className="block">
          <Link href={`/work/${next.slug}/`} className="nextp">
            <Label>Next concept</Label>
            <span className="nextp__title">{next.subject}</span>
            <span className="nextp__sub">{next.title}</span>
            <span className="start__arr" aria-hidden="true">→</span>
          </Link>
        </section>
      ) : null}
    </>
  );
}
