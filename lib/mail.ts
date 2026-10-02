// Email through Resend. Without RESEND_API_KEY the forms fall back to the visitor's email app.
import 'server-only';
import { Resend } from 'resend';

export const mailReady = () => Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM);
const resend = () => new Resend(process.env.RESEND_API_KEY);
const to = () => process.env.CONTACT_TO || 'hello@behavitor.com';

export async function sendToStudio({ subject, text, replyTo }: { subject: string; text: string; replyTo?: string }) {
  const { error } = await resend().emails.send({ from: process.env.CONTACT_FROM!, to: to(), subject, text, ...(replyTo ? { replyTo } : {}) });
  if (error) throw new Error(`Resend: ${error.message}`);
}

// newsletter: add to a Resend segment when one is set, and tell the studio either way
export async function addSubscriber(email: string) {
  const segment = process.env.RESEND_SEGMENT_ID;
  if (segment) {
    const { error } = await resend().contacts.create({ email, segments: [{ id: segment }] });
    if (error && !/already exists/i.test(error.message)) throw new Error(`Resend: ${error.message}`);
  }
  await sendToStudio({ subject: 'New newsletter subscriber', text: `${email} subscribed to the newsletter${segment ? ' and was added to the newsletter segment in Resend' : ''}.` });
}

// --- checks shared by the form endpoints ---
export const isEmail = (v: unknown): v is string => typeof v === 'string' && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
export const strs = (v: unknown, max = 12) => (Array.isArray(v) ? v.filter(x => typeof x === 'string').slice(0, max).map(x => x.trim().slice(0, 120)) : []);
// keep header-like fields on one line
export const line = (s: string) => s.replace(/[\r\n]+/g, ' ');

// a light limit per address, per server instance: enough to stop a script hammering the forms
const hits = new Map<string, number[]>();
export function tooMany(ip: string, limit = 8, windowMs = 10 * 60_000) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}
