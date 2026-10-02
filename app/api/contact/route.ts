// Contact form, the optional follow-up details, and checklist results. Everything arrives in the studio inbox
// with Reply-To set to the visitor, so a reply goes straight to them.
import { NextResponse, type NextRequest } from 'next/server';
import { mailReady, sendToStudio, isEmail, str, strs, line, tooMany } from '@/lib/mail';

const bad = (error: string) => NextResponse.json({ ok: false, error }, { status: 400 });

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return bad('Invalid request'); }
  if (str(body._gotcha)) return NextResponse.json({ ok: true }); // spam trap filled in: pretend all is well
  if (!mailReady()) return NextResponse.json({ ok: false, fallback: true }, { status: 503 });
  if (tooMany(req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown')) return NextResponse.json({ ok: false, error: 'Too many messages' }, { status: 429 });

  const email = str(body.email, 254);
  if (!isEmail(email)) return bad('A valid email is needed');
  const website = str(body.website, 200);

  try {
    if (body.kind === 'inquiry') {
      const name = line(str(body.name, 120));
      const message = str(body.message, 5000);
      if (!name || !message) return bad('Name and message are needed');
      const subject = str(body.subject, 80) === 'Website audit request' ? 'Website audit request' : 'New project inquiry';
      await sendToStudio({
        subject: `${subject} from ${name}`,
        replyTo: email,
        text: [`Name: ${name}`, `Email: ${email}`, `Website: ${website || '—'}`, `Services: ${strs(body.services).join(', ') || '—'}`, `Goals: ${strs(body.goals, 30).join(', ') || '—'}`, '', message].join('\n'),
      });
    } else if (body.kind === 'details') {
      const name = line(str(body.name, 120)) || email;
      await sendToStudio({
        subject: `Inquiry details from ${name}`,
        replyTo: email,
        text: [`Name: ${name}`, `Email: ${email}`, `Budget: ${str(body.budget, 40) || '—'}`, `Timeline: ${str(body.timeline, 40) || '—'}`, `Website: ${website || '—'}`].join('\n'),
      });
    } else if (body.kind === 'checklist') {
      const results = (Array.isArray(body.results) ? body.results : []).slice(0, 20) as Record<string, unknown>[];
      const word = { pass: 'Passes', fail: 'Needs work' } as Record<string, string>;
      const lines = results.map(r => `${word[str(r.verdict, 20)] || 'Not checked'}: ${str(r.name, 80)} (${str(r.question, 160)})`);
      const count = (v: string) => results.filter(r => r.verdict === v).length;
      await sendToStudio({
        subject: `Checklist results from ${line(email)}`,
        replyTo: email,
        text: [`Email: ${email}`, `Website: ${website || '—'}`, `Passed: ${count('pass')} · Needs work: ${count('fail')}`, '', ...lines].join('\n'),
      });
    } else {
      return bad('Unknown form');
    }
  } catch (e) {
    console.error('contact form', e);
    return NextResponse.json({ ok: false, error: 'Could not send' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
