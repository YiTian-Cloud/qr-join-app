import type { ReactNode } from "react";
import "./globals.css";
import ClientInit from "@/components/ClientInit";  // <-- add this

export const metadata = {
  title: "Golf Connect",
  description: "Join & manage QR groups",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientInit />   {/* ensures firebase.client runs in the browser */}
        {children}
      </body>
    </html>
  );
}
