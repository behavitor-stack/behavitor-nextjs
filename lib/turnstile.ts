import 'server-only';

type Verification = { success?: boolean; action?: string };

// When no secret is configured, local development keeps working. Production should set both keys.
export async function verifyTurnstile(token: unknown, ip: string, action: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== 'string' || !token) return false;

  try {
    const form = new URLSearchParams({ secret, response: token, remoteip: ip });
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body: form, cache: 'no-store',
    });
    const result = await response.json() as Verification;
    return result.success === true && result.action === action;
  } catch {
    return false;
  }
}
