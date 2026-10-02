// Content for behavitor.com: edit here, then run `node build.mjs`.

export const site = {
  name: 'Behavitor',
  url: 'https://behavitor.com',
  email: 'hello@behavitor.com',
  privacyUpdated: 'October 1, 2026', // change when the privacy policy changes
  // Form sending. Paste each form's endpoint from formspree.io (or Basin / Getform) to switch it on,
  // e.g. 'https://formspree.io/f/abcdwxyz'. Left empty, a form opens the visitor's email app instead.
  forms: {
    contact: '',
    newsletter: '',
  },
  // Fill these in to switch each feature on. Empty = hidden.
  auditPrice: '',
  foundingOffer: 'Founding client rate for our first five audits', // shown with the audit; set to '' when the offer ends        // e.g. 'From $1,500'. Shown on the audit module, the Services page and in the FAQ
  bookingUrl: '',        // e.g. 'https://cal.com/behavitor/intro'. Adds "Book a 20-minute call" links
  analytics: {
    plausibleDomain: '', // e.g. 'behavitor.com'. Cookie-free visitor stats and conversion events (plausible.io)
  },
  social: {
    linkedin: '',        // full profile URLs; each appears in the footer once set
    instagram: '',
  },
  headline: 'Design from how people actually behave.',
  intro: 'We research how people search, scroll, click and decide. Then we use what we find to design, build and market websites.',
  description: 'Behavitor is a design and development studio. We research how people search, scroll, click and decide, then design, build and market websites.',
};

/* ------------------------------------------------------------
   Services
   ------------------------------------------------------------ */
export const services = [
  {
    id: 'ux-ui',
    name: 'UX & UI Design',
    line: 'Interfaces that are easy to understand and pleasant to use.',
    body: 'We study how people move through your site or product, find where they hesitate, and design screens that make the next step obvious.',
    goals: ['Make it easier to use', 'Increase sign-ups or sales', 'Redesign a product or app', 'Understand what users need'], // quick-pick goals on the contact form
    items: ['User research', 'Information architecture', 'Wireframes & prototypes', 'UI design', 'Design systems'],
    deliverables: ['Research findings and user journeys', 'Clickable prototype', 'UI designs and a design system'],
    timeline: '3–8 weeks',
    goodFor: 'Products and sites where people get stuck or drop off',
  },
  {
    id: 'web',
    name: 'Web Design & Development',
    line: 'Fast, accessible websites your team can update.',
    body: 'Custom websites built on modern stacks, with a CMS your team can use and analytics in place from launch day.',
    goals: ['Build a new website', 'Redesign our current site', 'Make it faster', 'Make it easier for our team to update'], // quick-pick goals on the contact form
    items: ['Next.js & React', 'Webflow & Framer', 'Headless CMS', 'E-commerce', 'Performance & accessibility'],
    deliverables: ['Designed and built website', 'CMS set up for your team', 'Analytics, SEO basics and training'],
    timeline: '6–12 weeks',
    goodFor: 'New sites, redesigns and replatforming',
  },
  {
    id: 'brand',
    name: 'Brand Identity',
    line: 'A clear, consistent look and voice.',
    body: 'Positioning, visual identity and guidelines that make your brand recognizable everywhere it appears.',
    goals: ['Create a new brand', 'Refresh our current look', 'Sharpen our messaging', 'Write brand guidelines'], // quick-pick goals on the contact form
    items: ['Positioning', 'Logo & visual system', 'Typography & color', 'Brand guidelines'],
    deliverables: ['Positioning and messaging', 'Logo and visual identity', 'Brand guidelines'],
    timeline: '4–8 weeks',
    goodFor: 'New businesses and brands that have outgrown their look',
  },
  {
    id: 'seo',
    name: 'SEO & AI Search',
    line: 'Be found in Google and in AI answers.',
    body: 'Technical SEO, content strategy and structured data, so search engines and AI assistants can find, understand and cite you.',
    goals: ['Get found on Google', 'Show up in AI answers', 'Fix a drop in traffic', 'Win more local searches'], // quick-pick goals on the contact form
    items: ['Technical SEO', 'Content strategy', 'AI search visibility', 'Local SEO'],
    deliverables: ['Technical fixes and site structure', 'Content plan built on real searches', 'Monthly visibility reporting'],
    timeline: 'Ongoing, from 3 months',
    goodFor: 'Sites that need more of the right visitors',
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    line: 'Campaigns built on what your audience responds to.',
    body: 'Paid social, search and email campaigns, planned around real audience behavior and measured properly.',
    goals: ['Get more leads or sales', 'Launch a campaign', 'Improve tracking and reporting', 'Grow email or social'], // quick-pick goals on the contact form
    items: ['Paid search & social', 'Content & social', 'Email automation', 'Analytics & reporting'],
    deliverables: ['Campaign plan and creative', 'Tracking and dashboards', 'Monthly results and next steps'],
    timeline: 'Ongoing, from 3 months',
    goodFor: 'Teams ready to grow with paid and owned channels',
  },
  {
    id: 'audit',
    name: 'Website Audits',
    line: 'A clear plan for what to fix first.',
    body: 'A review of UX, SEO, speed, accessibility and conversion, delivered as a prioritized action plan in about two weeks.',
    goals: ['Find what’s holding the site back', 'Prepare for a redesign', 'Improve conversions', 'Check accessibility'], // quick-pick goals on the contact form
    items: ['UX review', 'SEO audit', 'Performance', 'Accessibility (WCAG)', 'Conversion review'],
    deliverables: ['Findings across UX, SEO, speed and accessibility', 'A prioritized action plan', 'A walkthrough call with your team'],
    timeline: 'About 2 weeks',
    goodFor: 'Anyone unsure what to fix or where to start',
  },
];

