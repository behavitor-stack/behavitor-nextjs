import { editorReady } from '@/lib/auth';
import LoginForm from './form';

export const dynamic = 'force-dynamic';

export default function Login() {
  return (
    <main className="adm-login">
      <p className="adm-brand"><span className="logo__dot" aria-hidden="true" />behavitor <span>Editor</span></p>
      {editorReady() ? <LoginForm /> : (
        <div className="module adm-note">
          <h1>The editor isn’t set up yet.</h1>
          <p>Add <code>ADMIN_PASSWORD</code> and <code>SESSION_SECRET</code> (at least 32 characters) to the project’s environment variables in Vercel, then redeploy. The README explains each step.</p>
        </div>
      )}
    </main>
  );
}
