'use client';
// The hero dial: turn to explore a behavior law. One Braun device: the scale window and its knob share a faceplate.
import { useCallback, useEffect, useRef, useState } from 'react';
import { track } from '@/lib/client';

type LawLite = { id: string; name: string; short: string };

export default function Dial({ laws, arts, ticks, knurl }: { laws: LawLite[]; arts: string[]; ticks: string; knurl: string }) {
  const n = laws.length, step = 360 / n;
  const [index, setIndex] = useState(0);
  const [rot, setRot] = useState(0);
  const [touched, setTouched] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [tick, setTick] = useState(0); // restarts the timer arc
  const knob = useRef<HTMLDivElement>(null);
  const state = useRef({ index: 0, rot: 0, touched: false, startAngle: 0, startRot: 0, wheelLock: 0 });
  state.current.index = index; state.current.rot = rot; state.current.touched = touched;

  const buzz = () => {
    // a small detent "click" on touch screens, only while the visitor is actively turning it
    const nav = navigator as Navigator & { userActivation?: { isActive: boolean } };
    if (state.current.touched && 'vibrate' in navigator && matchMedia('(pointer: coarse)').matches && nav.userActivation?.isActive) navigator.vibrate(4);
  };

  // turn the shortest way round to setting i
  const select = useCallback((i: number) => {
    i = ((i % n) + n) % n;
    let delta = ((i - state.current.index) % n + n) % n;
    if (delta > n / 2) delta -= n;
    setIndex(i);
    setRot(r => r + delta * step);
    buzz();
  }, [n, step]);

  // first touch: stop the auto-turn, fade the hint, and switch on announcements for screen readers
  const stopAuto = () => {
    if (state.current.touched) return;
    state.current.touched = true;
    setTouched(true);
    track('Dial used');
  };

  // the scroll wheel turns the knob one detent at a time (needs a non-passive listener)
  useEffect(() => {
    const el = knob.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now - state.current.wheelLock < 120) return;
      state.current.wheelLock = now;
      stopAuto();
      select(state.current.index + (e.deltaY > 0 ? 1 : -1));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [select]);

  const angleOf = (e: React.PointerEvent) => {
    const r = knob.current!.getBoundingClientRect();
    return Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI;
  };
  const onPointerDown = (e: React.PointerEvent) => {
    stopAuto();
    setDragging(true);
    knob.current!.setPointerCapture(e.pointerId);
    state.current.startAngle = angleOf(e);
    state.current.startRot = state.current.rot;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    let d = angleOf(e) - state.current.startAngle;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    const r = state.current.startRot + d;
    state.current.startAngle = angleOf(e);
    state.current.startRot = r;
    setRot(r);
    const live = ((Math.round(r / step) % n) + n) % n;
    if (live !== state.current.index) { setIndex(live); buzz(); }
  };
  const release = () => {
    if (!dragging) return;
    setDragging(false);
    setRot(r => Math.round(r / step) * step);
  };

  const law = laws[index];
  return (
    <div className={`dialbox${touched ? ' is-used' : ''}${dragging ? ' is-dragging' : ''}`} data-dial style={{ '--n': n } as React.CSSProperties}>
      <div className="device">
        <div className="device__screen">
          <p className="device__legend">{law.name}</p>
          <div className="device__art" aria-hidden="true">
            {arts.map((html, i) => <div key={i} className={`device__item${i === index ? ' is-on' : ''}`} dangerouslySetInnerHTML={{ __html: html }} />)}
          </div>
        </div>
        <div className="device__control">
          <div className="dialbox__ring">
            <span dangerouslySetInnerHTML={{ __html: ticks }} style={{ display: 'contents' }} />
            {/* the timer arc: sweeps from the current setting to the next, then the dial turns. Pauses on hover/focus; off with reduced motion */}
            <svg className="dial-timer" viewBox="0 0 100 100" aria-hidden="true" style={{ transform: `rotate(${rot}deg)` }}>
              {!touched ? <circle key={tick} cx="50" cy="50" r="37" pathLength={360} className="is-running"
                onAnimationEnd={() => { if (!state.current.touched) { select(state.current.index + 1); setTick(t => t + 1); } }} /> : null}
            </svg>
            {laws.map((l, i) => (
              <button key={l.id} type="button" className="dialbox__opt" tabIndex={-1} style={{ '--k': i } as React.CSSProperties}
                aria-label={l.name} aria-pressed={i === index} onClick={() => { stopAuto(); select(i); }} />
            ))}
            <div ref={knob} className="knob3d" tabIndex={0} role="slider" aria-label="Turn to explore how people behave"
              aria-valuemin={0} aria-valuemax={n - 1} aria-valuenow={index} aria-valuetext={law.name}
              style={{ '--rot': `${rot}deg` } as React.CSSProperties}
              onKeyDown={e => {
                const d = ({ ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 } as Record<string, number>)[e.key];
                if (!d) return;
                e.preventDefault();
                stopAuto();
                select(index + d);
              }}
              onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={release} onPointerCancel={release}>
              <span className="knob3d__shadow" aria-hidden="true" />
              <span className="knob3d__body" aria-hidden="true" dangerouslySetInnerHTML={{ __html: knurl }} />
              <span className="knob3d__face" aria-hidden="true"><span className="knob3d__mark" /></span>
              <span className="knob3d__light" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <div className="device__caption" aria-live={touched ? 'polite' : 'off'}>
        <p className="dialbox__says">{law.short}</p>
        <a className="dialbox__more" href={`/checklist/#check-${law.id}`}>Check your site <span className="arr" aria-hidden="true">→</span></a>
      </div>
    </div>
  );
}
