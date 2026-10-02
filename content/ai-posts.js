// The AI section (/ai/): same format as posts.mjs, shown with the darker AI identity.
// Topics: 'Designing for AI', 'Process', 'AI search', 'Field notes' (weekly 'AI this week' roundups).
// Covers are drawn for a dark background in post-art.mjs (prompt, stream, split).
// Examples are illustrative: no invented client stories or statistics.

const compare = (before, after, labels = ['Before', 'After']) => `
<div class="compare">
  <div><p class="compare__label">${labels[0]}</p>${before}</div>
  <div><p class="compare__label">${labels[1]}</p>${after}</div>
</div>`;

// "How we use AI": shown on the /ai/ index. REVIEW: these are commitments to clients.
export const aiPolicy = {
  title: 'How we use AI',
  lead: 'AI is part of our everyday toolkit. It speeds up the work around decisions. People make the decisions.',
  points: [
    ['People decide', 'AI helps us explore, draft and check. Every finding, design and line of code is reviewed and owned by a person.'],
    ['Your data stays yours', 'We never put client data or research recordings into AI tools without your permission.'],
    ['Real research, not simulated', 'AI can help organize what real people told us. It never replaces talking to them.'],
    ['Always open about it', 'If AI played a meaningful part in your project, we tell you where and how.'],
  ],
};

