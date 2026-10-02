'use client';
// The site frame: header, phone menu, search panel and <main>. Holds the open/closed state for the menu and search.
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Search, { loadIndex } from './search';
import { track } from '@/lib/client';

export default function SiteChrome({ nav, ideas, children }: { nav: [string, string][]; ideas: string[]; children: ReactNode }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [find, setFind] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const on = (h: string) => (h === '/' ? pathname === '/' : pathname.startsWith(h));

  // a new page closes the menu and search
  useEffect(() => { setMenu(false); setFind(false); }, [pathname]);

  // menu: full-screen sheet; the page behind stops scrolling, focus moves in, Escape closes it
  useEffect(() => {
    document.body.classList.toggle('is-menu', menu);
    if (menu) setTimeout(() => firstLink.current?.focus(), 60); // wait until the sheet is visible
    const mq = matchMedia('(min-width: 721px)');
    const wide = (e: MediaQueryListEvent) => { if (e.matches) setMenu(false); };
    mq.addEventListener('change', wide);
    return () => mq.removeEventListener('change', wide);
  }, [menu]);

  useEffect(() => {
    document.documentElement.style.overflow = menu || find ? 'hidden' : '';
    const ft = document.querySelector<HTMLElement>('.ft');
    if (ft) ft.inert = menu || find;
  }, [menu, find]);

  const openSearch = useCallback((from?: HTMLElement | null) => {
    opener.current = from ?? (document.activeElement as HTMLElement);
    setMenu(false);
    setFind(true);
  }, []);
  const closeSearch = useCallback(() => {
    setFind(false);
    const back = opener.current;
    (back && back.isConnected && back.offsetParent ? back : document.querySelector<HTMLElement>('.hd__search'))?.focus({ preventScroll: true });
  }, []);

  // keyboard: "/" or Cmd/Ctrl+K opens search; Escape closes the menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement).closest?.('input, textarea, select, [contenteditable]');
      if (!find && ((e.key === '/' && !typing) || (e.key === 'k' && (e.metaKey || e.ctrlKey)))) { e.preventDefault(); openSearch(); }
      if (e.key === 'Escape' && menu) { setMenu(false); menuBtn.current?.focus(); }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [find, menu, openSearch]);

  // conversion events: which links people use to get in touch
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const from = location.pathname;
      if (a.hasAttribute('data-book')) track('Booking click', { from });
      else if (href.includes('service=audit')) track('Audit click', { from });
      else if (href.startsWith('/contact/')) track('Contact click', { from });
      else if (href.startsWith('/checklist/')) track('Checklist click', { from });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="hd" inert={find}>
        <Link href="/" className="logo" aria-label="Behavitor, home"><span className="logo__dot" aria-hidden="true" />behavitor</Link>
        <nav className="hd__nav" aria-label="Main">
          {nav.map(([t, h]) => <Link key={h} href={h} aria-current={on(h) ? 'page' : undefined}>{t}</Link>)}
        </nav>
        <div className="hd__right">
          <button type="button" className="hd__search" aria-haspopup="dialog" aria-controls="find" aria-expanded={find} aria-keyshortcuts="/"
            onClick={e => openSearch(e.currentTarget)} onPointerEnter={() => { loadIndex().catch(() => {}); }}>Search<kbd aria-hidden="true">/</kbd></button>
          <Link href="/contact/" className="btn btn--dark btn--sm hd__cta">Start a project</Link>
          <button ref={menuBtn} className="hd__menu" aria-expanded={menu} aria-controls="mnav" onClick={() => setMenu(m => !m)}>
            <span /><span /><b className="sr">{menu ? 'Close menu' : 'Menu'}</b>
          </button>
        </div>
      </header>
      <nav className="mnav" id="mnav" aria-label="Mobile" inert={find || undefined}>
        <button type="button" className="mnav__search" aria-haspopup="dialog" aria-controls="find" aria-expanded={find} onClick={e => openSearch(e.currentTarget)}>Search articles and work</button>
        {nav.map(([t, h], i) => <Link key={h} ref={i === 0 ? firstLink : undefined} href={h} aria-current={on(h) ? 'page' : undefined}>{t}</Link>)}
      </nav>
      <Search open={find} onClose={closeSearch} ideas={ideas} />
      <main id="main" inert={menu || find}>{children}</main>
    </>
  );
}
