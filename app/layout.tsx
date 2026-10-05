import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import Script from 'next/script';
import { site } from '@/lib/site';
import './globals.css';

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
};

export const viewport: Viewport = { themeColor: '#f4f4f2' };

// The logo lamp switches on at the start of a visit. This runs before the first paint, so the dot
// never flashes orange first. Skipped with reduced motion, or when browser storage is blocked.
const lamp = `try{if(!sessionStorage.getItem('behavitor-lamp')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('lamp-on');sessionStorage.setItem('behavitor-lamp','1')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        <script id="lamp" dangerouslySetInnerHTML={{ __html: lamp }} />
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="beforeInteractive" /> : null}
        {site.analytics.plausibleDomain ? <script defer data-domain={site.analytics.plausibleDomain} src="https://plausible.io/js/script.js" /> : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
