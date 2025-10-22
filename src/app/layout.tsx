import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Join',
  description: 'Join via QR',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png'
  },
  themeColor: '#0ea5e9'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
