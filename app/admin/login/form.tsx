'use client';
import { useActionState } from 'react';
import { login } from '../actions';

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="module adm-card">
      <h1>Sign in</h1>
      <div className="field">
        <label htmlFor="pw">Password</label>
        <input id="pw" name="password" type="password" autoComplete="current-password" required autoFocus aria-describedby="pw-err" aria-invalid={Boolean(error)} />
        <p className="field__err" id="pw-err">{error}</p>
      </div>
      <button className="btn btn--dark" type="submit" disabled={pending} aria-busy={pending}>{pending ? 'Checking…' : 'Sign in'}</button>
    </form>
  );
}
