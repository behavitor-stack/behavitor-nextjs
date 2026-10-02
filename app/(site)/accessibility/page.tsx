import { PageHead } from '@/components/ui';
import { site, terms } from '@/lib/site';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  path: '/accessibility/', title: 'Accessibility',
  description: 'How Behavitor makes this website usable for everyone: the standard we aim for, what we check, known limits and how to tell us about a problem.',
});

export default function Accessibility() {
  return (
    <>
      <PageHead kicker="Accessibility" title="Accessibility statement" lead="We audit other websites for accessibility, so we hold our own to the same standard." />
      <div className="prose">
        <p><strong>Last reviewed:</strong> {terms.updated}. Found a problem? Email <a href={`mailto:${site.email}`}>{site.email}</a> and we’ll reply within two business days.</p>
        <h2>The standard we aim for</h2>
        <p>We design and build this site to meet the <a href="https://www.w3.org/TR/WCAG22/" rel="noopener">Web Content Accessibility Guidelines (WCAG) 2.2</a> at level AA.</p>
        <h2>What we check</h2>
        <ul>
          <li><strong>Keyboard:</strong> everything works without a mouse, with a visible focus outline. The dial is a slider you can turn with the arrow keys, and search opens with the <kbd>/</kbd> key.</li>
          <li><strong>Contrast:</strong> body text and labels meet at least 4.5:1. Orange is used only for small indicator lamps, never for text.</li>
          <li><strong>Motion:</strong> if your device asks for reduced motion, the dial stops turning by itself and other animations are switched off.</li>
          <li><strong>Forms:</strong> every field has a label, errors are explained in words next to the field, and nothing depends on color alone.</li>
          <li><strong>Structure:</strong> pages use headings, landmarks and plain language, and work when zoomed to 200% or viewed on a phone.</li>
        </ul>
        <h2>Known limits</h2>
        <ul>
          <li>Our AI news page links to articles on other websites, which we don’t control.</li>
          <li>Diagrams and illustrations are decorative. What they show is always written in the text around them.</li>
          <li>We test with automated checks and by hand, but haven’t yet had an independent audit by people who use assistive technology every day. That’s next.</li>
        </ul>
      </div>
    </>
  );
}
