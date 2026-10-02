// Search scoring, shared by the search panel. Whole words count most; a word still being typed matches the start of words.
export interface SearchDoc { t: string; u: string; s: string; m: string; d: string; x: string; dt?: string }
export interface Indexed extends SearchDoc { T: string; M: string; D: string; X: string }

export const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '');
export const indexDocs = (list: SearchDoc[]): Indexed[] => list.map(d => ({ ...d, T: norm(d.t), M: norm(d.m), D: norm(d.d), X: norm(d.x) }));
export const words = (q: string) => norm(q).split(/[^a-z0-9]+/).filter(w => w.length > 1 || /\d/.test(w));

const stem = (w: string) => (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w);
const pattern = (w: string) => new RegExp(`\\b${stem(w)}`, 'g');
const whole = (w: string) => new RegExp(`\\b${stem(w)}(?:s|es)?\\b`, 'g');
const count = (field: string, re: RegExp) => (field.match(re) || []).length;

// partial: words still being typed, which don't match a whole word anywhere yet
export const partialWords = (docs: Indexed[], ws: string[]) => ws.filter(w => !docs.some(d => whole(w).test(`${d.T} ${d.D} ${d.X}`)));

export const score = (d: Indexed, ws: string[], partial: string[] = []) => {
  let total = 0;
  for (const w of ws) {
    const p = pattern(w), f = partial.includes(w) ? p : whole(w);
    const hit = (field: string, weight: number) => (count(field, f) ? weight : count(field, p) ? weight / 2 : 0);
    const full = count(d.X, f);
    const s = hit(d.T, 12) + hit(d.M, 6) + hit(d.D, 4) + Math.min(full, 5) + Math.min(count(d.X, p) - full, 5) / 4;
    if (!s) return 0; // every word has to match somewhere
    total += s;
  }
  return total >= 1 ? total : 0; // one passing partial mention isn't a result
};

const escHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// highlight matches; the text is escaped piece by piece, so the result is safe to insert as HTML
export const mark = (text: string, ws: string[]) => {
  const re = new RegExp(`\\b((?:${[...new Set(ws.map(stem))].join('|')})\\w*)`, 'gi');
  let html = '', i = 0;
  for (const m of text.matchAll(re)) { html += `${escHtml(text.slice(i, m.index))}<mark>${escHtml(m[0])}</mark>`; i = (m.index ?? 0) + m[0].length; }
  return html + escHtml(text.slice(i));
};

// a short passage around the first match, when the summary doesn't mention it
export const snippet = (d: Indexed, ws: string[]) => {
  if (ws.some(w => pattern(w).test(d.D))) return d.d;
  const at = Math.max(0, ws.map(w => d.X.search(pattern(w))).filter(i => i >= 0).sort((a, b) => a - b)[0] ?? 0);
  const start = Math.max(0, d.x.lastIndexOf(' ', at - 60) + 1);
  return `${start ? '…' : ''}${d.x.slice(start, start + 170).replace(/\s\S*$/, '').replace(/[\s.,;:]+$/, '')}…`;
};
