import { PageHead } from '@/components/ui';
import { site } from '@/lib/site';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  path: '/privacy/', title: 'Privacy',
  description: 'How Behavitor handles personal data: what we collect through our forms, how we use it, the services involved and your rights.',
});

export default function Privacy() {
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;
  const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  return (
    <>
      <PageHead kicker="Privacy" title="Privacy policy" lead="Plain words about what we collect, why, and what you can ask us to do with it." />
      <div className="prose">
        <p><strong>Last updated:</strong> {site.privacyUpdated}. Questions about this policy go to {mail}.</p>
        <h2>What we collect</h2>
        <ul>
          <li><strong>When you contact us:</strong> your name, email address and anything you choose to tell us, such as your website, budget, timeline and project details.</li>
          <li><strong>When you subscribe:</strong> your email address.</li>
          <li><strong>When you use the free checklist:</strong> your answers are saved only in your own browser, on your device. They reach us only if you ask for notes on them, together with the email address and website you give us.</li>
        </ul>
        <h2>How we use it</h2>
        <p>We use your details only to reply to you, to deliver the work you ask for and, if you subscribed, to send our newsletter. We never sell personal data or share it for anyone else’s marketing.</p>
        <h2>Services that help us</h2>
        <ul>
          <li><strong>Resend</strong> delivers the messages you send through our forms to our inbox, and stores newsletter subscriptions.</li>
          <li><strong>Vercel</strong> hosts this website. It keeps short-lived server logs, such as IP addresses, to keep the site secure and running.</li>
          {site.analytics.plausibleDomain ? <li><strong>Plausible Analytics</strong> counts visits without cookies and without collecting personal data.</li> : null}
          {gaEnabled ? <li><strong>Google Analytics</strong> helps us understand how visitors use the site. Google may set analytics cookies and process device and usage data under its own privacy policy.</li> : null}
          <li>Our typefaces are served from this website, so your browser doesn’t connect to anyone else to load them.</li>
        </ul>
        <h2>Cookies</h2>
        <p>{gaEnabled ? 'Google Analytics uses analytics cookies to measure site use. We do not use advertising cookies.' : 'This site does not use tracking or advertising cookies.'}</p>
        <h2>How long we keep it</h2>
        <p>We keep inquiries for as long as we are talking about or working on a project, and then for up to two years. Newsletter addresses are kept until you unsubscribe.</p>
        <h2>Your rights</h2>
        <p>You can ask to see, correct or delete the personal data we hold about you, or object to how we use it, at any time by emailing {mail}. You can unsubscribe from the newsletter with the link in any issue. If you are unhappy with how we handle your data, you can also complain to your local data protection authority.</p>
      </div>
    </>
  );
}
