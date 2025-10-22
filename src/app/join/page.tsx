// src/app/(public)/join/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase.client';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const GROUP_ID = 'golf'; // or read from URL if you want dynamic groups

export default function JoinPage() {
  const r = useRouter();
  const [uid, setUid] = useState<string | null>(null);
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy]   = useState(false);
  const [err, setErr]     = useState<string | null>(null);

  useEffect(() => {
    // ensure we have an anonymous session (no GitHub prompt)
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) return setUid(u.uid);
      const cred = await signInAnonymously(auth);
      setUid(cred.user.uid);
    });
    return unsub;
  }, []);

  async function onJoin() {
    if (!uid) return;      // not signed in yet
    setBusy(true); setErr(null);
    try {
      const memberId = `${uid}_${GROUP_ID}`;
      await setDoc(doc(db, 'members', memberId), {
        uid,
        groupId: GROUP_ID,
        name, email, phone,
        createdAt: serverTimestamp(),
      });
      // success → you are now a "member" per your rules, so posting will work
      r.push(`/groups/${GROUP_ID}`);
    } catch (e: any) {
      setErr(e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', padding: 24 }}>
      <h1>Join the Golf Group</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        <input placeholder="Name"  value={name}  onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
        <button type="button" onClick={onJoin} disabled={busy || !uid}>
          {busy ? 'Saving…' : 'Join'}
        </button>
        {err && <div style={{ color: '#b00' }}>{err}</div>}
      </div>
    </div>
  );
}
