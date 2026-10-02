// Image upload for the editor (cover photos and pictures inside articles). Stored privately in Blob, served via /media/.
import { NextResponse, type NextRequest } from 'next/server';
import { put } from '@vercel/blob';
import { COOKIE, validSession } from '@/lib/auth';
import { blobReady } from '@/lib/posts';

const TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif' };

export async function POST(req: NextRequest) {
  if (!(await validSession(req.cookies.get(COOKIE)?.value))) return NextResponse.json({ ok: false }, { status: 401 });
  if (!blobReady()) return NextResponse.json({ ok: false, error: 'Connect a Vercel Blob store first.' }, { status: 503 });
  const file = (await req.formData()).get('file');
  if (!(file instanceof File)) return NextResponse.json({ ok: false, error: 'No file' }, { status: 400 });
  const ext = TYPES[file.type];
  if (!ext) return NextResponse.json({ ok: false, error: 'Use a JPG, PNG, WebP, AVIF or GIF image.' }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ ok: false, error: 'Images must be under 4 MB.' }, { status: 400 });
  const base = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'image';
  const name = `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}-${base}.${ext}`;
  await put(`media/${name}`, file, { access: 'private', contentType: file.type, addRandomSuffix: false });
  return NextResponse.json({ ok: true, url: `/media/${name}` });
}
