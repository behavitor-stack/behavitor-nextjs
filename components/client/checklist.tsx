'use client';
// The free checklist: a pass / needs-work answer per check, remembered on this device.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { EMAIL, isEmail, mailto, postForm, track } from '@/lib/client';

type Item = { id: string; name: string; question: string; short: string; good: string; art: string };
type Verdict = 'pass' | 'fail';
const KEY = 'behavitor-checklist-v2';

export default function Checklist({ items }: { items: Item[] }) {
  const [answers, setAnswers] = useState<Record<string, Verdict>>({});
  const reported = useRef(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}') as Record<string, Verdict>;
      // carry over ticks from the earlier single "Passed" button
      const old = JSON.parse(localStorage.getItem('behavitor-checklist') || 'null');
      if (Array.isArray(old)) { old.forEach((id: string) => { saved[id] ??= 'pass'; }); localStorage.removeItem('behavitor-checklist'); }
      setAnswers(saved);
    } catch { /* private mode: start empty */ }
  }, []);

  const pass = items.filter(i => answers[i.id] === 'pass');
  const fail = items.filter(i => answers[i.id] === 'fail');
  const left = items.length - pass.length - fail.length;

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(answers)); } catch { /* not saved, still works */ }
    if (!left && !reported.current && Object.keys(answers).length) { reported.current = true; track('Checklist completed', { passed: pass.length, needsWork: fail.length }); }
  }, [answers, left, pass.length, fail.length]);

  const set = (id: string, v: Verdict) => setAnswers(a => ({ ...a, [id]: v }));
  const plural = (n: number) => (n === 1 ? '' : 's');

  // the summary at the end turns into a result
  let label = 'Want a second opinion?', title = 'We can run the full audit with real visitors.';
  let text = 'A checklist shows where to look. An audit shows why people struggle, using recordings, search data and testing, with a plan ranked by impact.';
  if (fail.length) {
    label = `${fail.length} to fix`;
    title = `${fail.length} check${plural(fail.length)} need${fail.length === 1 ? 's' : ''} work.`;
    text = 'Start with these. An audit shows why people struggle with them, using recordings, search data and testing, and ranks every fix by impact.';
  } else if (pass.length === items.length) {
    label = `All ${items.length} pass`;
    title = `Your site passes all ${items.length} checks.`;
    text = 'Nice work. An audit goes deeper than a checklist can, with real visitors and search data, if you want to find the next gains.';
  } else if (pass.length) {
    label = 'So far, so good';
    title = `${pass.length} of ${items.length} pass so far.`;
  }

  return (
    <>
      <div className="clbar">
        <div className="clbar__progress">
          <span className="clbar__label" aria-live="polite"><b>{pass.length}</b> pass · <b>{fail.length}</b> <span>{fail.length === 1 ? 'needs work' : 'need work'}</span> · <span>{left}</span> to check</span>
          <span className="clbar__track" aria-hidden="true">
            <span className="clbar__pass" style={{ width: `${pass.length / items.length * 100}%` }} />
            <span className="clbar__fail" style={{ width: `${fail.length / items.length * 100}%` }} />
          </span>
        </div>
        <div className="actions">
          <button type="button" className="clbar__reset" hidden={!pass.length && !fail.length} onClick={() => { setAnswers({}); reported.current = false; window.scrollTo({ top: 0 }); }}>Clear answers</button>
          <button type="button" className="btn" onClick={() => { track('Checklist printed'); print(); }}>Print or save as PDF</button>
          <Link href="/contact/?service=audit" className="btn btn--dark">Book an audit</Link>
        </div>
      </div>

      <ol className="cl">
        {items.map(l => (
          <li key={l.id} className={`cl__item${answers[l.id] === 'pass' ? ' is-pass' : ''}${answers[l.id] === 'fail' ? ' is-fail' : ''}`} id={`check-${l.id}`}>
            <span className="plate__art cl__art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: l.art }} />
            <div className="cl__body">
              <p className="label">{l.name}</p>
              <h2 className="cl__q">{l.question}</h2>
              <p className="cl__why">{l.short}</p>
              <p className="cl__good"><b>It passes if:</b> {l.good.charAt(0).toLowerCase() + l.good.slice(1)}</p>
            </div>
            <fieldset className="slide cl__verdict" style={{ '--n': 2 } as React.CSSProperties}>
              <legend className="sr">Result for {l.name}</legend>
              <label><input type="radio" name={`verdict-${l.id}`} value="pass" checked={answers[l.id] === 'pass'} onChange={() => set(l.id, 'pass')} /><span>Passes</span></label>
              <label><input type="radio" name={`verdict-${l.id}`} value="fail" checked={answers[l.id] === 'fail'} onChange={() => set(l.id, 'fail')} /><span>Needs work</span></label>
              <span className="slide__thumb" aria-hidden="true" />
            </fieldset>
          </li>
        ))}
      </ol>

      <section className="block">
        <div className="nextstep">
          <div>
            <p className="label"><span className="led" aria-hidden="true" /><span>{label}</span></p>
            <h2>{title}</h2>
            <p>{text}</p>
            {fail.length ? (
              <ul className="cl__fails">
                {fail.map(l => <li key={l.id}><a href={`#check-${l.id}`}>{l.name}<span>{l.question}</span></a></li>)}
              </ul>
            ) : null}
            {pass.length || fail.length ? <ResultsForm items={items} answers={answers} /> : null}
          </div>
          <div className="actions">
            <Link href="/contact/?service=audit" className="btn btn--dark">Book an audit</Link>
            <Link href="/sample-audit/" className="btn">See a sample report</Link>
          </div>
        </div>
      </section>
    </>
  );
}

