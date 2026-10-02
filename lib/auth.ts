// The editor login: one password (ADMIN_PASSWORD) and a signed session cookie (SESSION_SECRET).
// Uses Web Crypto, so the same code runs in proxy.ts and in Server Actions.
export const COOKIE = 'bv_admin';
export const SESSION_HOURS = 12;

const enc = new TextEncoder();
const hex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');

async function hmac(secret: string, data: string) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

// compare without leaking where the strings differ
const same = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

export const editorReady = () => Boolean(process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32);

export async function makeSession() {
  const exp = String(Date.now() + SESSION_HOURS * 3600_000);
  return `${exp}.${await hmac(process.env.SESSION_SECRET!, `session:${exp}`)}`;
}

export async function validSession(token: string | undefined) {
  if (!token || !editorReady()) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return same(sig, await hmac(process.env.SESSION_SECRET!, `session:${exp}`));
}

// both sides are hashed first, so the comparison always takes the same time
export async function passwordMatches(input: string) {
  if (!editorReady()) return false;
  const secret = process.env.SESSION_SECRET!;
  return same(await hmac(secret, `pw:${input}`), await hmac(secret, `pw:${process.env.ADMIN_PASSWORD}`));
}
