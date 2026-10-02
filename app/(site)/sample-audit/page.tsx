import Link from 'next/link';
import FilterBar from '@/components/client/filters';
import { Label, Led, Meter, ProofBlock } from '@/components/ui';
import { site, sampleAudit as sa, lawById, lcFirst } from '@/lib/site';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  path: '/sample-audit/', title: 'Sample audit report',
  description: 'See what a Behavitor website audit looks like: scores, findings with evidence, the behavior behind each one, and a plan ranked by impact.',
});

type Finding = (typeof sa.findings)[number];
const rank: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
const Tag = ({ kind, v }: { kind: 'impact' | 'effort'; v: string }) => (
  <span className={`rtag rtag--${kind} is-${v.toLowerCase()}`}><span className="rtag__k">{kind === 'impact' ? 'Impact' : 'Effort'}</span>{v}</span>
);

export default function SampleAudit() {
  const byId: Record<string, Finding> = Object.fromEntries(sa.findings.map(f => [f.id, f]));
  const areas = [...new Set(sa.findings.map(f => f.area))];
  const top = (sa.plan[0][2] as string[]).map(id => byId[id]).slice(0, 3);
  const sorted = [...sa.findings].sort((a, b) => rank[b.impact] - rank[a.impact] || rank[a.effort] - rank[b.effort]);
  return (
    <>
      <header className="phead">
        <Label>Sample report</Label>
        <h1>What an audit looks like.</h1>
        <p className="lead">A shortened example of the report we deliver. Every finding shows what we saw, why it matters and what to do, ranked by impact.</p>
        <div className="actions actions--center"><Link href="/contact/?service=audit" className="btn btn--dark">Book an audit</Link><a href="#findings" className="btn">Jump to the findings</a></div>
      </header>

      <p className="samplenote"><Led /><span><b>This is a sample.</b> The practice, its visitors and its numbers are made up to show the format. Your report uses your own website, analytics and visitor recordings.</span></p>

      <article className="rep">
        <section className="rep__cover" aria-label="About this audit">
          <div className="rep__who">
            <p className="label">Website audit · Sample</p>
            <h2>{sa.subject}</h2>
            <p><span className="rep__k">Goal</span>{sa.goal}</p>
          </div>
          <dl className="rep__scope">{sa.scope.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </section>
        <section className="rep__summary" aria-labelledby="rep-summary">
          <div className="rep__verdict">
            <h2 className="case__h" id="rep-summary">In one sentence</h2>
            <p>{sa.verdict}</p>
            <h3 className="case__h">The three fixes that matter most</h3>
            <ol className="rep__top">{top.map(f => <li key={f.id}><a href={`#${f.id}`}>{f.title}</a><span>{f.area} · {f.effort.toLowerCase()} effort</span></li>)}</ol>
          </div>
          <figure className="report" aria-label="Scores">
            <figcaption className="report__head"><span>Scores</span><span>Out of 10</span></figcaption>
            {sa.scores.map(([n, v, note]) => <Meter key={n as string} name={n as string} value={v as number} note={note as string} />)}
          </figure>
        </section>
      </article>

      <section className="block" id="findings">
        <div className="chead">
          <Label>Findings</Label>
          <h2>{sa.findings.length} things worth fixing, with the evidence.</h2>
          <p>Each one names the behavior behind it, so your team knows why, not just what.</p>
        </div>
        <FilterBar label="Filter by area" tags={areas} total={sa.findings.length} grid="findings-grid" />
        <div className="rfinds" id="findings-grid">
          {sorted.map((f, i) => (
            <article className="rfind" id={f.id} data-tags={f.area} key={f.id}>
              <header className="rfind__head">
                <span className="rfind__no">{String(i + 1).padStart(2, '0')}</span>
                <span className="rfind__area">{f.area}</span>
                <span className="rfind__tags"><Tag kind="impact" v={f.impact} /><Tag kind="effort" v={f.effort} /></span>
              </header>
              <h3>{f.title}</h3>
              <dl className="rfind__body">
                <div><dt>What we saw</dt><dd>{f.saw}</dd></div>
                <div><dt>Why it matters</dt><dd>{f.why} <Link className="rfind__law" href={`/checklist/#check-${f.law}`}>{lawById[f.law].name}</Link></dd></div>
                <div className="rfind__fix"><dt><Led />What to do</dt><dd>{f.fix}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="block">
        <div className="chead"><Label>The plan</Label><h2>In the order that pays back fastest.</h2></div>
        <ol className="rplan">
          {sa.plan.map(([when, why, ids]) => (
            <li className="rplan__step" key={when as string}>
              <p className="rplan__when">{when as string}</p>
              <p className="rplan__why">{why as string}</p>
              <ul>{(ids as string[]).map(id => <li key={id}><a href={`#${id}`}>{byId[id].title}</a></li>)}</ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="block">
        <div className="rafter">
          <div><Label>After the report</Label><h2>We walk your team through it.</h2></div>
          <ul className="ticks ticks--lg">
            <li>A walkthrough call to go through every finding and answer questions</li>
            <li>Clips from the visitor sessions behind each finding, so you can see it for yourself</li>
            <li>Fix it with your own team, or ask us to. The plan works either way</li>
          </ul>
        </div>
      </section>

      <ProofBlock />

      <section className="block">
        <div className="nextstep">
          <div>
            <p className="label"><Led />Your website next</p>
            <h2>Get a report like this for your site.</h2>
            <p>About two weeks, {site.auditPrice ? `${lcFirst(site.auditPrice)}, fixed price` : 'at a fixed price agreed up front'}.{site.foundingOffer ? ` ${site.foundingOffer}.` : ''}</p>
          </div>
          <div className="actions">
            <Link href="/contact/?service=audit" className="btn btn--dark">Book an audit</Link>
            <Link href="/checklist/" className="btn">Try the free checklist first</Link>
          </div>
        </div>
      </section>
    </>
  );
}
