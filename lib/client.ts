// Small browser-side helpers shared by the client components.
declare global {
  interface Window {
    plausible?: (name: string, opts?: { props: Record<string, unknown> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

// conversion events (Plausible, only when switched on in content/data.js)
export const track = (name: string, props?: Record<string, unknown>) => {
  try { window.plausible?.(name, props ? { props } : undefined); } catch { /* stats must never break the page */ }
  try { window.gtag?.('event', name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''), props); } catch { /* stats must never break the page */ }
};

export const EMAIL = 'hello@behavitor.com';
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// send a form to our own API. Returns 'sent', 'fallback' (email service not set up yet) or throws.
export async function postForm(url: string, data: Record<string, unknown>): Promise<'sent' | 'fallback'> {
  const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
  if (res.status === 503) return 'fallback';
  if (!res.ok) throw new Error(`Form service replied ${res.status}`);
  return 'sent';
}

export const mailto = (subject: string, body: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
