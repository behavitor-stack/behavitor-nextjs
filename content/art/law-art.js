// Mini diagrams for the hero dial: each one demonstrates a behaviour law.
// Pure SVG + CSS animation (classes are styled in styles.css under .law-art).
// Palette: ink #111, grey #b4b4b8, light #dededa, signal #f95c31.

const svg = body => `<svg class="law-art" viewBox="0 0 280 110" aria-hidden="true">${body}</svg>`;
const cap = (x, y, t, anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" class="cap">${t}</text>`;
const key = (x, y, w = 18, h = 18, cls = 'k') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" class="${cls}"/>`;
const track = (x, y, w, cls) => `<rect x="${x}" y="${y}" width="${w}" height="5" rx="2.5" class="track"/><rect x="${x}" y="${y}" width="${w}" height="5" rx="2.5" class="bar ${cls}"/>`;

export const lawArt = {
  hick: svg(`
    ${[0, 1, 2].map(c => [0, 1].map(r => key(26 + c * 26, 20 + r * 26)).join('')).join('')}
    ${track(26, 78, 70, 'fill-slow')}
    ${cap(61, 100, 'six choices · slow')}
    <text x="140" y="52" text-anchor="middle" class="arrow">→</text>
    ${key(184, 33)}${key(210, 33, 18, 18, 'k k--on')}
    ${track(184, 78, 70, 'fill-fast')}
    ${cap(219, 100, 'two choices · fast')}`),

  fitts: svg(`
    <path d="M40 72 L112 58" class="dash"/>
    <path d="M40 72 L238 28" class="dash dash--faint"/>
    <circle cx="120" cy="56" r="20" class="target"/>
    <circle cx="120" cy="56" r="6" class="dot-on"/>
    <circle cx="240" cy="28" r="6" class="target target--small"/>
    <g class="cursor"><path d="M36 66 l0 16 l4 -4 l3 7 l3 -1.5 l-3 -7 l6 0 z" class="pointer"/></g>
    ${cap(120, 100, 'near & large: quick')}
    ${cap(236, 58, 'far & small: slow')}`),

  jakob: svg(`
    ${[30, 160].map(x => `
      <rect x="${x}" y="14" width="90" height="66" rx="8" class="frame"/>
      <rect x="${x + 8}" y="22" width="14" height="6" rx="2" class="ink"/>
      <rect x="${x + 50}" y="24" width="32" height="3" rx="1.5" class="grey"/>
      <rect x="${x + 8}" y="38" width="48" height="8" rx="2" class="grey"/>
      <rect x="${x + 8}" y="52" width="34" height="4" rx="2" class="light"/>
      <rect x="${x + 8}" y="64" width="22" height="8" rx="4" class="ink"/>`).join('')}
    <text x="140" y="52" text-anchor="middle" class="arrow">=</text>
    ${cap(75, 100, 'sites they know')}
    ${cap(205, 100, 'your site')}`),

  miller: svg(`
    <text x="140" y="36" text-anchor="middle" class="digits digits--raw">4155550142</text>
    <text x="140" y="74" text-anchor="middle" class="digits">415 555 0142</text>
    <path d="M86 82 h30 M126 82 h30 M166 82 h40" class="brace"/>
    ${cap(140, 102, 'chunked is easier to hold')}`),

  aesthetic: svg(`
    <g transform="rotate(-2 75 48)">
      <rect x="30" y="14" width="90" height="66" rx="4" class="frame frame--rough"/>
      <rect x="40" y="24" width="60" height="6" class="grey"/>
      <rect x="46" y="38" width="64" height="7" class="light"/>
      <rect x="36" y="52" width="50" height="7" class="light"/>
      <rect x="52" y="66" width="30" height="8" class="grey"/>
    </g>
    <rect x="160" y="14" width="90" height="66" rx="10" class="frame"/>
    <rect x="170" y="24" width="50" height="6" rx="3" class="ink"/>
    <rect x="170" y="38" width="70" height="8" rx="4" class="light"/>
    <rect x="170" y="52" width="70" height="8" rx="4" class="light"/>
    <rect x="170" y="66" width="30" height="8" rx="4" class="ink"/>
    <circle cx="236" cy="27" r="7" class="dot-on pulse"/>
    ${cap(75, 100, 'feels harder')}
    ${cap(205, 100, 'feels easier')}`),

  restorff: svg(`
    ${[0, 1, 2, 3, 4, 5, 6].map(i => i === 4
      ? `<circle cx="${40 + i * 33}" cy="48" r="16" class="ring pulse"/><circle cx="${40 + i * 33}" cy="48" r="10" class="dot-on"/>`
      : `<circle cx="${40 + i * 33}" cy="48" r="10" class="k"/>`).join('')}
    ${cap(140, 96, 'the one that differs is remembered')}`),

  serial: svg(`
    ${[62, 44, 30, 24, 28, 40, 60].map((h, i) => `<rect x="${44 + i * 30}" y="${80 - h}" width="16" height="${h}" rx="4" class="${i === 0 || i === 6 ? 'ink' : 'grey'} rise" style="--d:${i * 0.08}s"/>`).join('')}
    ${cap(52, 98, 'first')}${cap(228, 98, 'last')}${cap(140, 98, 'middle')}`),

  zeigarnik: svg(`
    ${[0, 1, 2, 3].map(i => `
      <rect x="70" y="${14 + i * 18}" width="12" height="12" rx="3" class="${i < 3 ? 'ink' : 'k k--open pulse'}"/>
      ${i < 3 ? `<path d="M73 ${20 + i * 18} l3 3 l5 -6" class="tick"/>` : ''}
      <rect x="92" y="${18 + i * 18}" width="${[90, 70, 110, 80][i]}" height="4" rx="2" class="${i < 3 ? 'light' : 'grey'}"/>`).join('')}
    ${cap(140, 102, 'the unfinished one stays with you')}`),

  peakend: svg(`
    <path d="M24 70 C50 66 60 72 80 62 S110 20 126 22 S150 70 176 66 S220 56 250 40" class="curve"/>
    <circle cx="126" cy="22" r="11" class="ring pulse"/>
    <circle cx="126" cy="22" r="5" class="dot-on"/>
    <circle cx="250" cy="40" r="11" class="ring pulse"/>
    <circle cx="250" cy="40" r="5" class="ink"/>
    <path d="M24 84 H256" class="axis"/>
    ${cap(126, 100, 'peak')}${cap(250, 100, 'end')}${cap(40, 100, 'time →', 'start')}`),

  goal: svg(`
    <rect x="30" y="40" width="220" height="14" rx="7" class="track"/>
    <rect x="30" y="40" width="220" height="14" rx="7" class="bar fill-accel"/>
    ${[1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${30 + i * 27.5 - 1}" y="40" width="2" height="14" class="notch"/>`).join('')}
    <circle cx="250" cy="47" r="10" class="dot-on"/>
    ${cap(30, 30, 'start', 'start')}${cap(250, 30, 'goal', 'end')}
    ${cap(140, 88, 'pace picks up near the end')}`),

  doherty: svg(`
    ${cap(30, 28, 'under 400ms', 'start')}
    ${track(120, 22, 130, 'fill-instant')}
    <circle cx="262" cy="24" r="5" class="dot-on"/>
    ${cap(30, 62, '2 seconds', 'start')}
    ${track(120, 56, 130, 'fill-lag')}
    <g class="spin" style="transform-origin:262px 58px"><path d="M262 52 a6 6 0 1 1 -6 6" class="spinner"/></g>
    ${cap(140, 96, 'fast replies keep people in flow')}`),

  tesler: svg(`
    <rect x="24" y="18" width="92" height="62" rx="10" class="frame"/>
    <rect x="164" y="18" width="92" height="62" rx="10" class="frame frame--ink"/>
    ${[0, 1, 2].map(i => `<rect x="${40 + i * 22}" y="42" width="16" height="16" rx="4" class="k k--move" style="--d:${i * 0.25}s"/>`).join('')}
    <text x="140" y="54" text-anchor="middle" class="arrow">→</text>
    ${cap(70, 100, 'user')}${cap(210, 100, 'system')}`),
};
