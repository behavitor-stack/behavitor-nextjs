// Everything the pages share: content from /content, small helpers and the post model.
import { site, services, work, laws, about, testimonials, aiPolicy } from '@/content/data.js';
import { lawArt } from '@/content/art/law-art.js';
import { postArt, coverNames } from '@/content/art/post-art.js';
import { conceptArt } from '@/content/art/concept-art.js';
import { sampleAudit } from '@/content/sample-audit.js';
import { terms } from '@/content/terms.js';

export { site, services, work, laws, about, testimonials, aiPolicy, lawArt, postArt, coverNames, conceptArt, sampleAudit, terms };

export type Law = (typeof laws)[number];
export type Service = (typeof services)[number];
export type Work = (typeof work)[number];

export const lawById: Record<string, Law> = Object.fromEntries(laws.map(l => [l.id, l]));
// the dial's check, phrased as a question to the visitor ("Check: does…" → "Does…")
export const question = (l: Law) => l.use.replace(/^Check: (.)/, (_: string, c: string) => c.toUpperCase());

export const fmtDate = (d: string) =>
  new Date(`${d.slice(0, 10)}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const NAV: [string, string][] = [
  ['Services', '/services/'], ['Work', '/work/'], ['Blog', '/blog/'], ['AI', '/ai/'],
  ...(about.published ? [['About', '/about/'] as [string, string]] : []),
  ['Contact', '/contact/'],
];

export const principles: [string, string][] = [
  ['Useful', 'Every page has a job. We design around the tasks people came to do.'],
  ['Understandable', 'Clear words and clear structure. Nobody should need instructions.'],
  ['Honest', 'No dark patterns and no inflated promises. What you see is what you get.'],
  ['Unobtrusive', 'Design steps back so your content and product can lead.'],
  ['Long-lasting', 'Solid systems that age well, rather than trends that fade.'],
  ['Thorough', 'Speed, accessibility and detail are part of the work, not extras.'],
];

export const conceptNote = 'Concept project. Our own design thinking, built from common patterns: not client work, and not based on any single organization.';

// lower-cased first letter, e.g. for "A website audit is from $1,500"
export const lcFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

// JSON-LD for <script type="application/ld+json">: escape "<" so the data can never close the tag
export const ldJson = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') });
