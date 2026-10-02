import Link from 'next/link';
import Dial from '@/components/client/dial';
import { AuditModule, ProofBlock, SectionHead, ServiceKey, WorkFeature, WorkCard, PostLead, PostRow, StartModule, Led, Arr } from '@/components/ui';
import { site, services, work, laws, lawArt, ldJson } from '@/lib/site';
import { getPosts } from '@/lib/posts';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({ path: '/' });

// the dial's scale and the knob's ridges are vector drawings, so they stay sharp at any size and while turning
const dialTicks = `<svg class="dialbox__ticks" viewBox="0 0 100 100" aria-hidden="true">${Array.from({ length: 36 }, (_, i) => {
  const a = (i * 10 - 90) * Math.PI / 180, major = i % 3 === 0; // a longer, darker mark at each of the 12 settings
  const r1 = major ? 30.2 : 31, r2 = 33.2, p = (r: number) => [50 + r * Math.cos(a), 50 + r * Math.sin(a)].map(v => v.toFixed(2));
  const [x1, y1] = p(r1), [x2, y2] = p(r2);
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${major ? ' class="is-major"' : ''}/>`;
}).join('')}</svg>`;
const knurl = `<svg class="knob3d__knurl" viewBox="0 0 100 100"><circle class="knob3d__ridges" cx="50" cy="50" r="44.5" pathLength="360"/><circle class="knob3d__edge" cx="50" cy="50" r="49.6"/></svg>`;

const jsonLd = [{
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  url: `${site.url}/`,
  email: site.email,
  description: site.description,
  logo: `${site.url}/apple-touch-icon.png`,
  image: `${site.url}/og/home.png`,
  knowsAbout: ['User experience research', 'UX design', 'Web development', 'Search engine optimization', 'Digital marketing', 'Website audits'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: services.map(sv => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: sv.name, url: `${site.url}/services/#${sv.id}` } })),
  },
}, { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: `${site.url}/` }];

export default async function Home() {
  const [blog, ai] = await Promise.all([getPosts('blog'), getPosts('ai')]);
  const [first, second] = site.headline.match(/^(.*people) (.*)$/)?.slice(1) ?? [site.headline, ''];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(jsonLd)} />
      <section className="hero">
        <div className="hero__text">
          <h1 className="hero__title"><span>{first}</span> <span>{second}</span></h1>
          <p className="lead hero__lead">{site.intro}</p>
          <div className="hero__actions"><Link href="/contact/?service=audit" className="btn btn--dark">Book an audit</Link><Link href="/checklist/" className="hero__link">Try the free checklist <Arr /></Link></div>
        </div>
        <Dial laws={laws.map(l => ({ id: l.id, name: l.name, short: l.short }))} arts={laws.map(l => lawArt[l.id as keyof typeof lawArt])} ticks={dialTicks} knurl={knurl} />
      </section>

      <AuditModule />

      <section className="block">
        <SectionHead kicker="Services" title="What we do" href="/services/" linkText="All services" />
        <div className="keys">{services.map(s => <ServiceKey key={s.id} s={s} />)}</div>
      </section>

      {work.length ? (
        <section className="block">
          <SectionHead kicker="Work" title="Concept projects" href="/work/" linkText="All work" />
          <WorkFeature p={work[0]} />
          {work.length > 1 ? <div className="wgrid wgrid--3 wgrid--home">{work.slice(1, 4).map(p => <WorkCard key={p.slug} p={p} />)}</div> : null}
        </section>
      ) : null}

      <ProofBlock />

      {blog.length ? (
        <section className="block">
          <SectionHead kicker="Blog" title="Latest writing" href="/blog/" linkText="All posts" />
          <div className="blog-home">
            <PostLead p={blog[0]} />
            <div className="blog-home__list">{blog.slice(1, 4).map(p => <PostRow key={p.slug} p={p} />)}</div>
          </div>
        </section>
      ) : null}

      {ai.length ? (
        <section className="block">
          <div className="aiband">
            <div className="aiband__intro">
              <p className="label"><Led />AI</p>
              <h2>People, behavior and AI.</h2>
              <p>How people really behave with AI features, and how we use AI in our own work.</p>
              <Link href="/ai/" className="more">All AI articles <Arr /></Link>
            </div>
            <ul className="aiband__list">
              {ai.slice(0, 3).map(p => <li key={p.slug}><Link href={p.url}><span className="aiband__tag">{p.tag}</span><span className="aiband__title">{p.title}</span><span className="arr" aria-hidden="true">→</span></Link></li>)}
            </ul>
          </div>
        </section>
      ) : null}

      <StartModule />
    </>
  );
}
