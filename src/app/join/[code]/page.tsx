'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
// If you actually use Firebase here, import your client getters:
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase.client';
// Remove unused Firestore imports like `collection` if not used

type JoinState = {
  loading: boolean;
  error?: string;
};

export default function JoinByCodePage() {
  const params = useParams<{ code: string }>();
  const code = params?.code ?? '';
  const router = useRouter(); // <-- If not used, delete this line
  const sp = useSearchParams();

  const [state, setState] = useState<JoinState>({ loading: true });

  // Example: if you use `auth` inside, include it in deps
  const auth = getFirebaseAuth(); // if not used, delete this line and related deps
  const db = getFirebaseDb();     // if not used, delete this line and related deps

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        // Do your fetch/join logic here. Use `auth`/`db` if needed.
        // Example (pseudo):
        // const group = await loadGroupByCode(db, code as string);
        if (cancelled) return;
        setState({ loading: false });
      } catch (e: unknown) {
        if (cancelled) return;
        setState({ loading: false, error: (e as Error).message });
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
    // If you actually used `auth`/`db` above, include them in deps; otherwise remove them from deps and delete the vars.
  }, [code, auth, db]); // or just [code] if you didn’t use auth/db

  if (state.loading) {
    return <div className="p-6">Loading…</div>;
  }

  if (state.error) {
    return (
      <main className="p-6 space-y-3">
        <h1 className="text-xl font-semibold">Join</h1>
        <p className="text-red-600">Error: {state.error}</p>
        {/* FIXED: use Link instead of <a href="/"> */}
        <Link href="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-3">
      <h1 className="text-xl font-semibold">Join</h1>
      <p>Joined by code: <strong>{code}</strong></p>
      <Link href="/" className="text-blue-600 underline">
        Back to Home
      </Link>
    </main>
  );
}
