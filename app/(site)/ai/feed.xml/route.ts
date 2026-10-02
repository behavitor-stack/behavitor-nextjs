import { getPosts } from '@/lib/posts';
import { rss } from '@/lib/feed';

export const dynamic = 'force-static';

export async function GET() {
  return rss('Behavitor: AI', 'How people really behave with AI features, and how we use AI in our own work.', '/ai/', await getPosts('ai'));
}
