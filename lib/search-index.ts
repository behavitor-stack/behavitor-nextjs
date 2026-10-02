// The search index: every article, concept, service, the sample audit and the checklist. Served at /search.json.
import 'server-only';
import { work, services, laws, sampleAudit, lawById, question } from './site';
import { getPosts } from './posts';
import type { SearchDoc } from './search-engine';

const plain = (html: string) => html
  .replace(/([^.!?:\s])\s*<\/(h[1-6]|li|dt|figcaption)>/g, '$1. ')
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

export async function searchIndex(): Promise<SearchDoc[]> {
  const posts = await getPosts();
  return [
    ...posts.map(p => ({ t: p.title, u: p.url, s: p.section, m: `${p.section === 'ai' ? 'AI' : 'Blog'} · ${p.tag}`, d: p.excerpt, x: plain(p.html), dt: p.date })),
    ...work.map(w => ({ t: w.title, u: `/work/${w.slug}/`, s: 'work', m: `Work · ${lawById[w.law]?.name || 'Concept'}`, d: w.summary, x: [w.problem, ...w.issues, w.concept, ...w.expect].join(' ') })),
    ...services.map(sv => ({ t: sv.name, u: `/services/#${sv.id}`, s: 'services', m: 'Service', d: sv.line, x: plain([sv.body, ...sv.items, ...sv.goals].join(' ')) })),
    { t: 'Sample audit report', u: '/sample-audit/', s: 'services', m: 'Website audit', d: 'What an audit looks like: scores, findings with evidence, and a plan ranked by impact.', x: sampleAudit.findings.map(f => `${f.title} ${f.fix}`).join(' ') },
    ...laws.map(l => ({ t: `${l.name}: ${l.short}`, u: `/checklist/#check-${l.id}`, s: 'checklist', m: 'Free checklist', d: question(l), x: l.good })),
  ];
}

// starting ideas for an empty search box: only words that find something
export async function searchIdeas() {
  const docs = await searchIndex();
  return ['Forms', 'Speed', 'Menus', 'Mobile', 'Trust', 'Accessibility', 'Prompts', 'AI search', 'Research', 'Microcopy']
    .filter(w => docs.some(d => `${d.t} ${d.d} ${d.x}`.toLowerCase().includes(w.toLowerCase()))).slice(0, 6);
}
