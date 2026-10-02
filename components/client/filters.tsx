'use client';
// Filter keys for a grid (blog, AI, work, news, sample audit). Each key has a small lamp that lights when chosen.
// The chosen topic is kept in the address, so Back from an article returns to the same view.
import { useEffect, useState } from 'react';

export default function FilterBar({ label, tags, total, grid, featured, empty }: {
  label: string; tags: string[]; total: number;
  grid: string; // id of the grid whose children are filtered by their data-tags
  featured?: string; // id of the big "latest" card above the grid (hidden while a topic is chosen)
  empty?: string; // id of the "nothing here" message
}) {
  const [topic, setTopic] = useState('all');
  const [shown, setShown] = useState(total);

  const apply = (t: string, remember: boolean) => {
    const all = t === 'all' || !tags.includes(t);
    const pick = all ? 'all' : t;
    setTopic(pick);
    const wrap = featured ? document.getElementById(featured) : null;
    if (wrap) wrap.hidden = !all;
    let n = 0;
    for (const el of Array.from(document.getElementById(grid)?.children ?? []) as HTMLElement[]) {
      // with "All" on, the featured post is already shown above, so skip its duplicate
      const show = all ? !(wrap && el.hasAttribute('data-featured')) : (el.dataset.tags || '').split('|').includes(pick);
      el.classList.toggle('is-hidden', !show);
      n += show ? 1 : 0;
    }
    setShown(n + (all && wrap ? 1 : 0)); // include the featured post shown above
    const msg = empty ? document.getElementById(empty) : null;
    if (msg) msg.hidden = n > 0;
    if (remember) {
      const url = new URL(location.href);
      if (all) url.searchParams.delete('topic'); else url.searchParams.set('topic', pick);
      history.replaceState(history.state, '', url);
    }
  };

  useEffect(() => { apply(new URLSearchParams(location.search).get('topic') || 'all', false); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="filters">
      <div className="chips" role="group" aria-label={label}>
        {['all', ...tags].map(t => (
          <button key={t} type="button" className={`chip${topic === t ? ' is-on' : ''}`} aria-pressed={topic === t} onClick={() => apply(t, true)}>
            {t === 'all' ? 'All' : t}
          </button>
        ))}
      </div>
      <p className="filters__count" aria-live="polite">Showing <span>{shown}</span></p>
    </div>
  );
}
