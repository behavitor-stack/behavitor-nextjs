// Shared building blocks. Class names match the stylesheet one for one.
import Link from 'next/link';
import type { ReactNode } from 'react';
import { site, lawArt, lawById, postArt, testimonials, fmtDate, type Work, type Service } from '@/lib/site';
import type { Post } from '@/lib/posts';

export const Arr = () => <span className="arr" aria-hidden="true">→</span>;
export const Led = () => <span className="led" aria-hidden="true" />;
export const Label = ({ children, id }: { children: ReactNode; id?: string }) => <p className="label" id={id}>{children}</p>;
export const Raw = ({ html, className, as: Tag = 'span' }: { html: string; className?: string; as?: 'span' | 'div' }) => (
  <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

export const SectionHead = ({ kicker, title, href, linkText }: { kicker: string; title: string; href: string; linkText: string }) => (
  <div className="shead">
    <div><Label>{kicker}</Label><h2>{title}</h2></div>
    <Link href={href} className="more">{linkText} <Arr /></Link>
  </div>
);

export const PageHead = ({ kicker, title, lead }: { kicker: string; title: ReactNode; lead?: ReactNode }) => (
  <header className="phead">
    <Label>{kicker}</Label>
    <h1>{title}</h1>
    {lead ? <p className="lead">{lead}</p> : null}
  </header>
);

export const StartModule = () => (
  <section className="block">
    <Link href="/contact/" className="start">
      <span className="start__label"><Led />Available for new projects</span>
      <span className="start__title">Start a project</span>
      <span className="start__arr" aria-hidden="true">→</span>
    </Link>
  </section>
);

// A project "plate": like the printed plate on a Braun device, showing the behavior law the project leaned on.
export const Plate = ({ p, cls = '' }: { p: Work; cls?: string }) => (
  <div className={`plate ${cls}`} aria-hidden="true">
    <span className="plate__top"><span>{p.sector}</span><span>{p.year}</span></span>
    <Raw className="plate__art" html={lawArt[p.law as keyof typeof lawArt]} />
    <span className="plate__foot"><span className="plate__name">{p.subject}</span><span className="plate__law"><span className="led" />{lawById[p.law].name}</span></span>
  </div>
);

export const WorkCard = ({ p }: { p: Work }) => (
  <Link href={`/work/${p.slug}/`} className="wcard" data-tags={p.tags.join('|')}>
    <Plate p={p} />
    <span className="wcard__title">{p.title}</span>
    <span className="wcard__meta">Concept · {p.sector}</span>
  </Link>
);

export const WorkFeature = ({ p }: { p: Work }) => (
  <Link href={`/work/${p.slug}/`} className="wfeat">
    <Plate p={p} cls="plate--feat" />
    <span className="wfeat__body">
      <span className="label">Concept project</span>
      <span className="wfeat__title">{p.title}</span>
      <span className="wfeat__text">{p.summary}</span>
      <span className="wfeat__law"><b>{lawById[p.law].name}.</b> {lawById[p.law].short}</span>
      <span className="more">See the concept <Arr /></span>
    </span>
  </Link>
);

// A post's feature image: an uploaded photo if it has one, otherwise its drawn cover.
export const PostCover = ({ p, fit = 'meet' }: { p: Post; fit?: 'meet' | 'slice' }) => {
  const cls = `pcover pcover--${p.cover || 'none'}${p.section === 'ai' ? ' pcover--dark' : ''}`;
  if (p.image) return <span className={cls}><img src={p.image} alt="" loading="lazy" decoding="async" /></span>;
  return <Raw className={cls} html={postArt(p.cover || '', fit)} />;
};

export const PostMeta = ({ p }: { p: Post }) => (
  <span className="pmeta"><span className="pmeta__tag">{p.tag}</span><span>{fmtDate(p.date)}</span><span>{p.read} min read</span></span>
);

export const PostCard = ({ p, featured = false, markFeatured = false }: { p: Post; featured?: boolean; markFeatured?: boolean }) => (
  <Link href={p.url} className={`bcard${featured ? ' bcard--featured' : ''}`} data-tags={p.tag} {...(markFeatured ? { 'data-featured': '' } : {})}>
    <span className="bcard__plate" aria-hidden="true">
      <PostCover p={p} fit={featured ? 'meet' : 'slice'} />
      <span className="bcard__topic">{p.tag}</span>
    </span>
    <span className="bcard__body">
      <span className="bcard__meta">{fmtDate(p.date)} · {p.read} min read</span>
      <span className="bcard__title">{p.title}</span>
      <span className="bcard__excerpt">{p.excerpt}</span>
    </span>
  </Link>
);

export const PostLead = ({ p }: { p: Post }) => (
  <Link href={p.url} className="plead">
    <PostCover p={p} />
    <span className="plead__body">
      <PostMeta p={p} />
      <span className="plead__title">{p.title}</span>
      <span className="plead__excerpt">{p.excerpt}</span>
      <span className="more">Read article <Arr /></span>
    </span>
  </Link>
);

export const PostRow = ({ p }: { p: Post }) => (
  <Link href={p.url} className="prow">
    <PostCover p={p} fit="slice" />
    <span className="prow__body">
      <PostMeta p={p} />
      <span className="prow__title">{p.title}</span>
    </span>
  </Link>
);

// what clients say: appears only once testimonials exist in content/data.js (real clients, with their permission)
type Testimonial = { quote: string; name: string; role?: string; org?: string };
export const ProofBlock = () => {
  const list = testimonials as Testimonial[];
  if (!list.length) return null;
  return (
    <section className="block">
      <div className="chead"><Label>What clients say</Label><h2>In their words.</h2></div>
      <div className="quotes">
        {list.map(t => (
          <figure className="quote" key={t.name + t.quote.slice(0, 20)}>
            <blockquote><p>{t.quote}</p></blockquote>
            <figcaption><b>{t.name}</b>{[t.role, t.org].filter(Boolean).join(', ')}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

// small monoline icons for the services (24px grid, stroked with currentColor)
const icon = (d: string) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const serviceIcons: Record<string, string> = {
  'ux-ui': icon('<rect x="3" y="4" width="18" height="13" rx="2.5"/><path d="M12 11l6 2.2-2.6 1 -1 2.6z"/>'),
  web: icon('<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 8.5h18"/><path d="M6 6.3h.01M8.5 6.3h.01"/><path d="M9.5 12.5l-2 2 2 2M14.5 12.5l2 2-2 2"/>'),
  brand: icon('<circle cx="9.5" cy="12" r="5.5"/><rect x="11" y="6.5" width="10" height="11" rx="2"/>'),
  seo: icon('<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/><path d="M8 10.5h5"/>'),
  marketing: icon('<path d="M4 20V14M9.3 20V10M14.6 20V12M20 20V5"/><path d="M4 9l5-4 5 3 6-5"/>'),
  audit: icon('<rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M8.5 9l1.5 1.5 3-3"/><path d="M8.5 15h7"/>'),
};

export const ServiceKey = ({ s }: { s: Service }) => (
  <Link href={`/services/#${s.id}`} className="key">
    <span className="key__top">
      <Raw className="key__icon" html={serviceIcons[s.id] || ''} />
      {s.id === 'audit' ? <span className="key__hint"><Led />Start here</span> : null}
    </span>
    <span className="key__name">{s.name}</span>
    <span className="key__line">{s.line}</span>
    <span className="key__items">{s.items.slice(0, 3).join(' · ')}</span>
  </Link>
);

export const Meter = ({ name, value, note }: { name: string; value: number; note?: string }) => (
  <div className={`meter${note ? ' meter--note' : ''}`} role="img" aria-label={`${name}: ${value} out of 10${note ? `. ${note}` : ''}`}>
    <span className="meter__name">{name}</span>
    <span className="meter__bar" style={note ? undefined : ({ '--v': value } as React.CSSProperties)}>
      {Array.from({ length: 10 }, (_, i) => <i key={i} className={i < value ? 'on' : undefined} />)}
    </span>
    <span className="meter__val">{value}/10</span>
    {note ? <span className="meter__note">{note}</span> : null}
  </div>
);

export const AuditModule = () => {
  const meters: [string, number][] = [['UX', 7], ['SEO', 4], ['Speed', 6], ['Accessibility', 3], ['Conversion', 5]];
  return (
    <section className="block">
      <div className="audit">
        <div className="audit__text">
          <p className="label"><Led />Start here</p>
          <h2>Not sure what to fix first?</h2>
          {site.auditPrice ? <p className="audit__price"><b>{site.auditPrice}</b> · fixed price · about two weeks</p> : null}
          {site.foundingOffer ? <p className="audit__offer"><Led />{site.foundingOffer}</p> : null}
          <p className="audit__lead">Start with a two-week website audit. We watch how people use your site, test it against laws like the ones on the dial, and hand you a plan ranked by impact.</p>
          <ul className="ticks">
            <li>UX, SEO, speed, accessibility and conversion, reviewed together</li>
            <li>A prioritized action plan, not a pile of findings</li>
            <li>A walkthrough call with your team</li>
          </ul>
          <div className="actions">
            <Link href="/contact/?service=audit" className="btn btn--light">Book an audit</Link>
            <Link href="/sample-audit/" className="btn btn--ghost">See a sample report</Link>
          </div>
          <p className="audit__alt">Or run the <Link href="/checklist/">free 12-point check</Link> on your site yourself.</p>
        </div>
        <figure className="report" aria-label="Example audit summary">
          <figcaption className="report__head"><span>Audit summary</span><Link href="/sample-audit/">See the full sample →</Link></figcaption>
          {meters.map(([n, v]) => <Meter key={n} name={n} value={v} />)}
          <p className="report__note"><Led />Fix first: accessibility, then search.</p>
        </figure>
      </div>
    </section>
  );
};

// the steps used on Services and Work
export const Steps = ({ items }: { items: [string, string][] }) => (
  <ol className="steps">
    {items.map(([t, d]) => <li className="step" key={t}><span className="step__dot" aria-hidden="true" /><h3>{t}</h3><p>{d}</p></li>)}
  </ol>
);

export const Principles = ({ list }: { list: [string, string][] }) => (
  <div className="grid3 principles">
    {list.map(([t, d]) => <div className="module" key={t}><h3>{t}</h3><p>{d}</p></div>)}
  </div>
);
