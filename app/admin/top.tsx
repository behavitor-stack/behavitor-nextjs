import Link from 'next/link';
import { logout } from './actions';

export default function Top({ children }: { children?: React.ReactNode }) {
  return (
    <header className="adm-top">
      <Link href="/admin/" className="adm-brand"><span className="logo__dot" aria-hidden="true" />behavitor <span>Editor</span></Link>
      <div className="adm-top__right">
        {children}
        <a href="/" className="adm-link" target="_blank" rel="noopener">View site ↗</a>
        <form action={logout}><button type="submit" className="adm-link">Sign out</button></form>
      </div>
    </header>
  );
}
