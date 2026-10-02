'use client';
// Contact: taps first, a message that writes itself, typing kept to a minimum.
import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { EMAIL, isEmail, mailto, postForm, track } from '@/lib/client';

type Svc = { id: string; name: string; goals: string[] };
const OTHER = { id: 'other', name: 'Something else' };
const SITE_FOR = ['audit', 'seo', 'web', 'ux-ui', 'other'];
const DOMAINS = ['gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'live.com', 'icloud.com', 'me.com', 'aol.com', 'msn.com', 'btinternet.com', 'proton.me', 'protonmail.com'];

// "A", "A and B", "A, B and C"
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const lcFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const phrase = (s: Svc) => (s.id === 'audit' ? 'a website audit' : s.name);
const distance = (a: string, b: string) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};

const Head = ({ audit }: { audit: boolean }) => (
  <header className="phead">
    <p className="label">Contact</p>
    <h1>{audit ? 'Book a website audit.' : 'Tell us about your project.'}</h1>
    <p className="lead">{audit ? 'Tap what worries you, add your site, and we’ll reply within two business days with next steps.' : 'A few details are enough. We reply within two business days.'}</p>
  </header>
);
function HeadWithParams() { return <Head audit={useSearchParams().get('service') === 'audit'} />; }
export function ContactHead() { return <Suspense fallback={<Head audit={false} />}><HeadWithParams /></Suspense>; }

function FormWithParams({ services }: { services: Svc[] }) {
  const pre = useSearchParams().get('service');
  return <ContactForm key={pre || ''} services={services} pre={pre} />;
}
export default function Contact({ services }: { services: Svc[] }) {
  return <Suspense fallback={<ContactForm services={services} pre={null} />}><FormWithParams services={services} /></Suspense>;
}

type Errors = { message?: string; name?: string; email?: string };

