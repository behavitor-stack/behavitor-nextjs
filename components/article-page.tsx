// One article template for every section: the blog, and the AI section (darker covers).
import Link from 'next/link';
import { ReadingProgress, ShareButtons, Toc } from '@/components/client/article';
import Newsletter from '@/components/client/newsletter';
import { Arr, Led, PostCard, PostCover, SectionHead } from '@/components/ui';
import { site, fmtDate, ldJson } from '@/lib/site';
import type { Post } from '@/lib/posts';

const slugify = (t: string) => t.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// give every h2 an id and a hover anchor, mark the first paragraph as the lede, and collect the contents
const prepareBody = (html: string) => {
  const toc: { id: string; t: string }[] = [];
  const body = html
    .replace(/<h2>(.*?)<\/h2>/g, (_, t: string) => {
      const id = slugify(t);
      toc.push({ id, t });
      return `<h2 id="${id}">${t}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h2>`;
    })
    .replace('<p>', '<p class="lede">');
  return { body, toc };
};

export default function ArticlePage({ p, list, sec }: { p: Post; list: Post[]; sec: { name: string; base: string; dark?: boolean } }) {
  const i = list.findIndex(x => x.slug === p.slug);
  const newer = list[i - 1], older = list[i + 1];
  const related = [...list.filter(x => x.slug !== p.slug && x.tag === p.tag), ...list.filter(x => x.slug !== p.slug && x.tag !== p.tag)].slice(0, 3);
  const { body, toc } = prepareBody(p.html);
  // contents, takeaways and the share rail only earn their place on longer reads
  const long = p.words >= 450 && toc.length >= 3;
  const url = `${site.url}${p.url}`;
  const ld = [{
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: p.title, description: p.excerpt, datePublished: p.date, dateModified: p.updated || p.date,
    articleSection: p.tag, wordCount: p.words, timeRequired: `PT${p.read}M`, inLanguage: 'en', url, mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'Behavitor', url: site.url },
    publisher: { '@type': 'Organization', name: 'Behavitor', url: site.url },
  }, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: sec.name, item: `${site.url}${sec.base}` },
      { '@type': 'ListItem', position: 3, name: p.title, item: url },
    ],
  }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(ld)} />
      <ReadingProgress />
      <article className={`article${sec.dark ? ' article--dark' : ''}`}>
        <header className="article__head">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol><li><Link href={sec.base}>{sec.name}</Link></li><li><Link href={`${sec.base}?topic=${encodeURIComponent(p.tag)}`}>{p.tag}</Link></li></ol>
          </nav>
          <h1 className="article__title">{p.title}</h1>
          <p className="article__dek">{p.excerpt}</p>
          <div className="byline">
            <span className="byline__mark" aria-hidden="true"><span className="logo__dot" /></span>
            <span>
              <span className="byline__name">Behavitor Studio</span>
              <span className="byline__meta"><time dateTime={p.date}>{fmtDate(p.date)}</time> · {p.read} min read</span>
            </span>
          </div>
        </header>

        <div className="cover" aria-hidden="true"><PostCover p={p} /></div>

        <div className="article__grid">
          {long ? <Toc toc={toc} /> : null}
          <div className="article__main">
            {long ? <>
              <Toc toc={toc} inline />
              {p.takeaways.length ? (
                <section className="takeaways" aria-labelledby={`tk-${p.slug}`}>
                  <p className="label" id={`tk-${p.slug}`}><Led />Key takeaways</p>
                  <ul>{p.takeaways.map(t => <li key={t}>{t}</li>)}</ul>
                </section>
              ) : null}
            </> : null}

            <div className="article__body" data-article dangerouslySetInnerHTML={{ __html: body }} />

            <ShareButtons url={url} title={p.title} bar />

            <aside className="author" aria-label="About the author">
              <span className="byline__mark byline__mark--lg" aria-hidden="true"><span className="logo__dot" /></span>
              <div>
                <p className="author__name">Written by Behavitor Studio</p>
                <p className="author__bio">We research how people search, scroll, click and decide, then design, build and market websites around it.</p>
                <Link href="/contact/" className="more">Work with us <Arr /></Link>
              </div>
            </aside>

            <nav className="pn" aria-label="More articles">
              {older ? <Link className="pn__link" href={older.url} rel="prev"><span className="label">← Previous</span><span className="pn__title">{older.title}</span></Link> : <span />}
              {newer ? <Link className="pn__link pn__link--next" href={newer.url} rel="next"><span className="label">Next →</span><span className="pn__title">{newer.title}</span></Link> : <span />}
            </nav>
          </div>
          {long ? <ShareButtons url={url} title={p.title} /> : null}
        </div>
      </article>

      {related.length ? (
        <section className="block">
          <SectionHead kicker="Keep reading" title="Related articles" href={sec.base} linkText="All articles" />
          <div className="bgrid">{related.map(x => <PostCard key={x.slug} p={x} />)}</div>
        </section>
      ) : null}
      <Newsletter />
    </>
  );
}
