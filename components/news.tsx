import { Ago } from '@/components/client/small';
import { fmtDate } from '@/lib/site';
import type { NewsItem } from '@/lib/news';

const kindName = { news: 'News', labs: 'From the labs' } as const;

export const NewsRow = ({ n }: { n: NewsItem }) => (
  <a className="nrow" href={n.link} target="_blank" rel="noopener" data-tags={kindName[n.kind]}>
    <span className="nrow__meta"><span className={`nrow__source${n.kind === 'labs' ? ' is-lab' : ''}`}>{n.source}</span><Ago iso={n.date} label={fmtDate(n.date)} /></span>
    <span className="nrow__title">{n.title}</span>
    {n.summary ? <span className="nrow__summary">{n.summary}</span> : null}
    <span className="nrow__out" aria-hidden="true">↗</span>
  </a>
);
