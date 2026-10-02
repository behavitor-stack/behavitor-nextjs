// Before / after drawings for the concept projects in `work` (data.mjs).
// Same Braun language as law-art.mjs: white keys, black type, grey detail, one orange mark.
// Drawn from common patterns, never from a real organisation's site: no logos, no screenshots.
// Classes are styled in styles.css under .concept-art.

const svg = body => `<svg class="concept-art law-art" viewBox="0 0 300 220" aria-hidden="true">${body}</svg>`;
const range = n => Array.from({ length: n }, (_, i) => i);

// a browser window, 260 × 188
const browser = inner => `
  <rect x="20" y="16" width="260" height="188" rx="10" class="frame"/>
  <circle cx="33" cy="28" r="2.5" class="light"/><circle cx="41" cy="28" r="2.5" class="light"/><circle cx="49" cy="28" r="2.5" class="light"/>
  <rect x="20" y="38" width="260" height="1" class="light"/>
  <rect x="32" y="48" width="38" height="8" rx="2" class="ink"/>
  ${inner}`;
// a phone, 92 × 204, centred
const phone = inner => `
  <rect x="104" y="8" width="92" height="204" rx="14" class="frame"/>
  <rect x="136" y="14" width="28" height="4" rx="2" class="light"/>
  ${inner}`;

