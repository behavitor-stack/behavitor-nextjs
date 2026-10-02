import Contact, { ContactHead } from '@/components/client/contact';
import { Label } from '@/components/ui';
import { site, services } from '@/lib/site';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  path: '/contact/', title: 'Contact',
  description: 'Tell Behavitor about your project or book a website audit. A few details are enough, and we reply within two business days.',
});

export default function ContactPage() {
  return (
    <>
      <ContactHead />
      <section className="block block--tight">
        <div className="contact">
          <Contact services={services.map(s => ({ id: s.id, name: s.name, goals: s.goals }))} />
          <aside className="contact__side">
            {site.bookingUrl ? (
              <div className="module module--book">
                <Label>Prefer to talk?</Label>
                <p>Pick a time for a free 20-minute call.</p>
                <a href={site.bookingUrl} className="btn btn--sm" target="_blank" rel="noopener" data-book>Book a call</a>
              </div>
            ) : null}
            <div className="module"><Label>Email</Label><p><a href={`mailto:${site.email}`}>{site.email}</a></p></div>
            <div className="module"><Label>Response time</Label><p>Within two business days.</p></div>
            <div className="module"><Label>What happens next</Label><p>A short call to understand your goals, then a clear proposal with scope, timeline and price.</p></div>
          </aside>
        </div>
      </section>
    </>
  );
}
