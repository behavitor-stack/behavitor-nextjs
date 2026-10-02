// Share image for pages without a ready-made one (new posts from the editor): the Braun look, drawn on demand.
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const title = (q.get('title') || 'Design from how people actually behave.').slice(0, 120);
  const label = (q.get('label') || '').slice(0, 30);
  const dark = label === 'AI';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: dark ? '#111111' : '#f2f2f0', color: dark ? '#ffffff' : '#111111' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: '#f95c31' }} />
          behavitor
          {label ? <div style={{ marginLeft: 18, fontSize: 22, letterSpacing: 2, textTransform: 'uppercase', color: dark ? '#9a9a9e' : '#6a6a6f' }}>{label}</div> : null}
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 60 ? 64 : 80, fontWeight: 600, lineHeight: 1.04, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: 'flex', fontSize: 24, color: dark ? '#9a9a9e' : '#6a6a6f' }}>Design from how people actually behave.</div>
      </div>
    ),
    { width: 1200, height: 630, headers: { 'cache-control': 'public, max-age=86400, s-maxage=31536000' } },
  );
}
