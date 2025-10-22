"use client";

import { useEffect, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase.client";
import { onAuthStateChanged, signInAnonymously, type User } from "firebase/auth";

export default function HomeClient() {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // init firebase auth only on the client after mount
  useEffect(() => {
    try {
      const auth = getFirebaseAuth();
      const unsub = onAuthStateChanged(auth, (u) => {
        setUser(u ?? null);
        setAuthReady(true);
      });
      return () => unsub();
    } catch (e: any) {
      setErr(e?.message ?? "Auth init failed");
      setAuthReady(true);
    }
  }, []);

  // anonymous sign-in if no user after first auth state
  useEffect(() => {
    (async () => {
      if (!authReady || user) return;
      try {
        const auth = getFirebaseAuth();
        const res = await signInAnonymously(auth);
        setUser(res.user);
      } catch (e: any) {
        setErr(e?.message ?? "Anonymous sign-in failed");
      }
    })();
  }, [authReady, user]);

  if (!authReady) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6 space-y-1">
      <h1 className="text-xl font-semibold">QR Groups</h1>
      <div className="text-sm text-gray-600">
        {user
          ? `Signed in as ${user.isAnonymous ? "(anonymous)" : (user.displayName ?? user.email)}`
          : "Not signed in."}
      </div>
      {err && <div className="text-sm text-red-600">Auth error: {err}</div>}
    </div>
  );
}
