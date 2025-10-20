// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "QR Groups",
  description: "Scan a QR to join groups, share topics & events.",
  manifest: "/manifest.json",

  // iOS PWA settings
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "QR Groups",
  },

  // App icons
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },

  // iOS: prevent phone numbers from auto-linking
  other: { "format-detection": "telephone=no" },
};

// Move themeColor here (required in Next 15)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
  // If you want different colors for light/dark, use:
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  //   { media: "(prefers-color-scheme: dark)", color: "#111111" }
  // ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
