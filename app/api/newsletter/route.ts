import { NextResponse, type NextRequest } from 'next/server';
import { mailReady, addSubscriber, isEmail, str, tooMany } from '@/lib/mail';

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (str(body._gotcha)) return NextResponse.json({ ok: true }); // spam trap
  if (!mailReady()) return NextResponse.json({ ok: false, fallback: true }, { status: 503 });
  if (tooMany(req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown')) return NextResponse.json({ ok: false }, { status: 429 });
  const email = str(body.email, 254);
  if (!isEmail(email)) return NextResponse.json({ ok: false, error: 'A valid email is needed' }, { status: 400 });
  try {
    await addSubscriber(email);
  } catch (e) {
    console.error('newsletter', e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
