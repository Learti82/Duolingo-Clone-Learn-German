import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lerno Gjermanisht – Deutsch A1→C2',
    short_name: 'LernoDE',
    description: 'Mëso gjermanisht nga A1 deri C2 – Learn German A1 to C2',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#58CC02',
    orientation: 'portrait-primary',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable any' },
      { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    categories: ['education', 'language'],
    lang: 'sq',
    dir: 'ltr',
  };
}