export const aiPosts = [
  {
    slug: 'the-empty-prompt-box-problem',
    title: 'The empty prompt box problem',
    date: '2026-09-28',
    tag: 'Designing for AI',
    cover: 'prompt',
    excerpt: 'Many AI features greet people with an empty box and a blinking cursor. Infinite choice turns out to be no choice at all. Here’s how to design the first move.',
    takeaways: [
      'An empty prompt box gives people unlimited choice and no guidance, which slows them down.',
      'Suggested starting points, based on context, get people moving.',
      'Show what the feature can and can’t do, and keep free typing open for experts.',
    ],
    body: `
<p>Open almost any new AI feature and you’ll meet the same thing: an empty text box, a blinking cursor and a friendly line such as “Ask me anything”. It looks simple and open. For many people, it is the hardest possible place to start.</p>

<h2>Why an empty box is hard</h2>
<p>Hick’s law tells us that more choices slow decisions down. An empty prompt box is the extreme case: the choices are unlimited, and none of them are shown. People have to work out, on their own, what the feature can do, what it is good at and how to phrase a request. That is a lot of thinking before anything useful has happened.</p>
<p>It is the blank-page problem that writers know well, moved into a product. The more capable the system, the harder it can be to know where to begin.</p>

<h2>What people do instead</h2>
<p>Faced with a blank box, many people type something short and vague, get a short and vague answer, and conclude that the feature isn’t very good. Others hover for a moment and leave. Either way, the problem isn’t the AI’s ability. It is the first step.</p>

<h2>Suggest a first move</h2>
<p>The simplest fix is to offer a few starting points, chosen for where the person is and what they are likely to want. Suggestions do two jobs at once: they get people moving, and they quietly teach what the feature is good at.</p>
${compare('<p>An empty box: <em>“Ask me anything…”</em></p>', '<p>The same box, with three suggestions underneath, based on the page the person is on:</p><ul><li>Summarize this report in five bullet points</li><li>Draft a reply to this customer</li><li>Find the three biggest risks in this plan</li></ul>')}
<p>Good suggestions are specific, and they come from context. A suggestion that mentions the document people are looking at is far more useful than a generic “Write a poem”.</p>

<h2>Show what it can, and can’t, do</h2>
<p>People trust a tool more when they understand its limits. A short line near the box, such as “Works best with documents under 50 pages” or “Can’t see files you haven’t shared”, saves frustration later. So do examples of a good request, shown in the placeholder text or a small help link.</p>

<h2>Help people shape their request</h2>
<p>Not every request has to be typed from scratch. For common jobs, a few simple controls can do the heavy lifting.</p>
<ul>
<li><strong>Quick options</strong> for things people often adjust, such as length or tone.</li>
<li><strong>Follow-up suggestions</strong> after each answer, such as “Make it shorter” or “Turn this into a table”.</li>
<li><strong>Remembered starting points</strong> for tasks people repeat every week.</li>
</ul>

<h2>Keep the door open for experts</h2>
<p>Suggestions should help beginners without slowing down people who already know what they want. Keep the text box ready to type into straight away, keep suggestions out of the way of typing, and let experienced users hide them if they prefer.</p>

<h2>A quick checklist</h2>
<ul>
<li>Does the empty state offer two to four specific, context-based suggestions?</li>
<li>Does it say, briefly, what the feature is good at and what it can’t do?</li>
<li>Are common adjustments available without typing?</li>
<li>Can experts ignore all of it and just type?</li>
</ul>`,
  },

  {
    slug: 'why-ai-answers-stream',
    title: 'Why AI answers stream',
    date: '2026-09-18',
    tag: 'Designing for AI',
    cover: 'stream',
    excerpt: 'AI answers appear word by word for a reason: waiting feels shorter when you can start reading. When streaming helps, when it doesn’t, and the details that matter.',
    takeaways: [
      'Long silent waits break people’s focus; the first words should appear quickly.',
      'Streaming turns waiting into reading, but it can hurt structured or all-or-nothing answers.',
      'Acknowledge instantly, keep the layout stable and make “finished” obvious.',
    ],
    body: `
<p>When an AI assistant answers, the text usually appears a few words at a time, as if someone were typing. It is not a gimmick. Generating a complete answer can take several seconds, and how that time feels matters as much as how long it is.</p>

<h2>The waiting problem</h2>
<p>The Doherty threshold describes how people stay engaged when a system responds within roughly 400 milliseconds, and how their attention begins to drift when they are left waiting. A few seconds of spinner is long enough to glance at another tab, and once people look away, some of them don’t come back.</p>

<h2>Streaming turns waiting into reading</h2>
<p>Streaming shows the first words as soon as they exist. The total time to a full answer may be the same, but people start reading almost immediately, and the wait becomes part of the reading rather than a gap before it. The system also feels more responsive, because something is visibly happening.</p>
${compare('<p>A spinner for eight seconds, then a full wall of text appears all at once.</p>', '<p>An instant “Thinking…” acknowledgement, then text flowing from the first second, with a clear sign when it has finished.</p>')}

<h2>When streaming doesn’t help</h2>
<p>Streaming is right for long, readable text. It is less helpful, and sometimes harmful, in other situations:</p>
<ul>
<li><strong>Structured answers</strong> such as tables, forms or code, which reshuffle as they arrive and are hard to read half-built.</li>
<li><strong>All-or-nothing results</strong> such as a price, a yes or no, or an approval, where a partial answer is meaningless or misleading.</li>
<li><strong>Actions</strong> such as booking or sending, where people need to know the whole thing worked before moving on.</li>
</ul>
<p>In those cases, show clear progress instead: what is happening, and roughly how long is left.</p>

<h2>The details that matter</h2>
<ul>
<li><strong>Acknowledge instantly.</strong> Within a fraction of a second, show that the request was received, even if the answer isn’t ready.</li>
<li><strong>Offer a stop button.</strong> If the answer is heading the wrong way, people should be able to stop it and rephrase.</li>
<li><strong>Don’t drag the page.</strong> Auto-scrolling while someone is reading earlier lines pulls the text away from them. Only follow new text if they are already at the bottom.</li>
<li><strong>Keep the layout still.</strong> Buttons and panels shouldn’t jump around as text arrives.</li>
<li><strong>Make “finished” obvious.</strong> A clear end state, with actions such as copy or retry, tells people the answer is complete.</li>
</ul>
<p class="note">A useful test: watch someone use the feature and notice where their eyes go while text is arriving. If they are reading, streaming is working. If they are hunting for a button that keeps moving, it isn’t.</p>

<h2>A quick checklist</h2>
<ul>
<li>Does something visible happen within half a second of every request?</li>
<li>Is streaming used only where partial text is useful?</li>
<li>Can people stop an answer part-way?</li>
<li>Does the page stay still while text arrives?</li>
<li>Is it obvious when the answer is complete?</li>
</ul>`,
  },

  {
    slug: 'how-we-use-ai-in-a-design-project',
    title: 'How we use AI in a design project, and where we don’t',
    date: '2026-09-10',
    tag: 'Process',
    cover: 'split',
    excerpt: 'AI speeds up the work around decisions. People make the decisions. A stage-by-stage look at where AI helps in our projects, and the lines we don’t cross.',
    takeaways: [
      'AI speeds up the work around decisions; people make the decisions.',
      'It helps most with organizing, drafting and checking; judgment stays human.',
      'Client data stays private, research stays real, and clients always know.',
    ],
    body: `
<p>AI is part of our everyday toolkit, and we think clients deserve to know exactly how. Our rule of thumb is simple: AI speeds up the work around decisions; people make the decisions. Here is what that looks like at each stage of a project.</p>

<h2>Research</h2>
<p>Research is where the temptation to cut corners is greatest, and where it matters most not to. AI can make the work around research faster. It cannot replace watching real people.</p>
${compare('<ul><li>Organizing notes from many sessions</li><li>Suggesting first-pass themes to check</li><li>Drafting interview guides and task wording</li></ul>', '<ul><li>Running every session and watching real behavior</li><li>Deciding which patterns actually matter</li><li>Checking every theme against the evidence</li></ul>', ['AI helps with', 'People decide'])}
<p>Any themes AI suggests are a starting point for checking, never a finding in themselves.</p>

<h2>Design</h2>
<p>In design, AI is useful for breadth: exploring more options, more quickly, so the good ones are easier to find. Choosing between them is still a matter of judgment, taste and knowing the people the design is for.</p>
${compare('<ul><li>Exploring layout and wording variations</li><li>Drafting first versions of content</li><li>Suggesting image descriptions to refine</li></ul>', '<ul><li>Which direction to take, and why</li><li>Final wording, tone and accessibility</li><li>Whether it works for real people, tested with them</li></ul>', ['AI helps with', 'People decide'])}

<h2>Build</h2>
<p>AI coding tools save time on repetitive work and are good at spotting problems. Every line that ships is still reviewed by a person who understands it.</p>
${compare('<ul><li>Routine code and first drafts</li><li>Writing tests and finding bugs</li><li>Second-opinion code reviews</li></ul>', '<ul><li>Structure, security and performance</li><li>Reviewing everything before it ships</li><li>What goes live, and when</li></ul>', ['AI helps with', 'People decide'])}

<h2>The lines we don’t cross</h2>
<ul>
<li><strong>No client data in AI tools without permission.</strong> Research recordings, customer information and private documents stay private unless you agree otherwise.</li>
<li><strong>No simulated users instead of real ones.</strong> AI can help us organize what real people said. It does not stand in for them.</li>
<li><strong>No unreviewed output.</strong> Nothing written, designed or built by AI reaches you, or your customers, without a person checking it.</li>
<li><strong>No unchecked claims.</strong> Facts, figures and sources are verified, however confident an AI answer sounds.</li>
</ul>

<h2>What this means for clients</h2>
<p>In practice, AI lets us explore more options and spend more of our time on the parts of a project that need human judgment: understanding your customers, making the hard calls and getting the details right. The accountability doesn’t change. If AI played a meaningful part in your project, we will tell you where and how.</p>`,
  },
  {
    slug: 'ai-this-week-september-30-2026',
    title: 'AI this week: agents get their own app stores',
    date: '2026-09-30',
    tag: 'Field notes',
    cover: 'roundup',
    excerpt: 'Our pick of the week’s AI news, and what each story means for people designing websites and products. Agents, cheaper models and AI search.',
    takeaways: [
      'Chat assistants are turning into platforms with their own apps and interfaces.',
      'Faster, cheaper models make AI features practical in more everyday places.',
      'Agents are starting to use websites directly, so structure and clarity matter more.',
    ],
    body: `
<p>Each week we pick a handful of AI stories that matter for people who design and build websites, and add a short note on why. The news comes from the publications linked; the “why it matters” notes are our view. For the full stream of headlines, see our <a href="/ai/news/">AI news page</a>.</p>

<h2>Chat assistants become app platforms</h2>
<p>At its developer conference, OpenAI announced ways for ChatGPT plug-ins to show app-like interfaces and run automations, and TechCrunch described the new features as a direct challenge to the app store model. It also launched “Dots”, an agent with an animated avatar. <a href="https://techcrunch.com/2026/09/29/openais-latest-features-take-direct-aim-at-the-app-store-model/" target="_blank" rel="noopener">TechCrunch</a></p>
<p class="note"><strong>Why it matters:</strong> more services will be used inside an assistant rather than on their own website. Designers will need to think about how their product looks and behaves in someone else’s interface, in a few small cards rather than a whole page.</p>

<h2>Cheaper, faster models</h2>
<p>Anthropic released Claude Sonnet 5.5, which it describes as a significantly cheaper and faster work partner. OpenAI launched GPT-6.1 Sol, which it says nearly matches its larger model at a lower cost. <a href="https://techcrunch.com/2026/09/28/anthropic-releases-sonnet-5-5-which-it-calls-a-significantly-cheaper-faster-work-partner/" target="_blank" rel="noopener">TechCrunch</a> · <a href="https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/" target="_blank" rel="noopener">TechCrunch</a></p>
<p class="note"><strong>Why it matters:</strong> speed changes what AI features feel like. Faster responses bring more features under the point where people stay engaged, and lower costs make AI practical in places that couldn’t justify it before, such as search boxes and forms.</p>

<h2>Agents at the checkout</h2>
<p>Shopify opened its checkout to browser-based AI agents, according to TechCrunch. <a href="https://techcrunch.com/2026/09/28/shopify-opens-checkout-to-browser-based-ai-agents/" target="_blank" rel="noopener">TechCrunch</a></p>
<p class="note"><strong>Why it matters:</strong> some of your “visitors” may soon be software acting for a person. Clear structure, predictable forms and honest labels help both humans and agents, which is one more reason to fix confusing checkouts now.</p>

<h2>Natural-language search spreads</h2>
<p>Airbnb added AI-powered search alongside new social features. <a href="https://techcrunch.com/2026/09/30/airbnb-adds-ai-search-more-social-features/" target="_blank" rel="noopener">TechCrunch</a></p>
<p class="note"><strong>Why it matters:</strong> people are getting used to describing what they want in their own words. The hard part is the first move: an open search box needs good suggestions to get people started, which we covered in <a href="/ai/the-empty-prompt-box-problem/">The empty prompt box problem</a>.</p>

<h2>Keeping agents in check</h2>
<p>Nvidia launched a platform aimed at reining in rogue AI agents, and TechCrunch reported on why OpenAI is absent from that industry-wide effort. <a href="https://techcrunch.com/2026/09/28/nvidia-launches-new-platform-for-reining-in-rogue-ai-agents/" target="_blank" rel="noopener">TechCrunch</a></p>
<p class="note"><strong>Why it matters:</strong> as agents do more on people’s behalf, oversight moves from a technical concern to a design one. People need to see what an agent plans to do and approve the important steps; see <a href="/ai/designing-ai-agents-people-can-supervise/">Checkpoints, not blind trust</a>.</p>

<h2>Names that change how people think</h2>
<p>Google is replacing Gemini’s “Gems” with “skills”, according to TechCrunch. <a href="https://techcrunch.com/2026/09/28/google-is-killing-off-geminis-gems-in-favor-of-skills/" target="_blank" rel="noopener">TechCrunch</a></p>
<p class="note"><strong>Why it matters:</strong> a name sets expectations. “Skills” suggests something an assistant can do, not a separate thing you create. When you name features, choose the words that match what people will actually do with them.</p>`,
  },

  {
    slug: 'when-ai-should-ask-before-it-answers',
    title: 'When AI should ask before it answers',
    date: '2026-09-24',
    tag: 'Designing for AI',
    cover: 'ask',
    excerpt: 'A confident answer to the wrong question wastes more time than a quick clarifying question. When AI features should ask first, and how to make asking feel helpful.',
    takeaways: [
      'Guessing wrong costs more than one quick question, especially for long or risky tasks.',
      'Ask only when the answer would really change the result.',
      'Offer choices instead of open questions, and let people skip.',
    ],
    body: `
<p>Most AI features are designed to answer immediately. That feels fast, until the answer is to a question the person didn’t mean. Then they have to read it, realize it’s wrong, explain again and wait again. One well-timed question at the start would have saved all of that.</p>

<h2>The cost of a confident guess</h2>
<p>Requests are often shorter than the thought behind them. “Write a summary” could mean three bullet points for a manager or a page for a client. A system that guesses produces something plausible, and plausible-but-wrong is expensive: people may not notice the mismatch until they have used it.</p>

<h2>When to ask</h2>
<p>Asking has a cost too: it delays the answer and adds a step. So ask only when the answer would genuinely change the result.</p>
<ul>
<li><strong>The task is long or costly to redo,</strong> such as a full report or a batch of changes.</li>
<li><strong>The request has more than one likely meaning</strong> that leads to very different results.</li>
<li><strong>The action is risky or hard to undo,</strong> such as sending, deleting or buying.</li>
</ul>
<p>For quick, cheap tasks, it is usually better to answer and make it easy to adjust.</p>

<h2>Offer choices, not open questions</h2>
<p>An open question (“Can you clarify?”) hands the work back to the person. A small set of likely options is faster and shows that the system understood most of the request.</p>
${compare('<p>“Could you provide more details about what you’re looking for?”</p>', '<p>“Who is this summary for?” with three quick options: <em>My team</em>, <em>A client</em>, <em>Just me</em>, plus “Something else”.</p>')}

<h2>Ask once, then remember</h2>
<p>Nothing is more tiring than answering the same question every time. Remember preferences within a session, and where it makes sense, across sessions, with a way to change them later.</p>

<h2>Always let people skip</h2>
<p>Some people know exactly what they want and just want the answer. A visible “Just answer” option respects that, and the system can state its assumption: “Assuming this is for your team; change it here.”</p>

<h2>A quick checklist</h2>
<ul>
<li>Does the feature ask only when the answer would change the result?</li>
<li>Are questions offered as a few clear choices?</li>
<li>Can people skip, with the assumption shown?</li>
<li>Is the answer remembered next time?</li>
</ul>`,
  },

  {
    slug: 'designing-ai-agents-people-can-supervise',
    seoTitle: 'Designing AI agents people can supervise', // shorter title for search results and browser tabs
    title: 'Checkpoints, not blind trust: designing AI agents people can supervise',
    date: '2026-09-14',
    tag: 'Designing for AI',
    cover: 'checkpoint',
    excerpt: 'AI agents can now carry out whole tasks on people’s behalf. The design challenge is keeping people in control without making them watch every step.',
    takeaways: [
      'People can’t supervise what they can’t see; show the plan before acting.',
      'Pause for approval at the steps that matter, not at every step.',
      'Make actions easy to review and undo, so trust can grow over time.',
    ],
    body: `
<p>AI agents don’t just answer questions; they take actions. They fill in forms, send messages, change settings and make purchases. That makes them useful, and it changes the design problem: people are no longer judging an answer, they are supervising a worker.</p>

<h2>Watching every step doesn’t work</h2>
<p>If an agent asks for approval at every small step, people either give up on it or start clicking “Approve” without reading, which is worse than no checks at all. If it never asks, people can’t catch mistakes until it is too late. Good supervision sits between the two.</p>

<h2>Show the plan first</h2>
<p>Before acting, an agent should show what it intends to do, in plain steps. A plan is quick to scan, and it is the cheapest moment to spot a misunderstanding.</p>
${compare('<p>“Working on it…” followed, minutes later, by “Done! I’ve updated your bookings.”</p>', '<p>“Here’s my plan: 1. Find flights under $250 on Friday. 2. Hold the best two. 3. Ask you before paying.” with <em>Go ahead</em> and <em>Change plan</em>.</p>')}

<h2>Pause at the steps that matter</h2>
<p>Choose checkpoints by risk, not by habit. Good places to pause are:</p>
<ul>
<li>Before spending money or committing to something.</li>
<li>Before sending anything to other people.</li>
<li>Before deleting, overwriting or changing access.</li>
<li>When the agent is unsure, or has found something unexpected.</li>
</ul>
<p>Everything else can happen quietly, as long as it is visible afterwards.</p>

<h2>Make the work reviewable</h2>
<p>A clear record of what the agent did, in order, lets people check the work at their own pace. Each entry should say what happened, where, and link to the result.</p>

<h2>Undo builds trust</h2>
<p>People trust systems that forgive mistakes. Where actions can be reversed, make undo obvious and immediate. Where they can’t, say so clearly before the checkpoint, not after.</p>

<h2>Let trust grow</h2>
<p>People are rightly cautious with a new agent. As it proves reliable, they may want fewer interruptions. Let them choose, per type of action, whether to be asked, told afterwards, or not bothered at all.</p>

<h2>A quick checklist</h2>
<ul>
<li>Does the agent show its plan before acting?</li>
<li>Are checkpoints placed at risky steps only?</li>
<li>Is there a readable record of everything it did?</li>
<li>Can people undo, or at least see what can’t be undone?</li>
<li>Can people adjust how often they are asked?</li>
</ul>`,
  },

  {
    slug: 'designing-ai-citations-people-check',
    seoTitle: 'Designing AI citations people actually check', // shorter title for search results and browser tabs
    title: 'Sources on show: designing AI citations people actually check',
    date: '2026-09-06',
    tag: 'AI search',
    cover: 'sources',
    excerpt: 'AI answers increasingly come with sources, but most people never open them. How to design citations that make checking easy, and why that matters for trust.',
    takeaways: [
      'Citations only build trust if people can check them quickly.',
      'Link each claim to its source, not just a list at the end.',
      'Show what the source is before people click.',
    ],
    body: `
<p>AI answers increasingly come with sources: small numbers, links or cards that point to where the information came from. In principle, that lets people check. In practice, many citation designs make checking so awkward that hardly anyone does.</p>

<h2>Why sources matter</h2>
<p>AI systems can state wrong things with complete confidence. Sources are the main way people can tell a well-supported claim from a shaky one. If the design discourages checking, the sources become decoration, and people either trust everything or nothing.</p>

<h2>Link claims, not just answers</h2>
<p>A list of five links at the end of a long answer doesn’t tell people which link supports which statement. Placing a small marker next to each claim, linked to its source, makes checking one specific fact quick.</p>
${compare('<p>A long answer, followed by “Sources: 1 2 3 4 5”.</p>', '<p>Each key claim ends with a small numbered marker. Tapping it shows the source and the relevant passage.</p>')}

<h2>Show the source before the click</h2>
<p>People decide whether a source is worth opening from its name and type. Show the publication or site name, the page title and, ideally, the date. A marker that reveals nothing until clicked asks people to click blindly, and most won’t.</p>

<h2>Show the relevant part</h2>
<p>Opening a long page to hunt for one sentence is a chore. Where possible, show the passage that supports the claim, or jump straight to it.</p>

<h2>Be honest about gaps</h2>
<p>When a claim has no good source, say so. “We couldn’t find a reliable source for this” is more useful, and more trustworthy, than a weak link dressed up as support.</p>

<h2>What this means for your website</h2>
<p>If AI assistants cite your pages, the same principles work in your favor. Pages that state facts clearly, with a visible date, author and organization name, are easier to quote and easier for people to trust when they arrive. See also <a href="/blog/seo-when-ai-answers-first/">SEO when AI answers first</a>.</p>

<h2>A quick checklist</h2>
<ul>
<li>Are sources linked to individual claims?</li>
<li>Can people see the source’s name and type before clicking?</li>
<li>Does opening a source lead straight to the relevant part?</li>
<li>Are unsupported claims clearly marked?</li>
</ul>`,
  },
];
