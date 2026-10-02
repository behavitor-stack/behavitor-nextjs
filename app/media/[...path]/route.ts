// Images uploaded in the editor live in the private Blob store; this serves them to visitors.
// File names are unique, so browsers and the CDN can keep them for a year.
import { get } from '@vercel/blob';
import { blobReady } from '@/lib/posts';

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const name = path.join('/');
  if (!blobReady() || !/^[\w./-]+$/.test(name) || name.includes('..')) return new Response('Not found', { status: 404 });
  const res = await get(`media/${name}`, { access: 'private' }).catch(() => null);
  if (!res || res.statusCode !== 200) return new Response('Not found', { status: 404 });
  return new Response(res.stream, {
    headers: {
      'content-type': res.blob.contentType,
      'cache-control': 'public, max-age=31536000, immutable',
      'x-content-type-options': 'nosniff',
    },
  });
}
