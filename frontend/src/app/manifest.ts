import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Legacy Vogue - Premium Fashion & Lifestyle',
    short_name: 'Legacy Vogue',
    description: 'Discover our exquisite collection of premium fashion and lifestyle products',
    start_url: '/',
    display: 'standalone',
    background_color: '#111827',
    theme_color: '#EC4899',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
