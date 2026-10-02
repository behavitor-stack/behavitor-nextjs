import { getPosts } from '@/lib/posts';
import { rss } from '@/lib/feed';

export const dynamic = 'force-static';

export async function GET() {
  return rss('Behavitor: blog', 'Notes and research on design, search, UX and building better websites.', '/blog/', await getPosts('blog'));
}
