import Link from 'next/link';
import SiteChrome from '@/components/client/chrome';
import { Label } from '@/components/ui';
import { NAV, site, terms } from '@/lib/site';
import { searchIdeas } from '@/lib/search-index';

const socialNames: Record<string, string> = { linkedin: 'LinkedIn', instagram: 'Instagram' };

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const ideas = await searchIdeas();
  const social = Object.entries(site.social as Record<string, string>).filter(([, url]) => url);
  return (
    <>
      <SiteChrome nav={NAV} ideas={ideas}>{children}</SiteChrome>
      <footer className="ft">
        <div className="ft__top">
          <p className="ft__statement">Useful websites, designed with care.<span>Less, but better.</span><small>After Dieter Rams</small></p>
          <a href="#main" className="totop" aria-label="Back to top"><span aria-hidden="true">↑</span></a>
          <div className="ft__contact">
            <Label>Say hello</Label>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="ft__bottom">
          <span>© {new Date().getFullYear()} Behavitor</span>
          <nav aria-label="Footer">
            {NAV.map(([t, h]) => <Link key={h} href={h}>{t}</Link>)}
            <Link href="/checklist/">Free checklist</Link>
            <Link href="/sample-audit/">Sample audit</Link>
            <Link href="/privacy/">Privacy</Link>
            {terms.published ? <Link href="/terms/">Terms</Link> : null}
            <Link href="/accessibility/">Accessibility</Link>
          </nav>
          {social.length ? <nav aria-label="Social">{social.map(([k, url]) => <a key={k} href={url} target="_blank" rel="noopener">{socialNames[k] || k}</a>)}</nav> : null}
        </div>
      </footer>
    </>
  );
}
