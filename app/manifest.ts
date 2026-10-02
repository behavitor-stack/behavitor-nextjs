import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Behavitor', short_name: 'Behavitor', description: site.description,
    start_url: '/', display: 'minimal-ui', background_color: '#f2f2f0', theme_color: '#f2f2f0',
    icons: [{ src: '/assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' }, { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  };
}
