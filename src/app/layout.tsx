// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "QR Groups",
  description: "Scan a QR to join groups, share topics & events.",
  // PWA manifest + colors
  manifest: "/manifest.json",
  themeColor: "#111111",

  // iOS “Add to Home Screen” support
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "QR Groups",
  },

  // App icons (iOS + standard)
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
