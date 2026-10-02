import Link from 'next/link';
import { Label } from '@/components/ui';

export default function Lost() {
  return (
    <section className="lost">
      <div className="tuner" aria-hidden="true">
        <div className="tuner__scale">{Array.from({ length: 41 }, (_, i) => <span key={i} className={i % 5 ? undefined : 'is-major'} />)}</div>
        <div className="tuner__nums"><span>200</span><span>301</span><span>404</span><span>500</span></div>
        <span className="tuner__needle" />
        <span className="grille tuner__grille" />
      </div>
      <Label>Error 404 · No signal</Label>
      <h1>This page is off the dial.</h1>
      <p className="lead">It may have moved, or the link may be wrong. Try one of these instead.</p>
      <div className="actions actions--center">
        <Link href="/" className="btn btn--dark">Back to home</Link>
        <Link href="/checklist/" className="btn">Try the free checklist</Link>
        <Link href="/blog/" className="btn">Read the blog</Link>
      </div>
    </section>
  );
}
