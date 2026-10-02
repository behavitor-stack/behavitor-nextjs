// Daily AI news refresh, called by Vercel Cron (see vercel.json). Vercel sends "Authorization: Bearer $CRON_SECRET".
import { NextResponse, type NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';
import { refreshNews } from '@/lib/news';
import { blobReady } from '@/lib/posts';

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) return NextResponse.json({ ok: false }, { status: 401 });
  if (!blobReady()) return NextResponse.json({ ok: false, error: 'Connect a Blob store first' }, { status: 503 });
  const result = await refreshNews();
  if (result.saved) revalidateTag('news', 'max');
  return NextResponse.json({ ok: true, ...result });
}
