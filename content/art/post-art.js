// Cover illustrations for blog posts, drawn in the same Braun language as the dial diagrams:
// white keys, black type, grey detail and a single orange mark. Styled in styles.css under .post-art.
// A post can use a real photo instead by setting `image` in data.mjs.

const svg = (body, fit) => `<svg class="post-art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid ${fit}" aria-hidden="true">${body}</svg>`;
const range = n => Array.from({ length: n }, (_, i) => i);
const rad = deg => (deg - 90) * Math.PI / 180;
const pt = (cx, cy, r, deg) => [+(cx + r * Math.cos(rad(deg))).toFixed(2), +(cy + r * Math.sin(rad(deg))).toFixed(2)];

const art = {
  // "Your homepage has five seconds": a timer face with the first five seconds marked
  timer: () => {
    const [cx, cy] = [200, 125];
    const ticks = range(60).map(i => {
      const major = i % 5 === 0;
      const [x1, y1] = pt(cx, cy, major ? 66 : 72, i * 6);
      const [x2, y2] = pt(cx, cy, 80, i * 6);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="pa-tick${major ? ' pa-tick--major' : ''}"/>`;
    }).join('');
    const [ax, ay] = pt(cx, cy, 90, 30);
    const [hx, hy] = pt(cx, cy, 62, 30);
    return `
      <circle cx="${cx}" cy="${cy}" r="98" class="pa-face"/>
      <path d="M${cx} ${cy - 90} A90 90 0 0 1 ${ax} ${ay}" class="pa-arc"/>
      ${ticks}
      <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" class="pa-hand"/>
      <circle cx="${cx}" cy="${cy}" r="7" class="pa-ink"/>
      <circle cx="${cx}" cy="${cy}" r="2.5" class="pa-lamp"/>`;
  },

  // "SEO when AI answers first": an AI answer card above fading search results
  answers: () => `
    <rect x="96" y="30" width="208" height="92" rx="14" class="pa-card"/>
    <circle cx="118" cy="52" r="5" class="pa-lamp"/>
    <rect x="130" y="48" width="56" height="8" rx="4" class="pa-ink"/>
    <rect x="114" y="72" width="172" height="7" rx="3.5" class="pa-grey"/>
    <rect x="114" y="87" width="150" height="7" rx="3.5" class="pa-grey"/>
    <rect x="114" y="102" width="96" height="7" rx="3.5" class="pa-grey"/>
    ${[140, 172, 204].map((y, i) => `
      <g class="pa-dim" style="opacity:${0.55 - i * 0.15}">
        <rect x="96" y="${y}" width="22" height="22" rx="6" class="pa-card"/>
        <rect x="128" y="${y + 3}" width="${[120, 104, 136][i]}" height="7" rx="3.5" class="pa-grey"/>
        <rect x="128" y="${y + 14}" width="${[164, 150, 128][i]}" height="5" rx="2.5" class="pa-light"/>
      </g>`).join('')}`,

  // "Small fixes for better forms": visible labels, a focused field and one clear button
  form: () => `
    <rect x="104" y="36" width="44" height="6" rx="3" class="pa-grey"/>
    <rect x="104" y="48" width="192" height="36" rx="10" class="pa-card"/>
    <rect x="118" y="62" width="70" height="8" rx="4" class="pa-ink"/>
    <circle cx="276" cy="66" r="9" class="pa-ink"/>
    <path d="M271.5 66.2l3 3 5.5-6" class="pa-tick-mark"/>
    <rect x="104" y="100" width="58" height="6" rx="3" class="pa-grey"/>
    <rect x="104" y="112" width="192" height="36" rx="10" class="pa-card pa-focus"/>
    <rect x="118" y="126" width="46" height="8" rx="4" class="pa-ink"/>
    <rect x="168" y="122" width="2" height="16" rx="1" class="pa-ink pa-caret"/>
    <rect x="104" y="172" width="96" height="36" rx="18" class="pa-ink"/>
    <rect x="126" y="187" width="52" height="6" rx="3" class="pa-white"/>`,

  // "Webflow, Framer or custom code?": three selector keys, one lamp lit
  platforms: () => `
    ${[['Webflow', 'W'], ['Framer', 'F'], ['Custom', '</>']].map(([name, glyph], i) => {
      const x = 88 + i * 84;
      const on = i === 2;
      return `
        <circle cx="${x + 32}" cy="62" r="5" class="${on ? 'pa-lamp' : 'pa-lamp-off'}"/>
        <rect x="${x}" y="80" width="64" height="64" rx="16" class="${on ? 'pa-key pa-key--on' : 'pa-key'}"/>
        <text x="${x + 32}" y="${glyph.length > 1 ? 118 : 120}" text-anchor="middle" class="pa-glyph${on ? ' pa-glyph--on' : ''}">${glyph.replace('<', '&lt;').replace('>', '&gt;')}</text>
        <text x="${x + 32}" y="172" text-anchor="middle" class="pa-cap">${name}</text>`;
    }).join('')}`,

  // "How to run a usability test with five people": five sessions, three hit the same problem
  people: () => `
    ${range(5).map(i => {
      const x = 84 + i * 58, hit = i < 3;
      return `
        <circle cx="${x}" cy="84" r="17" class="pa-face"/>
        <circle cx="${x}" cy="80" r="6" class="pa-grey"/>
        <path d="M${x - 9} 93a9 7 0 0 1 18 0" class="pa-grey-fill"/>
        <rect x="${x - 20}" y="118" width="40" height="${hit ? 40 : 22}" rx="8" class="pa-card"/>
        ${hit ? `<circle cx="${x}" cy="138" r="5" class="pa-lamp"/>` : `<rect x="${x - 10}" y="127" width="20" height="4" rx="2" class="pa-light"/>`}`;
    }).join('')}
    <path d="M64 176h176" class="pa-bracket"/>
    <text x="152" y="198" text-anchor="middle" class="pa-cap">3 of 5 hit the same problem</text>`,

  // "Your menu has too many items": a long menu becomes five clear items
  menu: () => `
    <rect x="58" y="36" width="116" height="178" rx="14" class="pa-card"/>
    ${range(11).map(i => `<rect x="74" y="${52 + i * 14.5}" width="${[64, 52, 76, 48, 70, 58, 80, 44, 66, 54, 72][i]}" height="5" rx="2.5" class="pa-grey"/>`).join('')}
    <path d="M190 125h22M205 118l7 7-7 7" class="pa-arrow"/>
    <rect x="228" y="62" width="116" height="126" rx="14" class="pa-card"/>
    ${range(5).map(i => `<rect x="244" y="${80 + i * 20}" width="${[60, 72, 52, 66, 46][i]}" height="7" rx="3.5" class="pa-ink"/>`).join('')}
    <circle cx="324" cy="83.5" r="4" class="pa-lamp"/>`,

  // "Design for thumbs": a phone with its easy-reach zone and the main button inside it
  thumb: () => `
    <rect x="148" y="14" width="104" height="222" rx="18" class="pa-card"/>
    <path d="M252 218V124A112 112 0 0 0 148 194.4V218Q148 236 166 236H234Q252 236 252 218Z" class="pa-zone"/>
    <rect x="186" y="22" width="28" height="4" rx="2" class="pa-light"/>
    <rect x="162" y="40" width="54" height="6" rx="3" class="pa-ink"/>
    ${range(3).map(i => `<rect x="162" y="${60 + i * 26}" width="76" height="18" rx="5" class="pa-light"/>`).join('')}
    <rect x="160" y="196" width="80" height="24" rx="12" class="pa-ink"/>
    <rect x="182" y="206" width="36" height="4" rx="2" class="pa-white"/>
    <path d="M262 206c26-10 44-34 48-64" class="pa-thumbline"/>
    <text x="316" y="134" class="pa-cap">easy reach</text>`,

  // "Speed is a design decision": a response gauge with the needle in the fast zone
  speed: () => {
    const [cx, cy] = [200, 150];
    const ticks = range(21).map(i => {
      const deg = -120 + i * 12;
      const [x1, y1] = pt(cx, cy, i % 5 ? 92 : 84, deg);
      const [x2, y2] = pt(cx, cy, 100, deg);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="pa-tick${i % 5 ? '' : ' pa-tick--major'}"/>`;
    }).join('');
    const [ax, ay] = pt(cx, cy, 108, -120);
    const [bx, by] = pt(cx, cy, 108, -72);
    const [nx, ny] = pt(cx, cy, 76, -96);
    return `
      <path d="M${ax} ${ay} A108 108 0 0 1 ${bx} ${by}" class="pa-arc"/>
      ${ticks}
      <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" class="pa-hand"/>
      <circle cx="${cx}" cy="${cy}" r="9" class="pa-ink"/>
      <circle cx="${cx}" cy="${cy}" r="3" class="pa-lamp"/>
      <text x="${pt(cx, cy, 124, -120)[0] - 6}" y="${pt(cx, cy, 124, -120)[1] + 4}" text-anchor="end" class="pa-cap">fast</text>
      <text x="${pt(cx, cy, 124, 120)[0] + 6}" y="${pt(cx, cy, 124, 120)[1] + 4}" class="pa-cap">slow</text>`;
  },

  /* ---- AI section covers: drawn for a dark background ---- */
  // "The empty prompt box problem": an empty input with a caret, and three suggestions below
  prompt: () => `
    <rect x="64" y="84" width="272" height="44" rx="22" class="pad-panel"/>
    <rect x="88" y="97" width="2.5" height="18" rx="1.25" class="pa-lamp pa-caret"/>
    <rect x="100" y="104" width="90" height="4" rx="2" class="pad-dim"/>
    <circle cx="312" cy="106" r="11" class="pad-key"/>
    <path d="M308 106h8M313 102l4 4-4 4" class="pad-stroke"/>
    ${[['96', 64], ['172', 80], ['264', 56]].map(([x, w], i) => `
      <rect x="${+x - 12}" y="146" width="${w}" height="24" rx="12" class="pad-chip"/>
      <rect x="${+x}" y="156" width="${w - 24}" height="4" rx="2" class="${i === 0 ? 'pad-line' : 'pad-dim'}"/>`).join('')}`,

  // "Why AI answers stream": lines of text arriving, the newest one still being written
  stream: () => `
    <rect x="70" y="40" width="260" height="170" rx="16" class="pad-panel"/>
    <circle cx="94" cy="64" r="8" class="pad-key"/><rect x="110" y="61" width="60" height="6" rx="3" class="pad-dim"/>
    ${[[220, 1], [196, 1], [210, 0.8], [150, 0.55]].map(([w, o], i) => `<rect x="90" y="${90 + i * 20}" width="${w}" height="7" rx="3.5" class="pad-line" style="opacity:${o}"/>`).join('')}
    <rect x="246" y="167" width="3" height="14" rx="1.5" class="pa-lamp pa-caret"/>
    <rect x="266" y="180" width="44" height="18" rx="9" class="pad-chip"/>
    <rect x="279" y="185" width="18" height="8" rx="2" class="pad-line"/>`,

  // "How we use AI in a design project": four stages, each with an AI lamp and a people lamp
  split: () => `
    ${['Research', 'Design', 'Build', 'Launch'].map((t, i) => {
      const x = 58 + i * 74;
      return `
        <rect x="${x}" y="70" width="60" height="86" rx="14" class="pad-panel"/>
        <circle cx="${x + 20}" cy="96" r="6" class="${i < 3 ? 'pa-lamp' : 'pad-off'}"/>
        <circle cx="${x + 40}" cy="96" r="6" class="pad-line"/>
        <rect x="${x + 14}" y="120" width="32" height="4" rx="2" class="pad-dim"/>
        <rect x="${x + 18}" y="132" width="24" height="4" rx="2" class="pad-dim"/>
        <text x="${x + 30}" y="180" text-anchor="middle" class="pad-cap">${t}</text>`;
    }).join('')}
    <circle cx="140" cy="214" r="5" class="pa-lamp"/><text x="152" y="218" class="pad-cap">AI helps</text>
    <circle cx="232" cy="214" r="5" class="pad-line"/><text x="244" y="218" class="pad-cap">People decide</text>`,

  /* ---- blog covers (light) ---- */
  // "Every click has a price": a path of five steps shortened to two
  steps: () => `
    ${range(5).map(i => `<rect x="${52 + i * 44}" y="70" width="32" height="32" rx="9" class="pa-card"/><rect x="${60 + i * 44}" y="84" width="16" height="4" rx="2" class="pa-grey"/>`).join('')}
    ${range(4).map(i => `<path d="M${86 + i * 44} 86h6" class="pa-arrow"/>`).join('')}
    <rect x="120" y="150" width="32" height="32" rx="9" class="pa-card"/><rect x="128" y="164" width="16" height="4" rx="2" class="pa-grey"/>
    <path d="M160 166h72" class="pa-arrow"/>
    <rect x="240" y="150" width="32" height="32" rx="9" class="pa-key pa-key--on"/><path d="M249 166l5 5 9-10" class="pa-tick-mark"/>`,

  // "Microcopy that stops support tickets": a field with a helpful line under it
  microcopy: () => `
    <rect x="96" y="58" width="208" height="134" rx="16" class="pa-card"/>
    <rect x="116" y="80" width="54" height="6" rx="3" class="pa-grey"/>
    <rect x="116" y="94" width="168" height="30" rx="8" class="pa-card pa-focus"/>
    <rect x="128" y="106" width="70" height="6" rx="3" class="pa-ink"/>
    <circle cx="121" cy="140" r="4" class="pa-lamp"/>
    <rect x="131" y="137" width="126" height="6" rx="3" class="pa-grey"/>
    <rect x="116" y="160" width="76" height="20" rx="10" class="pa-ink"/>
    <rect x="132" y="168" width="44" height="4" rx="2" class="pa-white"/>`,

  // "What makes a website feel trustworthy": a page with its trust signals lit
  trust: () => `
    <rect x="96" y="40" width="208" height="170" rx="16" class="pa-card"/>
    <rect x="114" y="58" width="44" height="8" rx="4" class="pa-ink"/>
    <rect x="114" y="80" width="140" height="10" rx="5" class="pa-ink"/>
    <rect x="114" y="98" width="110" height="6" rx="3" class="pa-grey"/>
    ${[0, 1, 2].map(i => `<circle cx="${122 + i * 58}" cy="${136}" r="7" class="${i === 0 ? 'pa-lamp' : 'pa-ink'}"/><rect x="${134 + i * 58}" y="133" width="30" height="5" rx="2.5" class="pa-grey"/>`).join('')}
    <rect x="114" y="160" width="172" height="34" rx="10" class="pa-light"/>
    <rect x="126" y="170" width="90" height="5" rx="2.5" class="pa-grey"/><rect x="126" y="180" width="60" height="5" rx="2.5" class="pa-grey"/>`,

  // "Twelve quick UX wins, ranked": bars ordered by value
  ranking: () => `
    ${[180, 156, 136, 118, 100, 84, 70].map((w, i) => `
      <text x="92" y="${58 + i * 22}" text-anchor="end" class="pa-cap">${i + 1}</text>
      <rect x="102" y="${49 + i * 22}" width="${w}" height="12" rx="6" class="${i === 0 ? 'pa-lamp' : i < 3 ? 'pa-ink' : 'pa-grey'}"/>`).join('')}`,

  /* ---- AI covers (dark) ---- */
  // "When AI should ask before it answers": a request, then a clarifying question with choices
  ask: () => `
    <rect x="182" y="46" width="150" height="34" rx="17" class="pad-line"/><rect x="200" y="60" width="100" height="6" rx="3" class="pad-key"/>
    <rect x="68" y="96" width="196" height="84" rx="16" class="pad-panel"/>
    <circle cx="90" cy="118" r="6" class="pa-lamp"/><rect x="104" y="115" width="110" height="6" rx="3" class="pad-line"/>
    ${[0, 1, 2].map(i => `<rect x="${84 + i * 58}" y="140" width="50" height="22" rx="11" class="pad-chip"/><rect x="${96 + i * 58}" y="149" width="26" height="4" rx="2" class="${i === 1 ? 'pad-line' : 'pad-dim'}"/>`).join('')}`,

  // "Checkpoints, not blind trust": an agent's plan with a pause for approval
  checkpoint: () => `
    ${[0, 1, 2, 3].map(i => {
      const y = 46 + i * 42;
      return `<rect x="96" y="${y}" width="208" height="30" rx="10" class="pad-panel"/>
        <circle cx="116" cy="${y + 15}" r="6" class="${i < 2 ? 'pad-line' : i === 2 ? 'pa-lamp' : 'pad-off'}"/>
        <rect x="132" y="${y + 12}" width="${[90, 110, 70, 100][i]}" height="6" rx="3" class="${i === 3 ? 'pad-dim' : 'pad-line'}"/>
        ${i === 2 ? `<rect x="244" y="${y + 6}" width="48" height="18" rx="9" class="pad-line"/><rect x="254" y="${y + 13}" width="28" height="4" rx="2" class="pad-key"/>` : ''}`;
    }).join('')}`,

  // "Sources on show": an answer with numbered source chips beneath
  sources: () => `
    <rect x="70" y="48" width="260" height="96" rx="16" class="pad-panel"/>
    ${[200, 216, 160].map((w, i) => `<rect x="90" y="${70 + i * 18}" width="${w}" height="6" rx="3" class="pad-line" style="opacity:${[1, .9, .7][i]}"/>`).join('')}
    <circle cx="256" cy="109" r="7" class="pa-lamp"/><text x="256" y="113" text-anchor="middle" class="pad-num">1</text>
    ${[0, 1, 2].map(i => `<rect x="${70 + i * 88}" y="160" width="80" height="34" rx="10" class="pad-panel"/><circle cx="${86 + i * 88}" cy="177" r="6" class="${i === 0 ? 'pa-lamp' : 'pad-key'}"/><rect x="${98 + i * 88}" y="174" width="40" height="5" rx="2.5" class="pad-dim"/>`).join('')}`,

  // "AI this week": a stack of dated news cards
  roundup: () => `
    ${[2, 1, 0].map(i => `<rect x="${92 + i * 12}" y="${54 + i * 14}" width="${216 - i * 24}" height="${140 - i * 14}" rx="16" class="pad-panel" style="opacity:${[1, .75, .5][i]}"/>`).join('')}
    <circle cx="116" cy="80" r="5" class="pa-lamp"/><rect x="128" y="77" width="54" height="6" rx="3" class="pad-dim"/>
    <rect x="112" y="100" width="170" height="9" rx="4.5" class="pad-line"/>
    <rect x="112" y="118" width="140" height="9" rx="4.5" class="pad-line"/>
    <rect x="112" y="144" width="176" height="5" rx="2.5" class="pad-dim"/><rect x="112" y="156" width="150" height="5" rx="2.5" class="pad-dim"/>`,

};

// fit: 'meet' shows the whole drawing (wide covers); 'slice' fills and crops the edges (square thumbnails)
export const postArt = (id, fit = 'meet') => (art[id] ? svg(art[id](), fit) : '');
export const coverNames = Object.keys(art);
