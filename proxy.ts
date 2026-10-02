// Keeps the editor private: every /admin page and upload needs a valid login, except the login page itself.
// (Server Actions check the login again, so this is the first lock, not the only one.)
import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE, validSession } from '@/lib/auth';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin/login')) return NextResponse.next();
  if (await validSession(req.cookies.get(COOKIE)?.value)) return NextResponse.next();
  if (pathname.startsWith('/api/')) return NextResponse.json({ ok: false }, { status: 401 });
  const login = new URL('/admin/login/', req.url);
  return NextResponse.redirect(login);
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
