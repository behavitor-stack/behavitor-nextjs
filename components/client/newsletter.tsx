'use client';
import { useState } from 'react';
import { EMAIL, isEmail, mailto, postForm, track } from '@/lib/client';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [gotcha, setGotcha] = useState('');
  const [msg, setMsg] = useState<{ kind: '' | 'ok' | 'err'; text: string }>({ kind: '', text: '' });
  const [sending, setSending] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const value = email.trim();
    if (!isEmail(value)) {
      setInvalid(true);
      setMsg({ kind: 'err', text: 'Please enter a valid email address, like name@company.com.' });
      (e.currentTarget.elements.namedItem('email') as HTMLInputElement).focus();
      return;
    }
    setInvalid(false);
    if (gotcha) return; // spam trap
    setSending(true);
    try {
      const r = await postForm('/api/newsletter/', { email: value });
      if (r === 'fallback') {
        setMsg({ kind: 'ok', text: 'Almost done: your email app will open. Press send to confirm your subscription.' });
        location.href = mailto('Subscribe me to the newsletter', `Please add ${value} to the Behavitor newsletter.`);
        return;
      }
      setMsg({ kind: 'ok', text: 'Thank you. You’re on the list; the next issue will reach your inbox.' });
      track('Newsletter signup', { from: location.pathname });
      setEmail('');
    } catch {
      setMsg({ kind: 'err', text: `That didn’t go through. Please try again, or email ${EMAIL} to subscribe.` });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="block">
      <form className="news" noValidate onSubmit={submit}>
        <div>
          <p className="label">Newsletter</p>
          <h2>New writing, once a month.</h2>
          <p className="news__sub">Practical notes on design, search and research. No spam, unsubscribe anytime.</p>
        </div>
        <div className="news__form">
          <label className="sr" htmlFor="news-email">Email address</label>
          <input id="news-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" value={email}
            aria-invalid={invalid} onChange={e => setEmail(e.target.value)} />
          <button className="btn btn--dark" type="submit" disabled={sending} aria-busy={sending}>{sending ? 'Subscribing…' : 'Subscribe'}</button>
          <p className={`news__msg${msg.kind ? ` is-${msg.kind}` : ''}`} role="status" aria-live="polite">{msg.text}</p>
          <p className="hp" aria-hidden="true"><label>Leave this empty <input name="_gotcha" tabIndex={-1} autoComplete="off" value={gotcha} onChange={e => setGotcha(e.target.value)} /></label></p>
        </div>
      </form>
    </section>
  );
}
