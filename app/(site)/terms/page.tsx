import { Fragment } from 'react';
import { Led, PageHead } from '@/components/ui';
import { site, terms } from '@/lib/site';
import { pageMeta } from '@/lib/meta';

// a draft until `published: true` in content/terms.js: built for review, but kept out of search engines
export const metadata = pageMeta({
  path: '/terms/', title: 'How we work together', noindex: !terms.published,
  description: 'Behavitor’s terms of engagement in plain words: proposals, payment, timelines, ownership, confidentiality and support.',
});

export default function Terms() {
  return (
    <>
      <PageHead kicker="Terms" title="How we work together" lead="Our terms in plain words. Each project also has its own written proposal." />
      {terms.published ? null : (
        <p className="samplenote"><Led /><span><b>Draft for review.</b> Not yet published or linked anywhere. Check it with a lawyer, fill in the brackets, then set <code>published: true</code> in <code>content/terms.js</code>.</span></p>
      )}
      <div className="prose">
        <p><strong>Last updated:</strong> {terms.updated}. {terms.business}. Questions: <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        {terms.sections.map(([h, ps]) => <Fragment key={h as string}><h2>{h as string}</h2>{(ps as string[]).map(p => <p key={p.slice(0, 30)}>{p}</p>)}</Fragment>)}
      </div>
    </>
  );
}
