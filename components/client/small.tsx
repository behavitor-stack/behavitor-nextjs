'use client';
// Small pieces: the Services picker that follows the page, and friendlier times for recent news.
import { useEffect, useRef, useState } from 'react';

export function Picker({ items }: { items: { id: string; name: string; icon: string }[] }) {
  const [cur, setCur] = useState<string | null>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const secs = items.map(k => document.getElementById(k.id)).filter(Boolean) as HTMLElement[];
    let ticking = false;
    const update = () => {
      ticking = false;
      let c: HTMLElement | null = null;
      secs.forEach(sec => { if (sec.getBoundingClientRect().top < innerHeight * 0.45) c = sec; });
      if (c && secs[secs.length - 1].getBoundingClientRect().bottom < innerHeight * 0.3) c = null; // past the list
      setCur((c as HTMLElement | null)?.id ?? null);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => removeEventListener('scroll', onScroll);
  }, [items]);
  // keep the active key visible on narrow screens
  useEffect(() => {
    const k = track.current?.querySelector<HTMLElement>('.is-on');
    if (k && track.current) track.current.scrollTo({ left: k.offsetLeft - (track.current.clientWidth - k.offsetWidth) / 2, behavior: 'smooth' });
  }, [cur]);
  return (
    <nav className="picker" aria-label="Services on this page">
      <div className="picker__track" ref={track}>
        {items.map(k => (
          <a key={k.id} href={`#${k.id}`} className={`picker__key${cur === k.id ? ' is-on' : ''}`} aria-current={cur === k.id ? 'location' : undefined}>
            <span className="picker__icon" dangerouslySetInnerHTML={{ __html: k.icon }} /><span>{k.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

// "12 min ago" / "3 h ago" for headlines from the last two days; older ones keep their date
export function Ago({ iso, label }: { iso: string; label: string }) {
  const [text, setText] = useState(label);
  useEffect(() => {
    const mins = (Date.now() - new Date(iso).getTime()) / 6e4;
    if (mins >= 0 && mins <= 2880) setText(mins < 60 ? `${Math.max(1, Math.round(mins))} min ago` : `${Math.round(mins / 60)} h ago`);
  }, [iso]);
  return <time dateTime={iso}>{text}</time>;
}