export const conceptArt = {
  'city-homepage': {
    before: svg(browser(`
      <rect x="226" y="46" width="42" height="11" rx="5.5" class="light"/>
      ${range(30).map(i => {
        const c = i % 6, r = Math.floor(i / 6);
        return `<rect x="${32 + c * 40}" y="${72 + r * 25}" width="${[30, 24, 28, 22, 32, 26][(i + r) % 6]}" height="5" rx="2.5" class="grey"/>`;
      }).join('')}`)),
    after: svg(browser(`
      <rect x="32" y="66" width="236" height="22" rx="11" class="field-ink"/>
      <circle cx="46" cy="77" r="4" class="icon-ring"/><path d="M49 80l3 3" class="icon-line"/>
      <rect x="58" y="75" width="70" height="4" rx="2" class="light"/>
      ${range(5).map(i => `
        <rect x="${32 + i * 48.5}" y="100" width="42" height="42" rx="9" class="k"/>
        <rect x="${39 + i * 48.5}" y="108" width="10" height="10" rx="3" class="${i === 0 ? 'dot-on' : 'grey'}"/>
        <rect x="${39 + i * 48.5}" y="128" width="26" height="4" rx="2" class="ink"/>`).join('')}
      <rect x="32" y="162" width="58" height="5" rx="2.5" class="ink"/>
      <path d="M96 164.5h8M101 161.5l3 3-3 3" class="icon-line"/>`)),
  },

  'nonprofit-donation': {
    before: svg(phone(`
      ${range(14).map(i => `
        <rect x="114" y="${26 + i * 12.6}" width="${[22, 30, 18, 26][i % 4]}" height="2.6" rx="1.3" class="grey"/>
        <rect x="114" y="${29.6 + i * 12.6}" width="72" height="6" rx="2" class="field"/>`).join('')}`)),
    after: svg(phone(`
      <path d="M126 32h48" class="step-line"/>
      <circle cx="126" cy="32" r="5" class="dot-on"/><circle cx="150" cy="32" r="5" class="light"/><circle cx="174" cy="32" r="5" class="light"/>
      <rect x="114" y="54" width="48" height="7" rx="3.5" class="ink"/>
      ${[0, 1, 2].map(i => `<rect x="${114 + i * 25.5}" y="72" width="21" height="22" rx="6" class="${i === 1 ? 'k k--sel' : 'k'}"/>
        <rect x="${119 + i * 25.5}" y="81" width="11" height="4" rx="2" class="${i === 1 ? 'white' : 'ink'}"/>`).join('')}
      <rect x="114" y="106" width="72" height="16" rx="8" class="track-bg"/>
      <rect x="116" y="108" width="34" height="12" rx="6" class="k"/>
      <rect x="126" y="112" width="14" height="4" rx="2" class="ink"/>
      <rect x="160" y="112" width="18" height="4" rx="2" class="grey"/>
      <rect x="114" y="178" width="72" height="18" rx="9" class="ink"/>
      <rect x="134" y="185" width="32" height="4" rx="2" class="white"/>`)),
  },

  'college-programs': {
    before: svg(phone(`
      <rect x="114" y="24" width="50" height="8" rx="4" class="light"/>
      <rect x="172" y="26" width="14" height="4" rx="2" class="ink"/>
      <circle cx="179" cy="28" r="9" class="ring-hint"/>
      ${range(5).map(i => `<rect x="${114 + i * 15}" y="40" width="12" height="6" rx="3" class="chip"/>`).join('')}
      ${range(5).map(i => `
        <rect x="114" y="${56 + i * 29}" width="72" height="24" rx="5" class="light-card"/>
        <rect x="120" y="${62 + i * 29}" width="40" height="4" rx="2" class="ink"/>
        <rect x="120" y="${70 + i * 29}" width="54" height="3" rx="1.5" class="grey"/>`).join('')}`)),
    after: svg(phone(`
      <clipPath id="thumb-clip"><rect x="104" y="8" width="92" height="204" rx="14"/></clipPath>
      <circle cx="196" cy="212" r="84" class="thumb-zone" clip-path="url(#thumb-clip)"/>
      <rect x="114" y="24" width="72" height="10" rx="5" class="light"/>
      ${range(3).map(i => `
        <rect x="114" y="${42 + i * 20}" width="72" height="15" rx="5" class="k"/>
        <rect x="120" y="${47.5 + i * 20}" width="30" height="4" rx="2" class="ink"/>
        <path d="M176 ${47.5 + i * 20}l3 2.5-3 2.5" class="icon-line"/>`).join('')}
      <rect x="114" y="106" width="30" height="9" rx="4.5" class="ink"/><rect x="148" y="106" width="24" height="9" rx="4.5" class="ink"/>
      ${range(2).map(i => `<rect x="114" y="${124 + i * 20}" width="72" height="15" rx="4" class="light-card"/>`).join('')}
      <rect x="112" y="180" width="76" height="20" rx="10" class="ink"/>
      <rect x="128" y="188" width="44" height="4" rx="2" class="white"/>`)),
  },

  'job-application': {
    before: svg(phone(`
      ${range(12).map(i => `
        <rect x="114" y="${26 + i * 14.4}" width="${[26, 34, 20][i % 3]}" height="2.6" rx="1.3" class="grey"/>
        <rect x="114" y="${30 + i * 14.4}" width="72" height="${i % 4 === 3 ? 7 : 6}" rx="2" class="field"/>`).join('')}
      <rect x="190" y="30" width="2" height="170" rx="1" class="light"/>
      <rect x="190" y="30" width="2" height="18" rx="1" class="grey"/>`)),
    after: svg(phone(`
      <path d="M118 32h64" class="step-line"/>
      ${range(5).map(i => i < 2
        ? `<circle cx="${118 + i * 16}" cy="32" r="5.5" class="ink"/><path d="M${115.5 + i * 16} 32.2l1.8 1.8 3.4-3.6" class="tick-white"/>`
        : `<circle cx="${118 + i * 16}" cy="32" r="5.5" class="${i === 2 ? 'dot-on' : 'light'}"/>`).join('')}
      <rect x="114" y="48" width="42" height="7" rx="3.5" class="ink"/>
      <rect x="160" y="48" width="26" height="8" rx="4" class="saved"/>
      <circle cx="166" cy="52" r="2" class="ink"/><rect x="170" y="50.5" width="12" height="3" rx="1.5" class="grey"/>
      ${range(3).map(i => `
        <rect x="114" y="${68 + i * 24}" width="${[30, 24, 36][i]}" height="3" rx="1.5" class="grey"/>
        <rect x="114" y="${73 + i * 24}" width="72" height="12" rx="3" class="field"/>`).join('')}
      <rect x="114" y="160" width="72" height="18" rx="9" class="ink"/>
      <rect x="134" y="167" width="32" height="4" rx="2" class="white"/>
      <rect x="128" y="188" width="44" height="3" rx="1.5" class="grey"/>
      <rect x="128" y="193" width="44" height="1" class="grey"/>`)),
  },
};
