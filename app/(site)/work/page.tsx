import Link from 'next/link';
import FilterBar from '@/components/client/filters';
import { Label, Led, PageHead, Raw, StartModule, Steps, WorkCard } from '@/components/ui';
import { work, lawArt, conceptNote } from '@/lib/site';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  path: '/work/', title: 'Work',
  description: 'Concept projects: familiar kinds of website, each redesigned around one principle of how people behave.',
});

export default function WorkIndex() {
  const topics = [...new Set(work.flatMap(p => p.tags))];
  return (
    <>
      <PageHead kicker="Work" title="Concept projects." lead="Familiar kinds of website, each redesigned around one principle of how people behave." />
      {work.length ? (
        <section className="block block--tight">
          {work.length > 3 ? <FilterBar label="Filter by topic" tags={topics} total={work.length} grid="work-grid" /> : null}
          <div className="wgrid" id="work-grid">{work.map(p => <WorkCard key={p.slug} p={p} />)}</div>
          <p className="studies__note">{conceptNote}</p>
        </section>
      ) : (
        <section className="block block--tight">
          <div className="soon">
            <Raw className="plate__art soon__art" html={lawArt.zeigarnik} />
            <div>
              <p className="label"><Led />In progress</p>
              <h2>Our first concepts are on the way.</h2>
              <p>Each concept takes a familiar kind of website and redesigns it around one principle of how people behave.</p>
              <div className="actions"><Link href="/checklist/" className="btn btn--dark">Try the free checklist</Link><Link href="/contact/?service=audit" className="btn">Book an audit</Link></div>
            </div>
          </div>
        </section>
      )}
      <section className="block">
        <div className="chead"><Label>How we approach a concept</Label><h2>One problem, one principle, one clear fix.</h2></div>
        <Steps items={[
          ['Spot', 'A pattern that trips people up on a familiar kind of website.'],
          ['Explain', 'The behavior behind it, and why it costs the organization.'],
          ['Redesign', 'A focused concept that removes the problem, drawn before and after.'],
          ['Predict', 'What we would expect to change, and how we would measure it.'],
        ]} />
      </section>
      <StartModule />
    </>
  );
}
