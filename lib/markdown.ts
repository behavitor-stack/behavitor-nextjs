// A small Markdown renderer for posts written in the editor. Used for the live preview and the published page,
// so both always match. Raw HTML is escaped; the site's own blocks are written as short tags:
//
//   ## Heading                 → section heading (appears in "On this page")
//   ### Smaller heading
//   **bold**  *italic*  `code`  [link](https://…)  ![description](image URL)
//   - list item  /  1. numbered item
//   > quote
//   ---                        → divider
//   :::note                    → a tip box (until the closing :::)
//   :::compare Before | After  → two boxes side by side; separate them with a line containing only ---
//   :::

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// only web links and site paths, never javascript: and friends
const safeUrl = (u: string) => (/^(https?:\/\/|\/|#|mailto:)/i.test(u.trim()) ? u.trim() : '#');

const inline = (text: string) => {
  let s = esc(text);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) => `<img src="${safeUrl(src)}" alt="${alt}" loading="lazy" decoding="async">`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => {
    const url = safeUrl(href);
    return `<a href="${url}"${/^https?:/i.test(url) ? ' rel="noopener"' : ''}>${t}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return s;
};

function blocks(lines: string[]): string {
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    // :::note / :::compare blocks
    const open = line.match(/^:::(note|compare)\s*(.*)$/);
    if (open) {
      const inner: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') inner.push(lines[i++]);
      i++; // closing :::
      if (open[1] === 'note') {
        out.push(`<p class="note">${inline(inner.join(' ').trim())}</p>`);
      } else {
        const [a, b] = (open[2] || 'Before | After').split('|').map(s => s.trim());
        const split = inner.findIndex(l => l.trim() === '---');
        const left = split < 0 ? inner : inner.slice(0, split);
        const right = split < 0 ? [] : inner.slice(split + 1);
        out.push(`<div class="compare"><div><p class="compare__label">${esc(a || 'Before')}</p>${blocks(left)}</div><div><p class="compare__label">${esc(b || 'After')}</p>${blocks(right)}</div></div>`);
      }
      continue;
    }

    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) { out.push(`<h${h[1].length}>${inline(h[2].trim())}</h${h[1].length}>`); i++; continue; }

    if (/^-{3,}\s*$/.test(line)) { out.push('<hr>'); i++; continue; }

    if (/^>\s?/.test(line)) {
      const q: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote><p>${inline(q.join(' '))}</p></blockquote>`);
      continue;
    }

    const ul = /^\s*[-*]\s+/, ol = /^\s*\d+[.)]\s+/;
    if (ul.test(line) || ol.test(line)) {
      const re = ul.test(line) ? ul : ol;
      const tag = re === ul ? 'ul' : 'ol';
      const items: string[] = [];
      while (i < lines.length && re.test(lines[i])) items.push(`<li>${inline(lines[i++].replace(re, ''))}</li>`);
      out.push(`<${tag}>${items.join('')}</${tag}>`);
      continue;
    }

    // paragraph: consecutive lines until a blank line or another block starts
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3}\s|>|:::|\s*[-*]\s+|\s*\d+[.)]\s+|-{3,}\s*$)/.test(lines[i])) para.push(lines[i++].trim());
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
    else i++;
  }
  return out.join('\n');
}

export const markdownToHtml = (md: string) => blocks(md.replace(/\r\n?/g, '\n').split('\n'));