/* ------------------------------------------------------------
   Work
   PLACEHOLDER projects: replace with your real case studies before launch.
   ------------------------------------------------------------ */
// Work: concept projects. Each takes a familiar TYPE of website and redesigns it around one
// behavior law. They are our own design concepts built from common patterns: not client work,
// not based on any single organization, with no real brands, logos or screenshots.
// Drawings live in src/concept-art.mjs under the same slug. Effects are predictions, never results.
export const work = [
  {
    slug: 'city-homepage',
    subject: 'A city government homepage',
    title: 'A city website people can use in seconds',
    sector: 'Local government',
    year: 2026,
    law: 'hick',
    tags: ['Information architecture'],
    summary: 'City homepages often give every service equal weight. We redesigned the pattern around the few tasks most visitors come to do.',
    problem: 'Most visits to a city website are for a handful of tasks: paying a utility bill, checking trash and recycling pickup, reporting a pothole, renewing a permit. Yet many city homepages set out 30 or more services side by side, all the same size, so every visitor has to scan them all to find their one.',
    issues: [
      'Every service has the same size and position, so nothing signals where to start',
      'Seasonal tasks, like holiday changes to trash pickup, compete with pages few people need',
      'Search is small and easy to miss, although many visitors arrive knowing exactly what they want',
    ],
    concept: 'A top-tasks homepage: a large search field, the five most-used tasks as big keys, and every other service one level down under "All services". The five tasks come from search and analytics data and are reviewed each season, so the homepage follows what residents actually need.',
    expect: [
      'Faster routes to the right page for the most common visits',
      'Fewer calls about tasks that can be done online',
      'A homepage that adapts to seasonal demand instead of growing longer',
    ],
  },
  {
    slug: 'nonprofit-donation',
    subject: 'A nonprofit donation form',
    title: 'A donation form that feels short',
    sector: 'Nonprofit',
    year: 2026,
    law: 'miller',
    tags: ['Forms'],
    summary: 'Long single-page donation forms ask for everything at once. We split the same questions into three short steps, starting with the gift.',
    problem: 'Donation forms often put the amount, frequency, personal details, address, employer matching and contact preferences on one long page: around 14 fields. Faced with the whole list at once, people hesitate at the exact moment they have decided to give.',
    issues: [
      'Fourteen fields in view is far more than people can hold in mind, so the form feels like hard work',
      'The gift itself, the reason people came, sits halfway down the page',
      'Optional questions look exactly like required ones',
    ],
    concept: 'Three short steps of three to four fields each. First the gift: suggested amounts and a monthly or one-time switch. Then contact details, with address autocomplete. Then employer matching and preferences. A step indicator shows how little is left, and each step is checked before moving on.',
    expect: [
      'More people who start a donation finish it',
      'Fewer errors, because problems are caught one step at a time',
      'Donors reach the confirmation feeling it was easy, not a chore',
    ],
  },
  {
    slug: 'college-programs',
    subject: 'A college program finder',
    title: 'Program search made for thumbs',
    sector: 'Education',
    year: 2026,
    law: 'fitts',
    tags: ['Mobile'],
    summary: 'Program finders are often built for a mouse. We redesigned the mobile filters around where thumbs actually reach.',
    problem: 'Most prospective students browse degree programs on their phones. Yet program finders often keep desktop controls: small filter chips, tiny checkboxes, and an "Apply" link tucked in the top corner, the hardest place to reach with one hand.',
    issues: [
      'Filter controls smaller than a fingertip lead to mis-taps and frustration',
      'The button that shows results sits at the top of the screen, far from the thumb',
      'Chosen filters are hard to see and hard to remove',
    ],
    concept: 'Full-width filter keys at least 44px tall, grouped by what students decide first: subject, degree level, start term. A sticky "Show 42 programs" button sits at the bottom of the screen, well within thumb reach, and chosen filters appear as removable tags above the results.',
    expect: [
      'Fewer mis-taps and abandoned searches on phones',
      'More program pages viewed per visit',
      'A search that works one-handed, on the bus',
    ],
  },
  {
    slug: 'job-application',
    subject: 'A job application form',
    title: 'An application people come back to finish',
    sector: 'Employment',
    year: 2026,
    law: 'zeigarnik',
    tags: ['Forms'],
    summary: 'Long job applications lose people who run out of time. We made progress visible and saved, so leaving is a pause, not the end.',
    problem: 'Job applications can take 30 minutes or more: work history, education, cover letters. With no sense of progress and no way to save, anyone who is interrupted has to start again, and many never do.',
    issues: [
      'Nothing shows how many sections remain, so the end never feels close',
      'Nothing is saved, so a closed tab or a timeout loses everything',
      'Leaving the form is treated as quitting rather than pausing',
    ],
    concept: 'Five clear steps with a progress indicator, automatic saving after every field, and a "Finish later" option that emails a link back to the exact step. Completed steps are marked as done, so an unfinished application stays on people’s minds.',
    expect: [
      'More started applications completed',
      'Fewer duplicate or restarted applications',
      'Candidates who feel respected, which reflects well on the employer',
    ],
  },
];