function ContactForm({ services, pre }: { services: Svc[]; pre: string | null }) {
  const audit = pre === 'audit';
  const [picked, setPicked] = useState<string[]>(() => (pre && [...services.map(s => s.id), OTHER.id].includes(pre) ? [pre] : []));
  const [goals, setGoals] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [edited, setEdited] = useState(false);
  const [base, setBase] = useState(''); // the suggestion the visitor started editing from
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [gotcha, setGotcha] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [note, setNote] = useState<{ kind: '' | 'ok' | 'err'; node: React.ReactNode }>({ kind: '', node: null });
  const [tip, setTip] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ name: string; email: string; website: string } | null>(null);
  const [focusMsg, setFocusMsg] = useState(false);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const otherOn = picked.includes(OTHER.id);
  const compose = (ids: string[], gs: string[]) => {
    const named = services.filter(s => ids.includes(s.id));
    const visibleGoals = services.filter(s => ids.includes(s.id)).flatMap(s => s.goals).filter(g => gs.includes(g)).map(lcFirst);
    // "Something else" leaves the sentence open for the visitor to finish
    if (!named.length) return ids.includes(OTHER.id) ? 'Hi, we’re looking for help with ' : '';
    let t = `Hi, we’d like help with ${list(named.map(phrase))}.`;
    if (visibleGoals.length) t += ` Our main ${visibleGoals.length === 1 ? 'goal is to' : 'goals are to'} ${list(visibleGoals)}.`;
    if (ids.includes(OTHER.id)) t += ' We’d also like help with ';
    return t;
  };
  const generated = compose(picked, goals);

  const rules = {
    message: (v: string) => !v ? 'Tap what you need above, or write a line about your project.'
      : otherOn && v === generated.trim() ? `Finish the sentence: what ${picked.some(id => id !== OTHER.id) ? 'else ' : ''}do you need help with?` : '',
    name: (v: string) => (v ? '' : 'Please add your name.'),
    email: (v: string) => (!v ? 'Please add your email so we can reply.' : isEmail(v) ? '' : 'That email looks incomplete. Check it reads like name@company.com.'),
  };

  // the message follows the taps until the visitor edits it; if they only added words after it, keep their words
  const choicesChanged = (ids: string[], gs: string[]) => {
    const keptGoals = gs.filter(g => services.some(s => ids.includes(s.id) && s.goals.includes(g)));
    const next = compose(ids, keptGoals);
    setPicked(ids);
    setGoals(keptGoals);
    if (edited && base && next && message.startsWith(base)) { setMessage(next + message.slice(base.length)); setBase(next); }
    else if (!edited) {
      setMessage(next);
      // an error under the message updates with the new suggestion
      if (errors.message && next) setErrors(e => ({ ...e, message: ids.includes(OTHER.id) ? `Finish the sentence: what ${ids.some(id => id !== OTHER.id) ? 'else ' : ''}do you need help with?` : '' }));
    }
  };
  const toggleService = (id: string) => {
    const ids = picked.includes(id) ? picked.filter(x => x !== id) : [...picked, id];
    choicesChanged(ids, goals);
    if (id === OTHER.id && !picked.includes(id)) setFocusMsg(true);
  };
  const toggleGoal = (g: string) => choicesChanged(picked, goals.includes(g) ? goals.filter(x => x !== g) : [...goals, g]);

  // first render (e.g. arriving from /contact/?service=audit): write the suggestion
  useEffect(() => { if (picked.length) setMessage(compose(picked, goals)); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // "Something else": put the cursor at the end of the open sentence, ready to type
  useEffect(() => {
    if (!focusMsg || !msgRef.current) return;
    setFocusMsg(false);
    const el = msgRef.current;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, [focusMsg, message]);

  const onMessage = (v: string) => {
    if (!edited) setBase(generated);
    const isEdited = v.trim() !== '' && v !== generated;
    setEdited(isEdited);
    setMessage(v);
    if (errors.message) fieldInput('message', v);
  };

  // fixing a field clears its error, and the note under the button keeps count
  const fieldInput = (k: keyof Errors, v: string) => {
    if (!errors[k]) return;
    const next = { ...errors, [k]: rules[k](v.trim()) };
    setErrors(next);
    if (note.kind === 'err') {
      const left = Object.values(next).filter(Boolean).length;
      setNote(left ? { kind: 'err', node: left === 1 ? 'One thing to fix above.' : `${left} things to fix above.` } : { kind: '', node: null });
    }
  };

  // spot common email typos and offer the fix in one tap
  const suggest = (v: string) => {
    const [user, dom] = v.trim().toLowerCase().split('@');
    setTip('');
    if (!user || !dom || DOMAINS.includes(dom)) return;
    const best = DOMAINS.map(x => [x, distance(dom, x)] as const).sort((a, b) => a[1] - b[1])[0];
    if (best[1] > 0 && best[1] <= 2) setTip(`${user}@${best[0]}`);
  };

  const goalsShown = services.filter(s => picked.includes(s.id));
  const siteShown = picked.some(id => SITE_FOR.includes(id));
  const hintShown = !edited && Boolean(generated);
  const resetShown = edited && Boolean(generated) && generated !== base;
  const subject = audit ? 'Website audit request' : 'New project inquiry';
  const serviceNames = [...services.filter(s => picked.includes(s.id)).map(s => s.name), ...(otherOn ? [OTHER.name] : [])];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const next: Errors = { message: rules.message(message.trim()), name: rules.name(name.trim()), email: rules.email(email.trim()) };
    setErrors(next);
    const bad = (Object.keys(next) as (keyof Errors)[]).filter(k => next[k]);
    if (bad.length) {
      setNote({ kind: 'err', node: bad.length === 1 ? 'One thing to fix above.' : `${bad.length} things to fix above.` });
      formRef.current?.querySelector<HTMLElement>(`[name="${bad[0]}"]`)?.focus();
      return;
    }
    if (gotcha) return; // spam trap
    setSending(true);
    setNote({ kind: '', node: null });
    try {
      const r = await postForm('/api/contact/', {
        kind: 'inquiry', subject, name: name.trim(), email: email.trim(), website: website.trim(),
        services: serviceNames, goals, message: message.trim(),
      });
      if (r === 'fallback') {
        // email isn't set up yet: hand over to the email app, with a copy button for people who don't have one
        const body = `Name: ${name}\nEmail: ${email}\nWebsite: ${website || '—'}\nServices: ${serviceNames.join(', ') || '—'}\nGoals: ${goals.join(', ') || '—'}\n\n${message}`;
        setSending(false);
        setNote({ kind: 'ok', node: <>Your email app should open with this message ready; just press send. Nothing opened? <CopyButton text={body} onFail={() => msgRef.current?.select()} /> and email it to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</> });
        track('Inquiry email app opened', { type: audit ? 'audit' : 'project' });
        location.href = mailto(subject, body);
        return;
      }
      track('Inquiry sent', { type: audit ? 'audit' : 'project', goals: goals.length });
      setDone({ name: name.trim(), email: email.trim(), website: website.trim() });
    } catch {
      setSending(false);
      setNote({ kind: 'err', node: <>That didn’t send. Please try again, or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Nothing you typed has been lost.</> });
    }
  };

  if (done) return <Done {...done} audit={audit} />;

  const err = (k: keyof Errors) => (errors[k] ? ' is-invalid' : '');
  return (
    <form ref={formRef} className="form form--quick module" noValidate onSubmit={submit}>
      <p className="hp" aria-hidden="true"><label>Leave this empty <input name="_gotcha" tabIndex={-1} autoComplete="off" value={gotcha} onChange={e => setGotcha(e.target.value)} /></label></p>
      <p className="form__time"><span className="led" aria-hidden="true" />Takes about 30 seconds. Tap, check, send.</p>

      <fieldset className="field">
        <legend>What do you need? <span className="field__opt">Tap all that fit</span></legend>
        <div className="choices">
          {[...services, { ...OTHER, goals: [] }].map(s => (
            <label className="choice" key={s.id}>
              <input type="checkbox" name="service" value={s.name} checked={picked.includes(s.id)} onChange={() => toggleService(s.id)} /><span>{s.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="field goals" hidden={!goalsShown.some(s => s.goals.length)}>
        <legend>What would you like to achieve? <span className="field__opt">Tap any that fit</span></legend>
        <div className="choices choices--goals">
          {services.flatMap(s => s.goals.map(g => (
            <label className="choice choice--goal" key={`${s.id}-${g}`} hidden={!picked.includes(s.id)}>
              <input type="checkbox" name="goal" value={g} checked={goals.includes(g)} onChange={() => toggleGoal(g)} /><span>{g}</span>
            </label>
          )))}
        </div>
      </fieldset>

      <div className="field" hidden={!siteShown}>
        <label htmlFor="f-site">Website to look at <span className="field__opt">optional</span></label>
        <input id="f-site" name="website" type="text" inputMode="url" autoComplete="url" autoCapitalize="off" spellCheck={false} placeholder="yourcompany.com" value={website} onChange={e => setWebsite(e.target.value)} />
      </div>

      <div className={`field${err('message')}`}>
        <label htmlFor="f-msg">Your message</label>
        <p className="field__hint" hidden={!hintShown}>{otherOn ? 'We’ve started it for you. Finish the sentence with what you need.' : 'We’ve started it for you from your choices. Change anything you like.'}</p>
        <textarea ref={msgRef} id="f-msg" name="message" rows={4} required aria-describedby="f-msg-err" aria-invalid={Boolean(errors.message)}
          placeholder="Tap what you need above and we’ll start this for you, or write your own." value={message} onChange={e => onMessage(e.target.value)} />
        <button type="button" className="linkbtn" hidden={!resetShown} onClick={() => { setEdited(false); setMessage(generated); msgRef.current?.focus(); }}>Update the message to match your choices</button>
        <p className="field__err" id="f-msg-err">{errors.message}</p>
      </div>

      <div className="form__row">
        <div className={`field${err('name')}`}>
          <label htmlFor="f-name">Your name</label>
          <input id="f-name" name="name" autoComplete="name" autoCapitalize="words" required aria-describedby="f-name-err" aria-invalid={Boolean(errors.name)}
            value={name} onChange={e => { setName(e.target.value); fieldInput('name', e.target.value); }} />
          <p className="field__err" id="f-name-err">{errors.name}</p>
        </div>
        <div className={`field${err('email')}`}>
          <label htmlFor="f-email">Email</label>
          <input id="f-email" name="email" type="email" autoComplete="email" autoCapitalize="off" spellCheck={false} enterKeyHint="send" required
            aria-describedby="f-email-err f-email-tip" aria-invalid={Boolean(errors.email)} value={email}
            onChange={e => { setEmail(e.target.value); fieldInput('email', e.target.value); if (tip) suggest(e.target.value); }} onBlur={e => suggest(e.target.value)} />
          <p className="field__err" id="f-email-err">{errors.email}</p>
          <p className="field__tip" id="f-email-tip" hidden={!tip}>Did you mean <button type="button" className="linkbtn"
            onClick={() => { setEmail(tip); setTip(''); fieldInput('email', tip); document.getElementById('f-email')?.focus(); }}>{tip}</button>?</p>
        </div>
      </div>

      <div className="form__foot">
        <button className="btn btn--dark" type="submit" disabled={sending} aria-busy={sending}>{sending ? 'Sending…' : 'Send inquiry'}</button>
        <p className="form__assure">We reply within two business days. No spam, ever.</p>
        <p className={`form__msg${note.kind ? ` is-${note.kind}` : ''}`} role="status" aria-live="polite">{note.node}</p>
      </div>
    </form>
  );
}

function CopyButton({ text, onFail }: { text: string; onFail: () => void }) {
  const [label, setLabel] = useState('Copy my message');
  return <button type="button" className="linkbtn" onClick={async () => {
    try { await navigator.clipboard.writeText(text); setLabel('Copied'); } catch { onFail(); setLabel('Select your message above and copy it'); }
  }}>{label}</button>;
}

// a Braun-style slide switch: radio buttons under a sliding thumb
function Slide({ name, legend, opts, value, onChange }: { name: string; legend: string; opts: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="field">
      <legend>{legend}</legend>
      <div className="slide" style={{ '--n': opts.length } as React.CSSProperties}>
        {opts.map(o => <label key={o}><input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} /><span>{o}</span></label>)}
        <span className="slide__thumb" aria-hidden="true" />
      </div>
    </fieldset>
  );
}

// after sending: a thank-you, plus optional one-tap details (budget, timeline, website) sent as a follow-up
function Done({ name, email, website, audit }: { name: string; email: string; website: string; audit: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [site, setSite] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [msg, setMsg] = useState('');
  useEffect(() => {
    box.current?.focus({ preventScroll: true });
    box.current?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, []);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state !== 'idle') return;
    if (!budget && !timeline && !site.trim()) { setMsg('Tap a budget or timeline first, or skip this; it’s optional.'); return; }
    setState('sending');
    try {
      await postForm('/api/contact/', { kind: 'details', name, email, budget, timeline, website: site.trim() });
      setState('sent');
      track('Inquiry details added');
    } catch {
      setState('idle');
      setMsg('That didn’t send. You can include these details in your reply to us instead.');
    }
  };
  return (
    <div className="form__done module" tabIndex={-1} ref={box}>
      <p className="label"><span className="led" aria-hidden="true" />Inquiry sent</p>
      <h2>Thank you, {name.split(' ')[0]}.</h2>
      <p>We’ll reply within two business days{audit ? ' with next steps for your audit' : ''}.</p>
      <form className="followup" noValidate onSubmit={submit}>
        {state === 'sent' ? <p className="followup__title">Thanks, that helps us prepare a better first reply.</p> : <>
          <p className="followup__title">Want a more useful first reply? <span>Two taps, both optional.</span></p>
          <Slide name="budget" legend="Budget" opts={['Under $5k', '$5–15k', '$15–40k', '$40k+']} value={budget} onChange={setBudget} />
          <Slide name="timeline" legend="Timeline" opts={['As soon as possible', 'In 1–3 months', 'Flexible']} value={timeline} onChange={setTimeline} />
          {website ? null : (
            <div className="field"><label htmlFor="fu-site">Your website</label>
              <input id="fu-site" name="website" type="text" inputMode="url" autoComplete="url" autoCapitalize="off" spellCheck={false} placeholder="yourcompany.com" value={site} onChange={e => setSite(e.target.value)} /></div>
          )}
          <div className="followup__foot">
            <button type="submit" className="btn btn--sm" disabled={state === 'sending'} aria-busy={state === 'sending'}>{state === 'sending' ? 'Adding…' : 'Add these details'}</button>
            <p className="followup__msg" role="status" aria-live="polite">{msg}</p>
          </div>
        </>}
      </form>
    </div>
  );
}
