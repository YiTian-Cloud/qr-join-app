// app/join/JoinClient.tsx (Client Component)
'use client';

import { useSearchParams } from 'next/navigation';

export default function JoinClient() {
  const sp = useSearchParams();
  const group = sp.get('group') ?? '';
  const email = sp.get('email') ?? '';

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold">Join</h1>
      {/* your form UI */}
      <pre className="text-xs opacity-60">group={group} email={email}</pre>
    </main>
  );
}