/* ------------------------------------------------------------
   Blog
   ------------------------------------------------------------ */
// Blog posts live in their own file, since they are long.
export { posts } from './posts.js';
export { aiPosts, aiPolicy } from './ai-posts.js';

/* ------------------------------------------------------------
   Hero dial: well-known principles of how people behave,
   adapted from established UX psychology (see lawsofux.com).
   ------------------------------------------------------------ */
export const laws = [
  { id: 'hick', name: "Hick’s law", short: 'More choices, slower decisions.', use: 'Check: does your main menu have seven items or fewer?', good: 'Five to seven items in the main menu, with everything else grouped one level down.' },
  { id: 'fitts', name: "Fitts’s law", short: 'Big, close targets are quicker to hit.', use: 'Check: can you reach your main button with a thumb?', good: 'Main buttons at least 44px tall, easy to reach with a thumb, and never crowded by other links.' },
  { id: 'jakob', name: "Jakob’s law", short: 'People expect your site to work like others they use.', use: 'Check: is your logo top left and your cart top right?', good: 'Logo, navigation, search and cart where people expect them, and links that look like links.' },
  { id: 'miller', name: "Miller’s law", short: 'Memory holds only a few items at once.', use: 'Check: are long forms split into short steps?', good: 'Long forms split into short steps of three to five fields, with related fields grouped.' },
  { id: 'aesthetic', name: 'Aesthetic-usability effect', short: 'Tidy designs feel easier to use.', use: 'Check: do all your pages share one grid and type style?', good: 'One type family, one spacing scale and the same button style on every page.' },
  { id: 'restorff', name: 'Von Restorff effect', short: 'The one that stands out gets remembered.', use: 'Check: is there one clear main action on each page?', good: 'One primary action per page that looks different from everything else around it.' },
  { id: 'serial', name: 'Serial position effect', short: 'First and last items are remembered best.', use: 'Check: is your key message first, and repeated last?', good: 'Your core message and main action at the top of the page, and repeated at the end.' },
  { id: 'zeigarnik', name: 'Zeigarnik effect', short: 'Unfinished tasks stay on the mind.', use: 'Check: can people see how many steps are left?', good: 'A step indicator on every multi-step flow, and progress saved if people leave.' },
  { id: 'peakend', name: 'Peak-end rule', short: 'Experiences are judged by the peak and the end.', use: 'Check: is your thank-you page worth remembering?', good: 'A confirmation that thanks people and says exactly what happens next, and when.' },
  { id: 'goal', name: 'Goal-gradient effect', short: 'People speed up as the goal gets close.', use: 'Check: does your checkout show progress?', good: 'A visible progress bar in checkout and sign-up that shows how close people are.' },
  { id: 'doherty', name: 'Doherty threshold', short: 'Responses under ~400ms keep people engaged.', use: 'Check: does every tap respond in under half a second?', good: 'Pages that load in under 2.5 seconds, and taps that respond visibly straight away.' },
  { id: 'tesler', name: "Tesler’s law", short: 'Some complexity can only be moved, not removed.', use: 'Check: do your forms fill in what you already know?', good: 'Details you already know are filled in, and addresses are looked up rather than typed.' },
];

// About page. It is built but kept out of the navigation, sitemap and search engines until
// `published` is true. Replace the placeholders with real people and your own story first.
export const about = {
  published: true,
  title: 'A research-led design studio.',
  lead: 'We design, build and market websites around how people actually behave, backed by 20 years of design experience.',
  story: [
    'We started Behavitor because we kept seeing the same thing: websites shaped by opinions, then puzzled about why visitors leave. The fix is rarely more features. It is watching what people actually do, and removing what gets in their way.',
    'Every project starts with evidence: analytics, search data and real people using the site. Every design decision should trace back to something we saw, and every change is measured after launch.',
    'We keep the studio small on purpose. The people who research your site are the same people who design and build it, so nothing gets lost between a report and a redesign.',
  ],
  team: [], // the studio speaks as “we”: this stays empty
  facts: [
    ['Experience', '20 years in design'],
    ['Approach', 'Research first, then design'],
    ['Replies within', 'Two business days'],
  ],
};

// What clients say. Shown on the home page, the sample audit and Services once there is at least one.
// Real clients only, quoted word for word, with their written permission to publish their name.
// { quote: 'The audit gave us…', name: 'First Last', role: 'Marketing lead', org: 'Organization' }
export const testimonials = [];
