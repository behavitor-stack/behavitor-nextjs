import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import { ldJson, site } from '@/lib/site';
import './globals.css';

const googleSiteVerification = '3puP3-Mk2CMWYP1A8HQQ90xFdx2WfHjalAOhhOuUA_A';

// fonts are downloaded at build time and served from this site: no visitor data goes to Google
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter', display: 'swap' });
const interTight = Inter_Tight({ subsets: ['latin'], weight: ['600'], variable: '--font-inter-tight', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Behavitor · Design & development studio',
  description: site.description,
  icons: { icon: '/assets/favicon.svg', apple: '/apple-touch-icon.png' },
  alternates: {
    types: { 'application/rss+xml': [{ url: '/blog/feed.xml', title: 'Behavitor: blog' }, { url: '/ai/feed.xml', title: 'Behavitor: AI' }] },
  },
  verification: { google: googleSiteVerification },
};

export const viewport: Viewport = { themeColor: '#f4f4f2' };

// The logo lamp switches on at the start of a visit. This runs before the first paint, so the dot
// never flashes orange first. Skipped with reduced motion, or when browser storage is blocked.
const lamp = `try{if(!sessionStorage.getItem('behavitor-lamp')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('lamp-on');sessionStorage.setItem('behavitor-lamp','1')}}catch(e){}`;
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const organizationLd = {
  '@context': 'https://schema.org', '@type': 'Organization', '@id': `${site.url}/#organization`,
  name: site.name, url: site.url, email: site.email, logo: `${site.url}/apple-touch-icon.png`,
  sameAs: Object.values(site.social).filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        <script id="lamp" dangerouslySetInnerHTML={{ __html: lamp }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(organizationLd)} />
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer /> : null}
        {site.analytics.plausibleDomain ? <script defer data-domain={site.analytics.plausibleDomain} src="https://plausible.io/js/script.js" /> : null}
        {gaId ? <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} />
          <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});` }} />
        </> : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
