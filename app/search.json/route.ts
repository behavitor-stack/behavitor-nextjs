import { searchIndex } from '@/lib/search-index';

// rebuilt whenever a post is saved in the editor (the posts data carries the "posts" tag)
export const dynamic = 'force-static';

export async function GET() {
  return Response.json(await searchIndex());
}
