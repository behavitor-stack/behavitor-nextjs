'use client';
// Article tools: reading progress, the "On this page" highlight, and share buttons.
import { useEffect, useRef, useState } from 'react';

export function ReadingProgress() {
  const bar = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const article = document.querySelector<HTMLElement>('[data-article]');
    if (!article || !bar.current) return;
    const update = () => {
      const r = article.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.4 - r.top) / r.height));
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
    return () => { removeEventListener('scroll', update); removeEventListener('resize', update); };
  }, []);
  return <div className="progress" aria-hidden="true"><span ref={bar} /></div>;
}

// the contents list, highlighting the section being read
export function Toc({ toc, inline = false }: { toc: { id: string; t: string }[]; inline?: boolean }) {
  const [current, setCurrent] = useState(toc[0]?.id);
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const heads = toc.map(h => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    let ticking = false;
    const update = () => {
      ticking = false;
      // current = last heading above the upper third of the screen
      let cur = heads[0];
      heads.forEach(h => { if (h.getBoundingClientRect().top < innerHeight * 0.33) cur = h; });
      if (cur) setCurrent(cur.id);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => removeEventListener('scroll', onScroll);
  }, [toc]);
  const list = (
    <ol>{toc.map(h => (
      <li key={h.id}><a href={`#${h.id}`} className={h.id === current ? 'is-on' : undefined} aria-current={h.id === current ? 'location' : undefined}
        onClick={() => { if (inline) details.current?.removeAttribute('open'); }} // close the inline contents after a jump on small screens
        dangerouslySetInnerHTML={{ __html: h.t }} /></li>
    ))}</ol>
  );
  if (inline) return <details className="toc toc--inline" ref={details}><summary>On this page</summary>{list}</details>;
  return <nav className="toc toc--rail" aria-label="On this page"><p className="label">On this page</p>{list}</nav>;
}

const icons = {
  link: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M5.3 8.2h3v10.3h-3zM6.8 3.6a1.7 1.7 0 1 1 0 3.5 1.7 1.7 0 0 1 0-3.5zM10.2 8.2h2.9v1.4c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7v5.8h-3v-5.1c0-1.2 0-2.8-1.7-2.8s-1.9 1.3-1.9 2.7v5.2h-3z"/></svg>',
  x: '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.3 4.7H5.5z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6 8.5-6"/></svg>',
};

// shared "copied" state, so the rail and the bar below the article light up together
const listeners = new Set<(on: boolean, msg: string) => void>();
const announce = (on: boolean, msg: string) => listeners.forEach(f => f(on, msg));

export function ShareButtons({ url, title, bar = false }: { url: string; title: string; bar?: boolean }) {
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    const f = (on: boolean, m: string) => { setDone(on); setMsg(m); };
    listeners.add(f);
    return () => { listeners.delete(f); };
  }, []);
  const copy = async () => {
    try {
      if (navigator.share && matchMedia('(pointer: coarse)').matches) { await navigator.share({ title: document.title, url }); return; }
      await navigator.clipboard.writeText(url);
      announce(true, 'Link copied.');
      setTimeout(() => announce(false, ''), 2400);
    } catch (e) {
      if ((e as Error).name !== 'AbortError') announce(false, `Copy this link: ${url}`);
    }
  };
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const buttons = <>
    <button type="button" className={`sbtn${done ? ' is-done' : ''}`} aria-label="Copy link" onClick={copy} dangerouslySetInnerHTML={{ __html: icons.link }} />
    <a className="sbtn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener" aria-label="Share on LinkedIn" dangerouslySetInnerHTML={{ __html: icons.linkedin }} />
    <a className="sbtn" href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener" aria-label="Share on X" dangerouslySetInnerHTML={{ __html: icons.x }} />
    <a className="sbtn" href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email" dangerouslySetInnerHTML={{ __html: icons.mail }} />
  </>;
  if (!bar) return <aside className="share share--rail" aria-label="Share">{buttons}</aside>;
  return (
    <div className="sharebar">
      <p className="sharebar__label">Share this article</p>
      <div className="sharebar__btns">{buttons}</div>
      <p className="sharebar__msg" role="status" aria-live="polite">{msg}</p>
    </div>
  );
}
