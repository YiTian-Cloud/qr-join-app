// src/app/page.tsx
export const revalidate: number | false = 60; // or false

import HomeClient from "./HomeClient";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Home</h1>
      <HomeClient />
    </main>
  );
}
