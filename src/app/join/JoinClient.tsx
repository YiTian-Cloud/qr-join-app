'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase.client';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';

type FormState = {
  name: string;
  email: string;
  phone: string;
};

export default function JoinClient() {
  const sp = useSearchParams();
  const group = sp.get('group') ?? ''; // e.g. ?group=my-golf-group
  const code = sp.get('code') ?? '';   // optional: ?code=ABC123
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // === 1) Ensure client-side auth (anonymous) so Firestore can write in prod ===
  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setSignedIn(!!u);
    });
    signInAnonymously(auth).catch((e) => {
      console.error('Anon sign-in failed', e);
      setErr(`Sign-in failed: ${e.code ?? e.message}`);
    });
    return () => unsub();
  }, []);

  // === 2) Build the join link we want to encode in the QR ===
  const joinUrl = useMemo(() => {
    // encodes a link users can scan to land on this page with the same params
    // NOTE: location.origin is safe here (client component)
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams();
    if (group) params.set('group', group);
    if (code) params.set('code', code);
    return `${origin}/join?${params.toString()}`;
  }, [group, code]);

  // === 3) No-deps QR image (simple, works today) ===
  // If you prefer a local generator later, swap to the 'qrcode' npm package.
  const qrImgSrc = useMemo(() => {
    const encoded = encodeURIComponent(joinUrl);
    // Using a simple external QR service for now (no npm install needed)
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encoded}`;
  }, [joinUrl]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);

    if (!group) {
      setErr('Missing group parameter in the URL (?group=...)');
      return;
    }

    setSaving(true);
    try {
      const db = getFirebaseDb();

      // You can adjust the collection path to match your model:
      // Option A: per-group subcollection
      // const colRef = collection(db, 'groups', group, 'members');
      // Option B: a flat "joins" collection
      const colRef = collection(db, 'joins');

      await addDoc(colRef, {
        group,
        code: code || null,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        createdAt: serverTimestamp(),
      });

      setMsg('Saved! You’re in the group.'); // You can route after success if you want
      // Example: router.push(`/groups/${group}`);
      setForm({ name: '', email: '', phone: '' });
    } catch (e: unknown) {
      console.error('Save error', e);
      const message = (e as { message?: string })?.message ?? 'Unknown error';
      setErr(`Save failed: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Join Golf Group</h1>
        <p className="text-sm opacity-70">
          Group: <span className="font-mono">{group || '(none)'}</span>
          {code ? <> · Code: <span className="font-mono">{code}</span></> : null}
        </p>
      </header>

      {/* QR */}
      <section className="flex items-center gap-6">
        <img
          src={qrImgSrc}
          alt="Join QR code"
          width={220}
          height={220}
          className="border rounded"
        />
        <div className="text-xs break-all opacity-70">
          Scan to open: <br />
          <span className="font-mono">{joinUrl}</span>
        </div>
      </section>

      {/* Status */}
      {!signedIn && (
        <div className="text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded">
          Attempting anonymous sign-in…
        </div>
      )}
      {msg && (
        <div className="text-green-700 bg-green-50 border border-green-200 p-3 rounded">
          {msg}
        </div>
      )}
      {err && (
        <div className="text-red-700 bg-red-50 border border-red-200 p-3 rounded">
          {err}
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-3 max-w-md">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="Phone"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          disabled={saving || !signedIn}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </form>
    </main>
  );
}
