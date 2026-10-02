import Link from 'next/link';
import { Picker } from '@/components/client/small';
import { Arr, Label, Led, Principles, Raw, Steps, StartModule, serviceIcons } from '@/components/ui';
import { site, services, principles, lcFirst, ldJson } from '@/lib/site';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  path: '/services/', title: 'Services',
  description: 'UX & UI design, web design and development, brand identity, SEO & AI search, digital marketing and website audits.',
});

const process: [string, string][] = [
  ['Research', 'We look at your analytics, your search data and real people using the site, so decisions start from evidence.'],
  ['Design', 'We shape the structure, words and screens around what we found, and test the key parts before building.'],
  ['Build', 'We develop a fast, accessible site on a platform your team can run, with tracking in place from day one.'],
  ['Improve', 'After launch we measure what people do, then refine the pages and campaigns that matter most.'],
];
const faqs: [string, string][] = [
  ['How much does a project cost?', `It depends on scope. ${site.auditPrice ? `A website audit is ${lcFirst(site.auditPrice)}, at a fixed price` : 'Audits are a fixed fee'}; design and build projects are quoted after a short call, with a clear breakdown before any work begins.`],
  ['Can we see an example of your work?', 'Yes. Our <a href="/sample-audit/">sample audit report</a> shows exactly what you receive, and our <a href="/work/">concept projects</a> show how we approach a problem. We only publish client work with the client’s written permission.'],
  ['How long does a project take?', 'An audit takes about two weeks. Most website projects take six to twelve weeks, depending on size and how quickly feedback comes back.'],
  ['Can you work with our existing website?', 'Yes. We often improve existing sites rather than rebuild them. An audit is the quickest way to see what is worth keeping.'],
  ['Which platforms do you build on?', 'Webflow, Framer, WordPress and custom Next.js with a headless CMS. We recommend the one your team can run comfortably.'],
  ['Do you offer support after launch?', 'Yes. We offer ongoing SEO, marketing and design support, or a light monthly plan for updates and fixes.'],
  ['Do you work with clients remotely?', 'Yes. We work with teams in different time zones, with regular calls and shared project boards.'],
];

const jsonLd = [{
  '@context': 'https://schema.org', '@type': 'ItemList', name: 'Behavitor services',
  itemListElement: services.map((sv, i) => ({
    '@type': 'ListItem', position: i + 1,
    item: { '@type': 'Service', name: sv.name, description: sv.body, url: `${site.url}/services/#${sv.id}`, provider: { '@type': 'Organization', name: 'Behavitor', url: site.url } },
  })),
}, {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}, {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.url}/services/` },
  ],
}];

export default function Services() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(jsonLd)} />
      <header className="shero">
        <Label>Services</Label>
        <h1 className="shero__title">Six things, done properly.</h1>
        <p className="shero__lead">Design, development and growth, shaped by how people actually use websites. Choose one service or combine several.</p>
        <div className="shero__actions">
          <Link href="/contact/" className="btn btn--dark">Start a project</Link>
          <Link href="/contact/?service=audit" className="btn">Book a website audit</Link>
        </div>
      </header>

      <Picker items={services.map(sv => ({ id: sv.id, name: sv.name, icon: serviceIcons[sv.id] }))} />

      <div className="svc-list">
        {services.map(sv => (
          <section className="svc" id={sv.id} aria-labelledby={`${sv.id}-title`} key={sv.id}>
            <div className="svc__intro">
              <Raw className="svc__icon" html={serviceIcons[sv.id]} />
              {sv.id === 'audit' ? <p className="svc__hint"><Led />A good place to start</p> : null}
              <h2 className="svc__title" id={`${sv.id}-title`}>{sv.name}</h2>
              <p className="svc__line">{sv.line}</p>
              <p className="svc__body">{sv.body}</p>
              <Link href={`/contact/?service=${sv.id}`} className={`btn btn--sm${sv.id === 'audit' ? ' btn--dark' : ''}`}
                aria-label={sv.id === 'audit' ? undefined : `Discuss this service: ${sv.name}`}>
                Discuss {sv.name.split(' ')[0] === 'Website' ? 'an audit' : 'this service'} <Arr />
              </Link>
              {sv.id === 'audit' ? <Link href="/sample-audit/" className="svc__sample">See a sample report</Link> : null}
            </div>
            <dl className="svc__spec">
              <div className="svc__row svc__row--list"><dt>What’s included</dt><dd><ul className="tags">{sv.items.map(i => <li key={i}>{i}</li>)}</ul></dd></div>
              <div className="svc__row svc__row--list"><dt>You get</dt><dd><ul className="ticks">{sv.deliverables.map(i => <li key={i}>{i}</li>)}</ul></dd></div>
              {sv.id === 'audit' && site.auditPrice ? <div className="svc__row"><dt>Price</dt><dd><b>{site.auditPrice}</b>, fixed</dd></div> : null}
              {sv.id === 'audit' && site.foundingOffer ? <div className="svc__row"><dt>Offer</dt><dd><span className="offer"><Led />{site.foundingOffer}</span></dd></div> : null}
              <div className="svc__row"><dt>Timeline</dt><dd>{sv.timeline}</dd></div>
              <div className="svc__row"><dt>Good for</dt><dd>{sv.goodFor}</dd></div>
            </dl>
          </section>
        ))}
      </div>

      <section className="block">
        <div className="chead"><Label>Process</Label><h2>How a project runs.</h2><p>The same four stages, whichever services you choose.</p></div>
        <Steps items={process} />
      </section>

      <section className="block">
        <div className="chead"><Label>Principles</Label><h2>Good design, applied to the web.</h2><p>How we work, inspired by Dieter Rams’ principles of good design.</p></div>
        <Principles list={principles} />
      </section>

      <section className="block">
        <div className="chead"><Label>Questions</Label><h2>Frequently asked.</h2></div>
        <div className="faq">
          {faqs.map(([q, a]) => (
            <details className="faq__item" key={q}>
              <summary><span className="faq__lamp" aria-hidden="true" /><span className="faq__q">{q}</span><span className="faq__pm" aria-hidden="true" /></summary>
              <p dangerouslySetInnerHTML={{ __html: a }} />
            </details>
          ))}
        </div>
      </section>

      <StartModule />
    </>
  );
}
