// A shortened sample of the audit report, for /sample-audit/.
// The practice, its numbers and its visitors are made up to show the format; keep the page's "sample" labels.
// area: UX | SEO | Speed | Accessibility | Conversion   impact / effort: High | Medium | Low
export const sampleAudit = {
  subject: 'A small architecture practice',
  goal: 'More inquiries for home additions and renovations',
  scope: [
    ['Pages reviewed', '14'],
    ['Visitor sessions watched', '5'],
    ['Checks run', 'UX, SEO, speed, accessibility, conversion'],
    ['Time', 'About two weeks'],
  ],
  verdict: 'Beautiful work, hidden behind a quiet, slow website. People who arrive ready to inquire can’t easily find how, and search engines can’t tell what the practice does or where.',
  scores: [
    ['UX', 5, 'Clear design, unclear purpose'],
    ['SEO', 3, 'Pages don’t say what or where'],
    ['Speed', 4, 'Photo galleries slow every visit'],
    ['Accessibility', 4, 'Low contrast, gallery needs a mouse'],
    ['Conversion', 3, 'No easy way to inquire'],
  ],
  findings: [
    {
      id: 'contact-route', area: 'Conversion', law: 'fitts', impact: 'High', effort: 'Small',
      title: 'The only way to inquire is an email link at the bottom of the About page',
      saw: 'Four of the five visitors we watched looked for a contact button on a project page, then gave up or went back to the homepage.',
      why: 'People decide to get in touch while looking at work they like. If the route isn’t right there, the moment passes.',
      fix: 'A short inquiry form at the end of every project page, and a “Start a project” button in the header.',
    },
    {
      id: 'purpose', area: 'UX', law: 'serial', impact: 'High', effort: 'Small',
      title: 'The homepage leads with awards, not with what the practice does',
      saw: 'Visitors took around 20 seconds to work out that the practice designs home additions. Two thought it only did large public buildings.',
      why: 'The first thing on a page sets expectations. Awards reassure, but only after people know they’re in the right place.',
      fix: 'Open with one line that says who you help and with what, then show three recent home additions. Move awards lower.',
    },
    {
      id: 'titles', area: 'SEO', law: 'jakob', impact: 'High', effort: 'Small',
      title: 'Every project page has the same page title',
      saw: 'All 9 project pages are titled “Projects”. Search results show nine identical links.',
      why: 'Titles are what search engines and people read first. Identical titles give neither a reason to choose one.',
      fix: 'Name the type of project and the place in each title, such as “Kitchen addition to a 1920s bungalow, Portland”.',
    },
    {
      id: 'contrast', area: 'Accessibility', law: 'aesthetic', impact: 'Medium', effort: 'Small',
      title: 'Gray captions are too faint to read comfortably',
      saw: 'Project captions have a contrast ratio of about 2.6:1 against the background.',
      why: 'WCAG asks for at least 4.5:1 for body text. Faint text is hard for many people, and outdoors on a phone for everyone.',
      fix: 'Darken the caption gray to meet 4.5:1. The design keeps its calm look.',
    },
    {
      id: 'gallery-speed', area: 'Speed', law: 'doherty', impact: 'High', effort: 'Medium',
      title: 'Project galleries load every full-size photo at once',
      saw: 'A typical project page loads 38 photos, most of them off screen. On a mid-range phone the main image appeared after about 5 seconds.',
      why: 'Google’s guidance is to show the main content within 2.5 seconds. Slow pages lose visitors before they see the work.',
      fix: 'Resized, compressed images in modern formats, and load gallery photos only as people scroll to them.',
    },
    {
      id: 'keyboard', area: 'Accessibility', law: 'fitts', impact: 'Medium', effort: 'Medium',
      title: 'The gallery can’t be used without a mouse, and photos have no descriptions',
      saw: 'The next and previous arrows can’t be reached with the Tab key, and none of the gallery photos has alt text.',
      why: 'Keyboard and screen reader users can’t see the work at all. Descriptions also help search engines understand the images.',
      fix: 'Make the arrows real buttons, and write a one-line description for each photo.',
    },
    {
      id: 'next-step', area: 'Conversion', law: 'peakend', impact: 'Medium', effort: 'Small',
      title: 'Project pages end without a next step',
      saw: 'The last thing on each project page is a photo. Visitors scrolled to the end, paused, and left.',
      why: 'The end of a page is a natural decision point. With nothing there, the decision is to leave.',
      fix: 'End each project with “Planning something similar?” and a link to the inquiry form, plus two related projects.',
    },
    {
      id: 'menu', area: 'UX', law: 'hick', impact: 'Medium', effort: 'Small',
      title: 'The menu has nine items, three of them for news and press',
      saw: 'Visitors hesitated over News, Press and Journal, and weren’t sure which held recent work.',
      why: 'Every extra option adds a little thinking time, and similar labels add doubt.',
      fix: 'Five items: Projects, Services, Approach, About, Contact. Fold news and press into About.',
    },
    {
      id: 'fees', area: 'Conversion', law: 'tesler', impact: 'Medium', effort: 'Medium',
      title: 'Fees are never mentioned',
      saw: 'All five visitors asked some version of “how much does this cost?” The site doesn’t say how fees work.',
      why: 'When cost is a mystery, many people assume it’s too high and don’t ask.',
      fix: 'A short “How fees work” page: stages, what affects cost, and a typical starting range.',
    },
    {
      id: 'local', area: 'SEO', law: 'jakob', impact: 'High', effort: 'Large',
      title: 'No page says which towns the practice works in',
      saw: 'The practice’s town appears only in the footer address. Searches like “residential architect” plus a nearby town don’t find it.',
      why: 'Most people look for an architect nearby. Search engines and AI answers need to see the places you cover, in plain words.',
      fix: 'A page for the area you serve, local project examples named by place, and a complete Google Business Profile.',
    },
  ],
  plan: [
    ['This week', 'Quick wins with a big effect', ['contact-route', 'purpose', 'titles', 'contrast']],
    ['This month', 'Changes that need a little design or build time', ['gallery-speed', 'keyboard', 'next-step', 'menu']],
    ['Next quarter', 'New content that keeps paying off', ['fees', 'local']],
  ],
};
