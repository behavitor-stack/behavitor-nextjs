'use client';
// Search: a panel from the header. The lamp lights when something is found.
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { indexDocs, words, partialWords, score, mark, snippet, type Indexed, type SearchDoc } from '@/lib/search-engine';
import { track } from '@/lib/client';

const SCOPES = [['all', 'All'], ['blog', 'Blog'], ['ai', 'AI'], ['work', 'Work']] as const;
type Scope = (typeof SCOPES)[number][0];
const WHERE: Record<Scope, string> = { all: '', blog: ' in the blog', ai: ' in AI', work: ' in work' };

let cache: Promise<Indexed[]> | null = null;
export const loadIndex = () => (cache ||= fetch('/search.json').then(r => r.json() as Promise<SearchDoc[]>).then(indexDocs).catch(e => { cache = null; throw e; }));

export default function Search({ open, onClose, ideas }: { open: boolean; onClose: () => void; ideas: string[] }) {
  const pathname = usePathname();
  const here = pathname.split('/')[1];
  const [scope, setScope] = useState<Scope>('all');
  const [q, setQ] = useState('');
  const [docs, setDocs] = useState<Indexed[] | null>(null);
  const [failed, setFailed] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const results = useRef<HTMLDivElement>(null);

  // start in the section being read
  useEffect(() => { setScope((['blog', 'ai', 'work'] as Scope[]).includes(here as Scope) ? (here as Scope) : 'all'); }, [here]);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    input.current?.select();
    if (!docs) loadIndex().then(setDocs, () => setFailed(true));
  }, [open, docs]);

  const view = useMemo(() => {
    if (!docs) return null;
    const pool = docs.filter(d => scope === 'all' || d.s === scope);
    const ws = words(q.trim());
    if (!ws.length) return { kind: 'idle' as const, pool };
    const partial = partialWords(docs, ws);
    const hits = pool.map(d => [d, score(d, ws, partial)] as const).filter(([, s]) => s).sort((a, b) => b[1] - a[1]).map(([d]) => d);
    const wider = !hits.length && scope !== 'all' && docs.some(d => score(d, ws, partial));
    return { kind: 'results' as const, hits, ws, wider };
  }, [docs, q, scope]);

  // record searches that find nothing: they are ideas for new articles
  useEffect(() => {
    if (view?.kind !== 'results' || view.hits.length) return;
    const t = setTimeout(() => track('Search no results', { query: q.trim().toLowerCase().slice(0, 40) }), 1500);
    return () => clearTimeout(t);
  }, [view, q]);

  // arrow keys move from the box into the results and back; Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      const links = [...(results.current?.querySelectorAll<HTMLAnchorElement>('.find__item') ?? [])];
      const i = links.indexOf(document.activeElement as HTMLAnchorElement);
      if (e.key === 'ArrowDown' && links.length) { e.preventDefault(); links[Math.min(i + 1, links.length - 1)].focus(); }
      if (e.key === 'ArrowUp' && i >= 0) { e.preventDefault(); (i === 0 ? input.current : links[i - 1])?.focus(); }
      if (e.key === 'Enter' && e.target === input.current && links.length) { e.preventDefault(); links[0].click(); }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const lampOn = view?.kind === 'results' && view.hits.length > 0;
  const status = failed ? 'Search couldn’t load. Check your connection and try again.'
    : !docs ? (open ? 'Loading…' : '')
    : view?.kind === 'results' ? (view.hits.length ? `${view.hits.length} ${view.hits.length === 1 ? 'result' : 'results'}${WHERE[scope]}` : `Nothing found${WHERE[scope]}.`)
    : '';

  const item = (d: Indexed, ws?: string[]) => (
    <a key={d.u} className="find__item" href={d.u} data-section={d.s}
      onClick={() => { track('Search result', { section: d.s }); onClose(); }}>
      <span className="find__meta">{d.m}</span>
      {ws ? <span className="find__title" dangerouslySetInnerHTML={{ __html: mark(d.t, ws) }} /> : <span className="find__title">{d.t}</span>}
      {ws ? <span className="find__snip" dangerouslySetInnerHTML={{ __html: mark(snippet(d, ws), ws) }} /> : <span className="find__snip">{d.d}</span>}
    </a>
  );

  return (
    <div className="find" id="find" hidden={!open}>
      <div className="find__scrim" onClick={onClose} />
      <div className="find__panel" role="dialog" aria-modal="true" aria-label="Search">
        <div className="find__window">
          <span className={`find__lamp${lampOn ? ' is-on' : ''}`} aria-hidden="true" />
          <label className="sr" htmlFor="find-q">Search articles, AI notes and work</label>
          <input ref={input} id="find-q" type="search" placeholder="Search articles, AI notes and work" autoComplete="off" autoCapitalize="off" spellCheck={false}
            enterKeyHint="search" aria-describedby="find-status" aria-controls="find-results" value={q} onChange={e => setQ(e.target.value)} />
          <button type="button" className="find__close" onClick={onClose}>Close<kbd aria-hidden="true">Esc</kbd></button>
        </div>
        <div className="chips find__scope" role="group" aria-label="Search in">
          {SCOPES.map(([k, t]) => (
            <button key={k} type="button" className={`chip${scope === k ? ' is-on' : ''}`} aria-pressed={scope === k}
              onClick={() => { setScope(k); input.current?.focus(); }}>{t}</button>
          ))}
        </div>
        <p className="find__status" id="find-status" aria-live="polite">{status}</p>
        <div className="find__results" id="find-results" ref={results}>
          {view?.kind === 'idle' ? (() => {
            const latest = view.pool.filter(d => d.dt).sort((a, b) => (b.dt || '').localeCompare(a.dt || '')).slice(0, 3);
            const start = latest.length ? latest : view.pool.slice(0, 3);
            return <>
              {ideas.length ? <><p className="label find__label">Try</p><div className="find__ideas">
                {ideas.map(w => <button key={w} type="button" className="find__idea" onClick={() => { setQ(w); input.current?.focus(); }}>{w}</button>)}
              </div></> : null}
              {start.length ? <><p className="label find__label">{latest.length ? 'Latest' : 'A place to start'}</p>{start.map(d => item(d))}</> : null}
            </>;
          })() : null}
          {view?.kind === 'results' && view.hits.length ? view.hits.slice(0, 12).map(d => item(d, view.ws)) : null}
          {view?.kind === 'results' && !view.hits.length ? (
            <p className="find__none">{view.wider
              ? <>There are matches in other sections. <button type="button" className="linkbtn" onClick={() => { setScope('all'); input.current?.focus(); }}>Search everything</button></>
              : <>Try a shorter or different word, or <a href="/contact/" onClick={onClose}>ask us directly</a>. We read every message.</>}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
