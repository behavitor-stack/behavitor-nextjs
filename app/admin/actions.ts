'use server';
// Editor actions. Each one checks the login first.
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath, updateTag } from 'next/cache';
import { COOKIE, SESSION_HOURS, makeSession, passwordMatches, validSession } from '@/lib/auth';
import { blobReady, removePost, savePost, type PostInput, type Section, type Status } from '@/lib/posts';
import { coverNames } from '@/lib/site';

async function requireAdmin() {
  if (!(await validSession((await cookies()).get(COOKIE)?.value))) redirect('/admin/login/');
}

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  const ok = await passwordMatches(String(form.get('password') || ''));
  if (!ok) {
    await new Promise(r => setTimeout(r, 900)); // slow down guessing
    return 'That password didn’t work.';
  }
  (await cookies()).set(COOKIE, await makeSession(), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: SESSION_HOURS * 3600,
  });
  redirect('/admin/');
}

export async function logout() {
  (await cookies()).delete(COOKIE);
  redirect('/admin/login/');
}

// refresh every page that shows posts
const refresh = () => { updateTag('posts'); revalidatePath('/', 'layout'); };

export type SaveResult = { ok: true; url: string; status: Status } | { ok: false; error: string };

export async function save(input: PostInput & { originalSection?: Section; originalSlug?: string }): Promise<SaveResult> {
  await requireAdmin();
  if (!blobReady()) return { ok: false, error: 'Connect a Vercel Blob store to the project first (see the README).' };
  const p: PostInput = {
    slug: String(input.slug || '').trim(),
    section: input.section === 'ai' ? 'ai' : 'blog',
    title: String(input.title || '').trim().slice(0, 160),
    seoTitle: String(input.seoTitle || '').trim().slice(0, 70) || undefined,
    date: String(input.date || ''),
    updated: new Date().toISOString().slice(0, 10),
    tag: String(input.tag || '').trim().slice(0, 40),
    cover: coverNames.includes(String(input.cover)) ? String(input.cover) : undefined,
    image: /^\/media\/[\w./-]+$/.test(String(input.image || '')) ? String(input.image) : undefined,
    excerpt: String(input.excerpt || '').trim().slice(0, 300),
    takeaways: (Array.isArray(input.takeaways) ? input.takeaways : []).map(t => String(t).trim()).filter(Boolean).slice(0, 5),
    format: input.format === 'html' ? 'html' : 'md',
    body: String(input.body || '').slice(0, 200_000),
    status: input.status === 'published' ? 'published' : 'draft',
  };
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) return { ok: false, error: 'The web address can only use lowercase letters, numbers and hyphens.' };
  if (!p.title) return { ok: false, error: 'Add a title.' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date)) return { ok: false, error: 'Add a date.' };
  if (!p.tag) return { ok: false, error: 'Add a topic.' };
  if (!p.excerpt) return { ok: false, error: 'Add a short summary.' };
  if (!p.body.trim()) return { ok: false, error: 'The article is empty.' };
  if (!p.cover && !p.image) return { ok: false, error: 'Choose a cover drawing or upload an image.' };

  await savePost(p);
  // moved to a new address: remove the old one
  if (input.originalSlug && (input.originalSlug !== p.slug || input.originalSection !== p.section)) {
    await removePost(input.originalSection === 'ai' ? 'ai' : 'blog', input.originalSlug);
  }
  refresh();
  return { ok: true, url: `/${p.section}/${p.slug}/`, status: p.status };
}

export async function remove(section: Section, slug: string): Promise<SaveResult> {
  await requireAdmin();
  if (!blobReady()) return { ok: false, error: 'Connect a Vercel Blob store first.' };
  await removePost(section === 'ai' ? 'ai' : 'blog', slug);
  refresh();
  return { ok: true, url: '/admin/', status: 'deleted' };
}
