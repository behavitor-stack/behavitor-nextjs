import Checklist from '@/components/client/checklist';
import Newsletter from '@/components/client/newsletter';
import { PageHead } from '@/components/ui';
import { laws, lawArt, question } from '@/lib/site';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  path: '/checklist/', title: 'The 12-point behavior check',
  description: 'Twelve quick checks to run on your own website, each based on a well-known principle of how people behave. Free, printable, about 20 minutes.',
});

export default function ChecklistPage() {
  return (
    <>
      <PageHead kicker="Free checklist" title="The 12-point behavior check." lead="Twelve quick checks to run on your own website in about 20 minutes. Each one comes from a well-known principle of how people behave." />
      <Checklist items={laws.map(l => ({ id: l.id, name: l.name, question: question(l), short: l.short, good: l.good, art: lawArt[l.id as keyof typeof lawArt] }))} />
      <Newsletter />
    </>
  );
}
