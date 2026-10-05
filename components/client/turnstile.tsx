'use client';

import { useEffect, useRef } from 'react';

type TurnstileApi = {
  ready: (callback: () => void) => void;
  render: (container: HTMLElement, options: {
    sitekey: string;
    action: string;
    theme: 'auto';
    callback: (token: string) => void;
    'expired-callback': () => void;
    'error-callback': () => void;
  }) => string;
  remove: (widgetId: string) => void;
};

declare global { interface Window { turnstile?: TurnstileApi } }

let script: Promise<void> | undefined;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  if (script) return script;
  script = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile]');
    const element = existing || document.createElement('script');
    const loaded = () => resolve();
    const failed = () => reject(new Error('Could not load Turnstile'));
    element.addEventListener('load', loaded, { once: true });
    element.addEventListener('error', failed, { once: true });
    if (!existing) {
      element.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      element.async = true;
      element.dataset.turnstile = 'true';
      document.head.appendChild(element);
    }
  });
  return script;
}

type Props = { action: string; onToken: (token: string) => void };

// The widget is deliberately explicit: these forms are client-rendered and some appear conditionally.
export default function Turnstile({ action, onToken }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !container.current) return;
    let cancelled = false;
    loadTurnstile().then(() => {
      window.turnstile?.ready(() => {
        if (cancelled || !container.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(container.current, {
          sitekey: siteKey,
          action,
          theme: 'auto',
          callback: onToken,
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
        });
      });
    }).catch(() => onToken(''));
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
    };
  }, [action, onToken, siteKey]);

  if (!siteKey) return null;
  return <div className="turnstile" ref={container} aria-label="Spam protection" />;
}
