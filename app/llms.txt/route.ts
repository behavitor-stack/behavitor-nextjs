// A plain summary of the studio and every page, for AI assistants (https://llmstxt.org).
import { site, services, work } from '@/lib/site';
import { getPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export async function GET() {
  const [blog, ai] = await Promise.all([getPosts('blog'), getPosts('ai')]);
  const body = `# Behavitor

> ${site.description}

Behavitor is a remote design and development studio. We study how people search, scroll, click and decide on websites, and use what we find to design, build and market websites. We write in plain English for clients in the US.

## Services

${services.map(sv => `- [${sv.name}](${site.url}/services/#${sv.id}): ${sv.line} ${sv.body}`).join('\n')}

## Start here

- [Sample audit report](${site.url}/sample-audit/): what a Behavitor website audit contains, shown on a made-up website.
- [Free 12-point behavior check](${site.url}/checklist/): a checklist anyone can run on their own site.
- [Contact](${site.url}/contact/): start a project or book an audit (${site.email}).

## Concept projects

${work.map(w => `- [${w.title}](${site.url}/work/${w.slug}/): ${w.summary}`).join('\n')}

## Articles

${blog.map(p => `- [${p.title}](${site.url}${p.url}): ${p.excerpt}`).join('\n')}

## AI articles

${ai.map(p => `- [${p.title}](${site.url}${p.url}): ${p.excerpt}`).join('\n')}
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
