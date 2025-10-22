// app/join/page.tsx
// NOTE: This file must be a Server Component (no "use client" here).
// Set ISR to a fixed number or false. Do NOT import or re-export any `revalidate` function.
export const revalidate = 60; // seconds; or `false` for fully dynamic

import JoinClient from "./joinClient";

export default function JoinPage() {
  // You can fetch server data here if needed, but keep it simple for now.
  return (
    <main className="mx-auto max-w-xl p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Join</h1>
        <p className="text-sm text-gray-500">
          Welcome! Fill in your info below to get started.
        </p>
      </header>

      {/* Render your client component (interactive form/UI) */}
      <JoinClient />
    </main>
  );
}
