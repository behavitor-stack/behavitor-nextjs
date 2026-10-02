import SiteLayout from './(site)/layout';
import Lost from '@/components/lost';

export const metadata = { title: 'Not found · Behavitor', robots: { index: false } };

export default function NotFound() {
  return <SiteLayout><Lost /></SiteLayout>;
}
