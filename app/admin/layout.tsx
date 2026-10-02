import type { Metadata } from 'next';

export const metadata: Metadata = { title: { absolute: 'Editor · Behavitor' }, robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="adm">{children}</div>;
}
