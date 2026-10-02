// Blog posts. Newest first is decided by `date`, so order here doesn't matter.
// Each post needs: slug, title, date, tag, cover (a drawing in post-art.mjs) or image, excerpt,
// three takeaways, and an HTML body. Reading time is calculated from the word count.
// Body HTML can use <h2>, <p>, <ul>/<ol>, <strong>, <blockquote>, and two extras:
//   <div class="compare"><div><p class="compare__label">Before</p>…</div><div><p class="compare__label">After</p>…</div></div>
//   <p class="note">A short tip or aside.</p>
// Examples are illustrative: no invented client stories or statistics.

const compare = (before, after, labels = ['Before', 'After']) => `
<div class="compare">
  <div><p class="compare__label">${labels[0]}</p>${before}</div>
  <div><p class="compare__label">${labels[1]}</p>${after}</div>
</div>`;

export const posts = [
  {
    slug: 'your-homepage-has-five-seconds',
    title: 'Your homepage has five seconds',
    date: '2026-09-02',
    tag: 'Design',
    cover: 'timer',
    excerpt: 'New visitors don’t read, they scan. Here is what they are looking for in those first moments, and how to give it to them.',
    takeaways: [
      'Visitors scan first and decide within seconds whether to stay.',
      'Answer three questions fast: where am I, is this for me, what next?',
      'Test it: show the page for five seconds and ask what they’d click.',
    ],
    body: `
<p>People rarely read a homepage on their first visit. They glance at it, decide whether they are in the right place, and either keep going or leave. That decision happens fast, long before anyone reaches your carefully written third section.</p>

<h2>What happens in those first seconds</h2>
<p>A new visitor’s eyes jump between the few things that stand out: the headline, the biggest image, the most obvious button. They are not reading. They are looking for a scent, a sign that what they came for is somewhere on this page. If the scent is strong, they follow it. If it is faint, the back button is always one tap away.</p>
<p>That is why the top of a homepage carries so much weight. It is not the only part that matters, but it decides whether anything else gets seen at all.</p>

<h2>Three quiet questions</h2>
<p>In those first seconds, visitors are silently asking three things:</p>
<ol>
<li><strong>Where am I?</strong> What does this company do?</li>
<li><strong>Is this for me?</strong> Do they serve people like me, with problems like mine?</li>
<li><strong>What do I do next?</strong> Where should I click to get what I want?</li>
</ol>
<p>A good homepage answers all three before anyone scrolls. Most struggling homepages answer one, and it is usually the first, and even then only vaguely.</p>

<h2>Where am I? Say what you do</h2>
<p>The most common problem is a headline written as a slogan. Slogans can be lovely, but they rarely tell a stranger what you actually do.</p>
${compare('<p><strong>“Building tomorrow, today.”</strong></p><p>Evocative, but it could describe an architect, a bank or a software company.</p>', '<p><strong>“Accounting software for small construction firms.”</strong></p><p>Plain, specific, and impossible to misread.</p>')}
<p>You can keep a little personality in the supporting line. The headline’s job is clarity.</p>

<h2>Is this for me? Show who you serve</h2>
<p>Once people know what you do, they want to know whether you do it for them. Name your audience, show a recognizable example, and put a signal of trust close to the headline, not buried near the footer.</p>
${compare('<p>“We help businesses grow.”</p>', '<p>“Bookkeeping for builders, electricians and plumbers with 1 to 20 staff.”</p>')}
<p>Being specific can feel like turning people away. In practice, the right visitors recognize themselves instantly, and that recognition is what keeps them on the page.</p>

<h2>What do I do next? One clear action</h2>
<p>When a homepage offers five buttons of equal weight, visitors have to stop and choose, and some choose to leave. Pick the one action that matters most for a new visitor and make it obvious. A second, quieter option is fine for people who are not ready.</p>
${compare('<p>Four buttons, all the same size: <em>Learn more</em>, <em>Get started</em>, <em>Contact us</em>, <em>Book a demo</em>.</p>', '<p>One primary button, <strong>Start a free trial</strong>, and a quiet text link: <em>See pricing</em>.</p>')}

<h2>Give the important things room</h2>
<p>Visual calm is not decoration; it is how you show priority. Rotating sliders, auto-playing video and rows of competing badges all ask for attention at once, so nothing gets it. Fewer elements with more space around them read as confident, and they are faster to scan.</p>
<p class="note">Try the squint test: look at your homepage with your eyes half closed. Whatever still stands out is what visitors notice first. If it is not your headline and your main action, something else is shouting too loudly.</p>

<h2>Run the five-second test</h2>
<p>You do not need special tools to find out whether your homepage works. You need five people who do not know your business, and five minutes with each.</p>
<ol>
<li>Show them the homepage for five seconds, then hide it.</li>
<li>Ask: “What does this company do?”</li>
<li>Ask: “Who do you think it is for?”</li>
<li>Ask: “What would you click first?”</li>
<li>Write down their exact words, not your interpretation of them.</li>
</ol>
<p>If most people cannot answer, the page is doing too much or saying too little. Their words are also useful: people often describe your business more clearly than your own headline does, and their phrasing can become your new one.</p>

<h2>Where to start</h2>
<p>Rewrite the headline so a stranger could explain your business after one read. Name who it is for. Choose one primary action and quieten everything else. Then run the five-second test again. It is one of the quickest, cheapest improvements a website can make.</p>`,
  },

  {
    slug: 'seo-when-ai-answers-first',
    title: 'SEO when AI answers first',
    date: '2026-08-18',
    tag: 'Search',
    cover: 'answers',
    excerpt: 'AI summaries now sit above many search results. Being useful to them, and to the people who still click, is the new baseline.',
    takeaways: [
      'AI summaries now sit above many search results.',
      'Pages that answer clearly, near the top, are the ones that get cited.',
      'Real expertise and solid technical basics still decide who shows up.',
    ],
    body: `
<p>More searches now end with an AI-written summary at the top of the page. People still click, but less often for simple questions, and usually when they are ready to go deeper or ready to act. That changes what a good page looks like, but less than you might fear.</p>

<h2>What has actually changed</h2>
<p>For quick factual questions, the summary often answers well enough that nobody clicks. For anything involving judgment, comparison or a decision, people still visit websites, and they arrive further along. They have already read the overview. They want depth, proof and a way to act.</p>
<p>So the job of a page has shifted in two directions at once: be clear enough for an AI system to understand and quote, and be substantial enough to be worth the click.</p>

<h2>Write to be quoted</h2>
<p>AI assistants pull from pages that answer a question clearly. The simplest change you can make is to put a direct answer near the top, then add depth below it, instead of warming up for three paragraphs first.</p>
${compare('<p>“In today’s fast-moving digital landscape, many business owners wonder about the various factors that might influence how much a website could cost…”</p>', '<p><strong>Short answer:</strong> a small business website usually costs between a few thousand and a few tens of thousands, depending on how many pages, features and integrations it needs. Here is what moves the price.</p>')}
<p>The second version can be quoted, and it respects the reader who clicked through.</p>

<h2>Make each page about one question</h2>
<p>Pages that try to rank for everything tend to be clear about nothing. A page built around one real question, phrased the way people ask it, is easier for search engines, AI systems and humans to understand.</p>
<ul>
<li>“How long does a website redesign take?”</li>
<li>“Do I need a new website or just better content?”</li>
<li>“What is included in a website audit?”</li>
</ul>
<p>Each of those deserves its own page, with the answer at the top and the details beneath.</p>

<h2>Show real expertise</h2>
<p>Search engines and AI systems increasingly favor signs that a real, knowledgeable person stands behind a page. The same signs make people trust you.</p>
<ul>
<li><strong>First-hand experience:</strong> what you have seen, tried and learned, not a summary of other articles.</li>
<li><strong>Original examples:</strong> your own before-and-after, your own process, your own numbers where you have them.</li>
<li><strong>Clear ownership:</strong> who wrote it, when it was updated, how to contact you.</li>
</ul>
<p>Rewritten summaries of other people’s articles are exactly what AI can now produce instantly. They are rarely cited, and they give visitors no reason to choose you.</p>

<h2>Keep the technical basics strong</h2>
<p>None of the fundamentals have gone away. They matter more, because machines are now reading your pages as well as ranking them.</p>
<ul>
<li>Clear headings in a logical order, so the structure of the page is obvious.</li>
<li>Lists and tables for things that are genuinely lists and tables.</li>
<li>Structured data where it fits, such as your organization’s details, products, events or frequently asked questions.</li>
<li>Consistent business details everywhere they appear: name, address, contact.</li>
<li>A fast site that works well on a phone.</li>
</ul>

<h2>Measure what matters now</h2>
<p>If fewer simple questions lead to clicks, raw traffic becomes a less useful measure. Watch the numbers that reflect real value instead: inquiries, sign-ups, sales, and whether people who do arrive stay and act. Growth in people searching for your name is also a good sign that you are being seen and remembered, even when they did not click the first time.</p>

<h2>A quick checklist</h2>
<ul>
<li>Does each important page answer one clear question?</li>
<li>Is the answer in the first two or three sentences?</li>
<li>Does the page show first-hand experience and a real author?</li>
<li>Are headings, lists and structured data in place?</li>
<li>Are you measuring outcomes, not just visits?</li>
</ul>
<p>The goal hasn’t changed: be the most helpful answer. The way you get noticed has.</p>`,
  },

  {
    slug: 'small-fixes-for-better-forms',
    title: 'Small fixes for better forms',
    date: '2026-07-30',
    tag: 'UX',
    cover: 'form',
    excerpt: 'Most form problems come from a handful of small, fixable details. Here are the ones that matter most, with examples.',
    takeaways: [
      'Only ask for what you’ll use in your first reply.',
      'Keep labels visible; don’t rely on placeholder text.',
      'Explain errors next to the field and keep what people typed.',
    ],
    body: `
<p>Forms are where interest turns into action, and where many visitors quietly give up. The good news is that most problems are small, and each fix takes minutes rather than a redesign.</p>

<h2>Ask for less</h2>
<p>Every field is a small cost for the person filling it in. Before keeping one, ask a simple question: will we actually use this in our first reply? If not, it can wait until the conversation has started.</p>
${compare('<ul><li>First name</li><li>Last name</li><li>Company</li><li>Job title</li><li>Company size</li><li>Phone</li><li>Email</li><li>Country</li><li>How did you hear about us?</li><li>Budget</li><li>Message</li></ul>', '<ul><li>Name</li><li>Email</li><li>What do you need? <em>(optional choices)</em></li><li>Message</li></ul>')}
<p>You can still learn the rest. You just learn it once someone has decided to talk to you, which is exactly when they are happy to tell you.</p>

<h2>Keep labels visible</h2>
<p>Placeholder text inside a field looks tidy, but it disappears the moment someone starts typing. Now they have to remember what the field was for, and anyone checking their answers before sending has nothing to check against. Placeholder text is also often too pale to read comfortably.</p>
<p>Put a short, visible label above every field. If a hint is useful, such as the format you expect, show it as a small line under the label rather than inside the box.</p>

<h2>Group and order fields sensibly</h2>
<p>People can only hold a few things in mind at once. Long forms feel shorter when related questions sit together and follow a natural order: who you are, then what you need, then the details.</p>
<ul>
<li>Use one column. Side-by-side fields are easy to miss and awkward on phones.</li>
<li>Group related fields under small headings when a form has more than five or six.</li>
<li>Split genuinely long forms into short steps, with a clear sense of how many remain.</li>
</ul>

<h2>Help, don’t scold</h2>
<p>Error messages are often written for the system, not the person. A good error says what went wrong and how to fix it, right next to the field concerned.</p>
${compare('<p>At the top of the form, in red: <strong>“Invalid input. Please correct the errors below.”</strong></p>', '<p>Under the email field: <strong>“That email looks incomplete. Check it reads like name@company.com.”</strong></p>')}
<ul>
<li>Show errors next to the field, in plain language.</li>
<li>Check fields when someone moves on or presses send, not while they are still typing.</li>
<li>Move the cursor to the first problem, so nobody has to hunt for it.</li>
<li>Never clear what people typed when something goes wrong.</li>
</ul>

<h2>Make it easy on a phone</h2>
<p>Many forms are filled in on phones, often with one thumb. A few technical details make a surprising difference:</p>
<ul>
<li>Use the right field types, so phones show the email keyboard for email and the number pad for phone numbers.</li>
<li>Turn on autofill hints, so browsers can fill in names, emails and addresses for people.</li>
<li>Make buttons and choices big enough to tap without zooming.</li>
</ul>

<h2>Say what happens next</h2>
<p>The moment after someone presses send is a small moment of uncertainty. Did it work? When will they hear back? A clear confirmation removes the doubt and sets expectations.</p>
${compare('<p>“Thank you for your submission.”</p>', '<p>“Thanks, Sam. We’ve got your message and will reply within two business days. If it’s urgent, email hello@example.com.”</p>')}

<h2>Test it in ten minutes</h2>
<ol>
<li>Fill in your own form on your phone, one-handed.</li>
<li>Submit it empty, then with a mistyped email. Read every message you get.</li>
<li>Ask someone else to do the same while you watch without helping.</li>
</ol>
<p>None of these fixes take long, and together they make a noticeable difference to how many people finish.</p>`,
  },

  {
    slug: 'webflow-framer-or-custom',
    title: 'Webflow, Framer or custom code?',
    date: '2026-07-08',
    tag: 'Development',
    cover: 'platforms',
    excerpt: 'The right platform depends less on features and more on who will run the site. A practical way to choose, with examples.',
    takeaways: [
      'Pick the platform for the team that runs the site, not the feature list.',
      'Webflow and Framer suit marketing teams; custom code suits complex needs.',
      'Decide who edits, what it connects to and how it will grow.',
    ],
    body: `
<p>We are often asked which platform is best. The honest answer is that it depends on your team, not just the tools. The best platform is the one the people running your website can use confidently every week, without waiting for a developer.</p>

<h2>Start with who runs the site</h2>
<p>A website is not finished at launch. Someone will add case studies, update prices, publish articles and fix typos for years. If that person finds the tool frustrating, the site slowly goes out of date, however good it looked on day one. So before comparing features, answer one question: who will update this site, and how often?</p>

<h2>Webflow</h2>
<p>A strong choice for marketing sites that change often. Designers can build precisely, and editors can update content visually, without touching the layout.</p>
<ul>
<li><strong>Good at:</strong> content-heavy marketing sites, blogs and case studies, and giving a marketing team independence.</li>
<li><strong>Watch out for:</strong> very complex logic, large numbers of items, or heavy integrations, which can push against its limits. Plans are priced by site and features, so check current pricing against your needs.</li>
</ul>

<h2>Framer</h2>
<p>Fast to build and excellent for smaller sites with lots of motion and polish. It works best when a design-led team wants to own the site end to end.</p>
<ul>
<li><strong>Good at:</strong> launch pages, portfolios, and startup sites where speed and visual quality matter most.</li>
<li><strong>Watch out for:</strong> large content structures and complex editing workflows, which are not its main strength.</li>
</ul>

<h2>Custom code</h2>
<p>A custom build, for example Next.js with a headless content management system, suits sites with complex content, integrations or strict performance needs. It gives the most control, and asks for the most ongoing care.</p>
<ul>
<li><strong>Good at:</strong> logins and members’ areas, connections to other systems, large or multilingual sites, and unusual requirements.</li>
<li><strong>Watch out for:</strong> the need for developer time for changes beyond content, and the responsibility for updates and security.</li>
</ul>

<h2>What about WordPress?</h2>
<p>WordPress still runs a large share of the web, and for good reason: it is flexible and familiar. It can be a sensible choice, especially if your team already knows it. The trade-off is maintenance. Plugins, updates and security need regular attention, so budget for that from the start.</p>

<h2>Three example situations</h2>
${compare('<p><strong>A five-person consultancy</strong> that publishes a case study each month and wants to change pages without asking anyone.</p>', '<p><strong>Webflow.</strong> Visual editing, solid content collections, and a marketing team that stays independent.</p>', ['Situation', 'Likely fit'])}
${compare('<p><strong>A design-led startup</strong> launching in six weeks with a small, animated site that will change shape often.</p>', '<p><strong>Framer.</strong> Fast to build, strong on motion, easy for designers to own.</p>', ['Situation', 'Likely fit'])}
${compare('<p><strong>A membership organization</strong> with member logins, event bookings and a link to its customer database.</p>', '<p><strong>Custom code.</strong> The integrations and logins need proper development, with a content system for everyday editing.</p>', ['Situation', 'Likely fit'])}

<h2>Questions to answer before choosing</h2>
<ol>
<li>Who will update the site every week, and how comfortable are they with technology?</li>
<li>What does it need to connect to: payments, bookings, a CRM, a member database?</li>
<li>How much will it grow in the next two years, in pages, languages and features?</li>
<li>Who will look after updates, security and backups?</li>
<li>What is the total cost over three years, including plans, seats and developer time, not just the build?</li>
</ol>
<p>Answer those first, and the platform choice usually becomes obvious.</p>`,
  },
  {
    slug: 'usability-test-with-five-people',
    title: 'How to run a usability test with five people',
    date: '2026-09-29',
    tag: 'Research',
    cover: 'people',
    excerpt: 'You don’t need a lab or a big budget to learn why people struggle with your website. Five people and an afternoon will do.',
    takeaways: [
      'A handful of people reveals most of the biggest problems on a website.',
      'Give people a goal, not instructions, then watch without helping.',
      'Fix what several people struggled with first, then test again.',
    ],
    body: `
<p>Many teams never test their website with real people because it sounds expensive and complicated. It doesn’t have to be. With five people, a video call and an afternoon, you can see exactly where visitors get stuck, and that is worth more than weeks of debate in a meeting room.</p>

<h2>Why five people is enough to start</h2>
<p>A well-known rule of thumb from usability research is that a small group finds most of the serious problems. The first person shows you a lot. The second confirms some of it and adds a little more. By the fourth and fifth, you mostly see the same problems again.</p>
<p>That repetition is the point. When three out of five people stumble in the same place, you do not need a statistic to know it matters. Testing with five, fixing, and testing again with five more teaches you far more than one large test.</p>

<h2>Decide what you want to learn</h2>
<p>Start with the two or three things your website most needs people to do. Imagine a local bakery that takes cake orders online. Its most important tasks might be:</p>
<ul>
<li>Order a birthday cake for this Saturday.</li>
<li>Find out whether they sell gluten-free bread.</li>
<li>Check what time the shop closes today.</li>
</ul>
<p>Keep it to three or four tasks. A session that runs too long tires people out, and tired people stop behaving naturally.</p>

<h2>Write goals, not instructions</h2>
<p>The most common mistake is telling people how to do the task. The moment you name the button, you have tested whether they can follow directions, not whether your website makes sense.</p>
${compare('<p>“Click <em>Order</em> in the menu, choose a cake, and pick Saturday in the calendar.”</p>', '<p>“It’s your friend’s birthday on Saturday and you’d like a cake from this bakery. Show me how you’d sort that out.”</p>')}
<p>Give people a realistic reason and a goal, then let them find their own way. Their route is the finding.</p>

<h2>Find five people</h2>
<p>Look for people who resemble your real visitors. They do not need to be experts; they need to be the kind of person who would actually use your site.</p>
<ul>
<li>Existing customers are ideal, and often happy to help.</li>
<li>Friends of friends work well, as long as they don’t know your business.</li>
<li>Avoid colleagues. They know too much to struggle in the right places.</li>
</ul>
<p>A small thank-you, such as a voucher or a free product, is polite and makes people more willing. Sessions work perfectly well on a video call with screen sharing.</p>

<h2>Run the session</h2>
<p>Each session takes about twenty to thirty minutes. Keep the same structure every time so you can compare what you see.</p>
<ol>
<li><strong>Put them at ease.</strong> Explain that you are testing the website, not them, and that nothing they do can be wrong.</li>
<li><strong>Ask them to think aloud.</strong> “Tell me what you’re looking at and what you expect to happen.”</li>
<li><strong>Give one task at a time.</strong> Read it out, then stay quiet.</li>
<li><strong>Don’t help.</strong> If they ask where something is, turn it back gently: “Where would you expect it to be?”</li>
<li><strong>Finish with two questions.</strong> “What was the hardest part?” and “What would you change?”</li>
</ol>
<p class="note">Staying quiet while someone struggles is the hardest part of the job. Resist the urge to rescue them. The struggle is exactly what you came to see.</p>

<h2>Spot the patterns</h2>
<p>Straight after each session, write down what you saw while it is fresh: where people hesitated, what they clicked first, what they said. Then, once all five are done, put the notes side by side.</p>
<ul>
<li><strong>Seen by three or more people:</strong> fix these first.</li>
<li><strong>Seen by one or two:</strong> note them, and watch for them next time.</li>
<li><strong>Stopped someone completely:</strong> fix these immediately, however many people hit them.</li>
</ul>
<p>Use people’s own words when you share the findings. “I thought ‘Order’ meant order history” is more persuasive than any summary you could write.</p>

<h2>Fix, then test again</h2>
<p>Make the changes, then run five new sessions. Sometimes a fix works perfectly. Sometimes it reveals the next problem that was hiding behind the first. Either way, you will know, instead of guessing.</p>

<h2>A quick checklist</h2>
<ul>
<li>Three or four tasks, written as goals rather than instructions.</li>
<li>Five people who resemble your real visitors.</li>
<li>Twenty to thirty minutes each, thinking aloud, with no help.</li>
<li>Notes straight after each session, patterns after all five.</li>
<li>Fix what several people hit, then test again.</li>
</ul>`,
  },

  {
    slug: 'your-menu-has-too-many-items',
    title: 'Your menu has too many items',
    date: '2026-09-22',
    tag: 'UX',
    cover: 'menu',
    excerpt: 'Every extra menu item makes the others harder to find. Why menus grow, and a simple way to cut yours back to what matters.',
    takeaways: [
      'More choices mean slower decisions, and more people giving up.',
      'Name menu items in your visitors’ words, not your organization’s.',
      'Aim for five to seven top-level items; everything else goes one level down.',
    ],
    body: `
<p>Menus rarely start too long. They grow one reasonable request at a time: a new service, a new team, a page someone wants to promote. A few years later the navigation has eleven items and nobody can remember why half of them are there.</p>

<h2>Why more choice slows people down</h2>
<p>Hick’s law describes something we all feel: the more options there are, the longer it takes to choose one. Every item in a menu has to be read, understood and compared with the others. Add a few more, and the time it takes to decide grows. Some people simply pick the wrong one. Others give up and leave.</p>
<p>A short menu does the opposite. It tells visitors, at a glance, what your website is about and where to go next.</p>

<h2>How menus grow</h2>
<p>Most long menus mirror the organization rather than the visitor. Each department wants to be visible, so each gets a top-level item. The result makes sense internally and very little sense to a stranger, who doesn’t know or care how your teams are arranged.</p>

<h2>Name things the way visitors do</h2>
<p>Before cutting anything, look at the words. Menus full of internal language force visitors to translate before they can choose.</p>
${compare('<p><em>Solutions · Verticals · Ecosystem · Resources · Insights · Company</em></p>', '<p><em>Services · Industries · Guides · Pricing · About · Contact</em></p>')}
<p>A good test: could a new visitor guess what is behind each word, without clicking? If not, the word needs to change.</p>

<h2>Count, then cut</h2>
<p>Write down every top-level item, and next to each one note how often visitors actually use it. Your analytics and site search will tell you; if you don’t have data yet, ask the people who answer customer calls what people ask for most.</p>
${compare('<ul><li>Home</li><li>About us</li><li>Our story</li><li>Services</li><li>Solutions</li><li>Industries</li><li>Resources</li><li>News</li><li>Careers</li><li>Partners</li><li>Contact</li></ul>', '<ul><li>Services</li><li>Industries</li><li>Pricing</li><li>Guides</li><li>About</li></ul><p>Plus a clear <strong>Contact</strong> button.</p>')}
<p>Aim for five to seven top-level items. “About us” and “Our story” become one page. “Services” and “Solutions” were the same thing with two names. “Careers” and “Partners” still exist; they simply move.</p>

<h2>Where the rest goes</h2>
<p>Cutting the menu does not mean deleting pages. It means giving each one the right home.</p>
<ul>
<li><strong>One level down:</strong> detailed services, individual industries and specific guides sit under their parent item.</li>
<li><strong>The footer:</strong> careers, partners, press and legal pages are found there by the people who look for them.</li>
<li><strong>Search:</strong> on larger sites, a visible search box catches anyone the menu doesn’t.</li>
</ul>
<p class="note">The logo already links to the home page on almost every website, which is why many sites no longer need a “Home” item at all.</p>

<h2>Check it with real people</h2>
<p>You can test a new menu before building it. Write the proposed items on a card, then ask five people: “Where would you click to find out how much this costs?” or “Where would you look for a job here?” If most people pick the same item quickly, it works. If they hesitate or split between two, the names need another look.</p>

<h2>A quick checklist</h2>
<ul>
<li>Five to seven top-level items, named in your visitors’ words.</li>
<li>No two items that could mean the same thing.</li>
<li>Everything else one level down, in the footer, or findable by search.</li>
<li>Tested with five people before it goes live.</li>
</ul>`,
  },

  {
    slug: 'design-for-thumbs',
    title: 'Design for thumbs',
    date: '2026-09-15',
    tag: 'Design',
    cover: 'thumb',
    excerpt: 'Most visits happen on phones, often one-handed. Where you put buttons, and how big they are, decides how easy your site feels.',
    takeaways: [
      'Big, close targets are faster to hit, so make key buttons large and easy to reach.',
      'On phones, the bottom of the screen is easiest to reach with one thumb.',
      'Keep risky actions away from the ones people tap most.',
    ],
    body: `
<p>Watch people use their phones on a bus or in line and you will notice that most of them use one hand. The thumb does all the work, and a thumb can only reach so far. Designing with that in mind is one of the simplest ways to make a website feel easier.</p>

<h2>Fitts’s law in one sentence</h2>
<p>The bigger a target is, and the closer it is, the faster and more accurately people can hit it. On a desktop that applies to the mouse pointer. On a phone it applies to the thumb, which is far less precise than a pointer and cannot reach every part of the screen comfortably.</p>

<h2>The thumb zone</h2>
<p>Hold your phone in one hand and move your thumb around the screen. The middle and lower part of the screen is easy. The top corners are a stretch, especially the corner opposite your thumb. Many sites still put their most important controls in exactly those hard-to-reach places, because that is where they sit on a desktop layout.</p>
<ul>
<li><strong>Easy:</strong> the lower middle of the screen.</li>
<li><strong>A stretch:</strong> the top of the screen and the far edge.</li>
<li><strong>Hard:</strong> the top corner opposite your thumb.</li>
</ul>

<h2>Make targets big enough</h2>
<p>Small links and tiny icons are easy to miss and easy to hit by accident. A good rule is to make anything tappable at least 44 to 48 pixels tall, with enough space around it that a thumb doesn’t catch its neighbor.</p>
${compare('<p>A small text link, “<em>book now</em>”, at the end of a paragraph, easy to miss and hard to tap.</p>', '<p>A full-width button, <strong>Book an appointment</strong>, 48 pixels tall, with space above and below.</p>')}

<h2>Put key actions within reach</h2>
<p>The action people take most, such as “Add to basket”, “Show results” or “Book”, should sit where the thumb already is. On long pages and in search filters, a button fixed to the bottom of the screen keeps the main action within reach as people scroll.</p>
${compare('<p>The <em>Apply filters</em> link sits in the top-right corner of the filter panel.</p>', '<p>A wide <strong>Show 24 results</strong> button stays fixed at the bottom of the screen while people choose filters.</p>')}
<p class="note">Fixed bars should be slim and few. One bottom bar helps; a fixed header, a fixed banner and a chat bubble together leave little room for the page itself.</p>

<h2>Keep risky actions apart</h2>
<p>Fitts’s law works both ways. If a destructive action sits right next to a common one, people will hit it by mistake. Put distance between “Delete” and “Save”, or between “Cancel order” and “Continue”, and make the risky option look different, so it is never tapped by accident.</p>

<h2>Check it on your own phone</h2>
<ol>
<li>Open your website on your phone and hold it in one hand.</li>
<li>Try your three most important tasks using only your thumb.</li>
<li>Notice every time you stretch, shift your grip or tap the wrong thing.</li>
<li>Try it with the other hand too; around one in ten people are left-handed.</li>
</ol>
<p>Each stretch and mis-tap is a small moment of friction. Remove a few of them, and your site will feel noticeably easier, even though nothing about its look has changed.</p>`,
  },

  {
    slug: 'speed-is-a-design-decision',
    title: 'Speed is a design decision',
    date: '2026-08-26',
    tag: 'Development',
    cover: 'speed',
    excerpt: 'Slow websites are rarely caused by slow servers alone. They are designed that way, one heavy decision at a time. Here is how to design for speed.',
    takeaways: [
      'Fast responses keep people focused; delays break their flow.',
      'Most slowness comes from design choices: heavy media, fonts and third-party scripts.',
      'Set a performance budget before designing, and measure against it.',
    ],
    body: `
<p>When a website is slow, the first instinct is to blame the hosting. Sometimes that is fair. More often, the site was designed to be slow: a large video here, a few extra fonts there, a chat widget, three tracking scripts and an image carousel nobody uses. Each decision seemed small. Together they make every visit feel sluggish.</p>

<h2>Why speed matters to people</h2>
<p>The Doherty threshold describes how people stay engaged when a system responds quickly, roughly within 400 milliseconds, and how their attention starts to drift when they have to wait. Every pause is a small invitation to switch tabs, check a message or give up. A fast site keeps people in the flow of what they came to do.</p>

<h2>What Google measures</h2>
<p>Google’s Core Web Vitals are a useful, public way to judge how fast a page feels. Its guidance for a good experience is:</p>
<ul>
<li><strong>Largest Contentful Paint</strong> within 2.5 seconds: the main content appears quickly.</li>
<li><strong>Interaction to Next Paint</strong> within 200 milliseconds: the page responds promptly when people tap or click.</li>
<li><strong>Cumulative Layout Shift</strong> below 0.1: things don’t jump around while the page loads.</li>
</ul>
<p>You can check any page for free with Google’s PageSpeed Insights.</p>

<h2>Design choices that slow sites down</h2>
<ul>
<li><strong>Large hero videos and images</strong> that load before anything else can appear.</li>
<li><strong>Many fonts and weights,</strong> each one a separate download.</li>
<li><strong>Third-party scripts</strong> such as chat widgets, pop-ups and trackers, which often do more work than the page itself.</li>
<li><strong>Carousels and heavy animations</strong> that load content people rarely see.</li>
<li><strong>Images that aren’t resized</strong> for phones, so a small screen downloads a huge picture.</li>
</ul>

<h2>Set a budget before you design</h2>
<p>A performance budget is a simple limit the whole team agrees to before design starts. It turns speed from an afterthought into a design constraint, like brand colors or page width.</p>
${compare('<p>No limits. Speed is checked after launch, when changing anything means rework.</p>', '<ul><li>Homepage under 1 MB on a phone</li><li>Two font weights at most</li><li>No more than three third-party scripts</li><li>Main content visible within 2.5 seconds</li></ul>', ['Without a budget', 'An example budget'])}
<p>When someone wants to add a new widget, the budget turns “can we?” into a clearer question: “what do we remove to make room?”</p>

<h2>Make waiting feel shorter</h2>
<p>Some waits can’t be avoided, but how they feel can be improved.</p>
<ul>
<li><strong>Respond instantly</strong> to every tap, even if the result takes a moment: press states, a changed label, a small spinner.</li>
<li><strong>Show structure first,</strong> with gray placeholders where content is about to appear, so the page feels as if it is already arriving.</li>
<li><strong>Show progress</strong> for anything longer than a couple of seconds, such as uploads or payments.</li>
</ul>

<h2>A quick checklist</h2>
<ul>
<li>Run your key pages through PageSpeed Insights, on mobile.</li>
<li>List every third-party script, and remove any you can’t justify.</li>
<li>Resize and compress images, and use modern formats.</li>
<li>Limit fonts to the weights you really use.</li>
<li>Agree a performance budget for the next redesign.</li>
</ul>
<p>Speed rarely comes from one big fix. It comes from many small decisions made with speed in mind, which is exactly what design is.</p>`,
  },
  {
    slug: 'every-click-has-a-price',
    title: 'Every click has a price',
    date: '2026-09-26',
    tag: 'UX',
    cover: 'steps',
    excerpt: 'The number of clicks matters less than what each one costs: thinking, waiting, doubting. How to spot expensive steps, and when an extra step is worth it.',
    takeaways: [
      'Counting clicks misses the point; what each step costs people matters more.',
      'The expensive steps are the ones that make people think, wait or doubt.',
      'An extra step is worth it when it makes the next choice obvious.',
    ],
    body: `
<p>“Nothing should be more than three clicks away” is one of the most repeated rules in web design. It sounds sensible, and it is mostly wrong. People happily click ten times when each click is easy and clearly moves them forward. They give up after two when those two clicks are confusing.</p>

<h2>What a step really costs</h2>
<p>Every step in a journey costs something, and the click itself is the cheapest part. The real costs are:</p>
<ul>
<li><strong>Thinking:</strong> reading options, comparing them and deciding.</li>
<li><strong>Waiting:</strong> for a page to load, a menu to open or a form to respond.</li>
<li><strong>Doubting:</strong> wondering whether this is the right path, and whether going back will lose your progress.</li>
<li><strong>Remembering:</strong> keeping information in your head from one screen to the next.</li>
</ul>
<p>A single step that demands a lot of thinking and doubt is far more expensive than three steps that are fast and obvious.</p>

<h2>Spot the expensive steps</h2>
<p>Walk through your most important journey and, at every screen, ask four questions. Is it obvious what to do? Is it fast? Am I sure I’m on the right path? Do I have to remember anything from before? Each “no” marks an expensive step.</p>
${compare('<p>One “Choose your plan” page with twelve options, each with eight features to compare.</p>', '<p>Two quick questions, “How many people?” and “Do you need X?”, then one recommended plan with the alternatives a click away.</p>', ['One expensive step', 'Two cheap steps'])}
<p>The second version has more clicks and far less effort. Most people will finish it faster, and feel more confident about their choice.</p>

<h2>When to remove a step</h2>
<ul>
<li>It asks for information you could work out yourself, such as the city from a ZIP code.</li>
<li>It confirms something people just did, with no risk involved.</li>
<li>It exists because of how your systems work, not because it helps the person.</li>
</ul>

<h2>When to add one</h2>
<p>Sometimes the best fix is an extra step. Splitting a crowded page into two focused ones, or asking one simple question before showing results, can make the whole journey feel lighter.</p>
<ul>
<li>When a page asks people to make several unrelated decisions at once.</li>
<li>When a short question would filter out options people don’t care about.</li>
<li>When the action can’t be undone, and a quick review prevents costly mistakes.</li>
</ul>

<h2>Make every step feel like progress</h2>
<p>Whatever the number of steps, people should always know where they are and that they are getting closer. Clear page titles, a visible sense of progress, and buttons that say what happens next (“Continue to delivery” rather than “Next”) all lower the cost of each click.</p>
<p class="note">Try it: time yourself completing your main task, then time someone who has never seen your site. The gap between the two is where the expensive steps are.</p>`,
  },

  {
    slug: 'microcopy-that-stops-support-tickets',
    title: 'Microcopy that stops support tickets',
    date: '2026-09-19',
    tag: 'Design',
    cover: 'microcopy',
    excerpt: 'The small words on buttons, labels and messages quietly decide how many people get stuck. Rewrite them, and many support questions never get asked.',
    takeaways: [
      'Most support questions start with small words people misread.',
      'Say what will happen, in the words people use, at the moment they need it.',
      'Your support inbox is the best source of microcopy to fix first.',
    ],
    body: `
<p>Microcopy is the small text around an interface: button labels, form hints, error messages, empty states. It is easy to write last and fix never. Yet many of the questions that reach a support inbox start with a few words someone didn’t understand.</p>

<h2>Start with your support inbox</h2>
<p>The fastest way to find microcopy worth fixing is to read what people ask. Group recent questions by the screen they relate to. Each group usually points to a label, hint or message that isn’t doing its job.</p>
<ul>
<li>“Did my payment go through?” points to an unclear confirmation.</li>
<li>“Where is my discount?” points to a missing hint about when it applies.</li>
<li>“Why can’t I log in?” often points to an error message that hides the real reason.</li>
</ul>

<h2>Say what will happen</h2>
<p>Buttons are promises. Vague labels make people hesitate, because they can’t predict the result.</p>
${compare('<p><strong>Submit</strong></p><p><strong>Continue</strong></p><p><strong>OK</strong></p>', '<p><strong>Send inquiry</strong></p><p><strong>Continue to payment</strong></p><p><strong>Delete 3 photos</strong></p>')}
<p>A good test: could someone predict exactly what happens next, from the button alone?</p>

<h2>Answer the question before it’s asked</h2>
<p>Place a short hint where the doubt appears, not in a help center people never visit.</p>
${compare('<p>A field labeled <em>Reference number</em>, with nothing else.</p>', '<p><em>Reference number</em> with a hint underneath: “The 8-digit number at the top of your invoice, starting with INV.”</p>')}

<h2>Write errors that help</h2>
<p>An error message should say what went wrong and how to fix it, in plain words, without blame.</p>
${compare('<p>“Error 403: authentication failed.”</p>', '<p>“That password doesn’t match this email. Check for typos, or reset your password.”</p>')}

<h2>Use your customers’ words</h2>
<p>Internal names leak into interfaces: product codes, team names, technical terms. People search and scan for the words they already use. The support inbox, search logs and sales calls all tell you what those words are.</p>

<h2>Measure the change</h2>
<p>Pick one screen, rewrite its microcopy, and watch the related support questions for a month. It is one of the few design changes where the result shows up in your inbox, not just in your analytics.</p>`,
  },

  {
    slug: 'what-makes-a-website-feel-trustworthy',
    title: 'What makes a website feel trustworthy',
    date: '2026-09-12',
    tag: 'Research',
    cover: 'trust',
    excerpt: 'People judge whether to trust a website quickly, and mostly on small signals. What those signals are, and how to test whether yours are working.',
    takeaways: [
      'Trust is judged quickly, mostly from clarity, care and evidence of real people.',
      'Specific proof beats general claims; visible contact details beat hidden ones.',
      'Test it by asking people what would make them hesitate to buy or inquire.',
    ],
    body: `
<p>Before anyone reads your pitch, they have already decided how far to trust you. That judgment is quick and mostly unconscious, built from small signals rather than big claims. The good news is that most of those signals are within your control.</p>

<h2>Signals of care</h2>
<p>People read care as competence. A tidy, consistent, working website suggests an organization that pays attention. Broken links, outdated dates, spelling mistakes and cluttered pages suggest the opposite, fairly or not.</p>
<ul>
<li>Current information: recent dates, today’s prices, this year in the footer.</li>
<li>Consistency: the same design, tone and names across every page.</li>
<li>Nothing broken: forms that work, images that load, links that go somewhere.</li>
</ul>

<h2>Signals of real people</h2>
<p>People trust people. Websites that hide who is behind them feel riskier than ones that show it.</p>
<ul>
<li>A clear way to get in touch, with a real email address and a promised response time.</li>
<li>An About page that explains who you are and why you do this work.</li>
<li>Where it fits, a physical address or the names of people customers will deal with.</li>
</ul>

<h2>Specific proof, not general claims</h2>
<p>Every website says it is trusted, experienced and customer-focused. Those words have stopped meaning anything. Specifics are what persuade.</p>
${compare('<p>“We’re trusted by businesses everywhere and deliver outstanding results.”</p>', '<p>A named client’s quote about a specific outcome, with their permission, next to a short description of the work.</p>')}
<p>If you are new and don’t have client proof yet, show your thinking instead: a clear process, a detailed article, a free checklist people can use. Evidence of expertise is also proof.</p>

<h2>Reassurance at the moment of risk</h2>
<p>Doubt peaks when people are about to commit: paying, sharing details, booking a call. That is where a short line of reassurance does the most good.</p>
<ul>
<li>Next to a payment button: what happens next, and how to cancel or get a refund.</li>
<li>Next to a form: how their details will be used, and that they won’t be spammed.</li>
<li>Next to a booking: how long it takes and what to prepare.</li>
</ul>

<h2>Test your trust signals</h2>
<p>Show your website to five people who don’t know you, and ask one question: “What would make you hesitate to contact or buy from this company?” Their answers are a ranked list of what to fix. Often it is something small that you have stopped noticing.</p>`,
  },

  {
    slug: 'twelve-quick-ux-wins-ranked',
    title: 'Twelve quick UX wins, ranked',
    date: '2026-09-05',
    tag: 'UX',
    cover: 'ranking',
    excerpt: 'Small changes that make websites easier to use, ranked by how much they usually help against how long they take. Our view, from years of fixing websites.',
    takeaways: [
      'The best early wins are clarity fixes: headlines, buttons and error messages.',
      'Speed and phone usability come next; they affect every visit.',
      'Rank your own list by impact and effort, then do the top three first.',
    ],
    body: `
<p>Not every improvement needs a redesign. These twelve changes are small, and most can be made in a day or two. We’ve ranked them by how much they usually help against how much effort they take. Your own order will vary, but this is where we would start on most websites.</p>

<h2>The ranking</h2>
<ol>
<li><strong>Rewrite the homepage headline in plain words.</strong> Say what you do and who it is for. It shapes every first impression.</li>
<li><strong>Make one primary action obvious on each key page.</strong> One clear button, with everything else quieter.</li>
<li><strong>Rewrite button labels to say what happens.</strong> “Send inquiry” instead of “Submit”.</li>
<li><strong>Fix error messages.</strong> Say what went wrong and how to fix it, next to the problem.</li>
<li><strong>Cut form fields you don’t use.</strong> Every field removed is effort saved.</li>
<li><strong>Compress and resize images.</strong> Often the quickest way to make pages noticeably faster.</li>
<li><strong>Make buttons and links easy to tap on phones.</strong> Big enough, with space between them.</li>
<li><strong>Trim the main menu to five to seven items,</strong> named in your visitors’ words.</li>
<li><strong>Show contact details clearly,</strong> including how quickly you reply.</li>
<li><strong>Add a clear confirmation after every form,</strong> saying what happens next.</li>
<li><strong>Fix low-contrast text.</strong> Pale gray text is harder to read than it looks.</li>
<li><strong>Remove auto-playing carousels,</strong> or stop them moving on their own.</li>
</ol>

<h2>How we ranked them</h2>
<p>Each change was judged on two things: how many visits it affects, and how much effort it usually takes. Clarity fixes come first because they are cheap and touch every visitor. Speed and phone fixes come next because they affect every visit, but can take more work. The later items still matter; they just tend to help fewer people or take longer.</p>
${compare('<p>Redesign everything at once, launch in six months, and hope it works.</p>', '<p>Make the top three changes this week, measure, then move down the list.</p>', ['The big-bang approach', 'The quick-win approach'])}

<h2>Make your own list</h2>
<p>Write down every improvement you can think of. Next to each, score its likely impact and its effort from one to three. Start with high impact and low effort. Then watch your analytics and your inbox: the results of quick wins are often visible within weeks, which makes it much easier to get support for the bigger changes.</p>
<p class="note">Not sure where your site stands? Our free 12-point behavior check covers several of these in about twenty minutes.</p>`,
  },
];