// free notes on the results: the answers go to the studio, and a person replies
function ResultsForm({ items, answers }: { items: Item[]; answers: Record<string, Verdict> }) {
  const [email, setEmail] = useState('');
  const [site, setSite] = useState('');
  const [gotcha, setGotcha] = useState('');
  const [msg, setMsg] = useState<{ kind: '' | 'ok' | 'err'; text: string }>({ kind: '', text: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const input = useRef<HTMLInputElement>(null);
  const verdict = { pass: 'Passes', fail: 'Needs work' };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state !== 'idle') return;
    const value = email.trim();
    if (!isEmail(value)) { setMsg({ kind: 'err', text: 'Please add your email, like name@company.com, so we can reply.' }); input.current?.focus(); return; }
    if (gotcha) return; // spam trap
    const results = items.map(l => ({ id: l.id, name: l.name, question: l.question, verdict: (answers[l.id] || 'unchecked') as Verdict | 'unchecked' }));
    setState('sending');
    try {
      const r = await postForm('/api/contact/', { kind: 'checklist', email: value, website: site.trim(), results });
      if (r === 'fallback') {
        setState('idle');
        setMsg({ kind: 'ok', text: `Your email app will open with your results ready. Press send, or write to ${EMAIL}.` });
        const lines = results.map(x => `${x.verdict === 'unchecked' ? 'Not checked' : verdict[x.verdict as Verdict]}: ${x.name} (${x.question})`).join('\n');
        location.href = mailto('Notes on my checklist results', `Website: ${site.trim() || '—'}\n\n${lines}`);
        return;
      }
      setState('sent');
      track('Checklist notes requested', { passed: results.filter(x => x.verdict === 'pass').length, needsWork: results.filter(x => x.verdict === 'fail').length });
    } catch {
      setState('idle');
      setMsg({ kind: 'err', text: `That didn’t send. Please try again, or email ${EMAIL}.` });
    }
  };

  if (state === 'sent') return (
    <div className="clmail">
      <p className="clmail__title"><span className="led" aria-hidden="true" />Sent. Thank you.</p>
      <p className="clmail__text">We’ll reply to {email.trim()} within two business days with what we’d fix first.</p>
    </div>
  );
  return (
    <form className="clmail" noValidate onSubmit={submit}>
      <p className="hp" aria-hidden="true"><label>Leave this empty <input name="_gotcha" tabIndex={-1} autoComplete="off" value={gotcha} onChange={e => setGotcha(e.target.value)} /></label></p>
      <p className="clmail__title"><span className="led" aria-hidden="true" />Get free notes on your results</p>
      <p className="clmail__text">Send us your answers and we’ll reply within two business days with what we’d fix first, and why. No obligation.</p>
      <div className="clmail__row">
        <label className="sr" htmlFor="cl-email">Your email</label>
        <input ref={input} id="cl-email" name="email" type="email" autoComplete="email" autoCapitalize="off" spellCheck={false} placeholder="name@company.com" required
          aria-describedby="cl-mail-msg" aria-invalid={msg.kind === 'err'} value={email} onChange={e => setEmail(e.target.value)} />
        <label className="sr" htmlFor="cl-site">Your website (optional)</label>
        <input id="cl-site" name="website" type="text" inputMode="url" autoComplete="url" autoCapitalize="off" spellCheck={false} placeholder="yourcompany.com (optional)" value={site} onChange={e => setSite(e.target.value)} />
        <button className="btn btn--dark btn--sm" type="submit" disabled={state === 'sending'} aria-busy={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send my results'}</button>
      </div>
      <p className={`clmail__msg${msg.kind ? ` is-${msg.kind}` : ''}`} id="cl-mail-msg" role="status" aria-live="polite">{msg.text}</p>
    </form>
  );
}
