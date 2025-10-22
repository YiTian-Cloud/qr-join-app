'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinPage() {
  const router = useRouter();
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  async function onJoin() {
    // TODO: persist to Firestore or your backend here
    // await addDoc(collection(db, 'members'), { name, email, phone, groupId: 'golf' });

    // Navigate to the golf group after save
    router.push('/groups/golf'); // you already have /groups/[groupId]
  }

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Join the Golf Group</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        <input placeholder="Name"  value={name}  onChange={(e)=>setName(e.target.value)}  style={{ padding: 10 }}/>
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{ padding: 10 }}/>
        <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} style={{ padding: 10 }}/>
        <button type="button" onClick={onJoin} style={{ padding: '10px 14px' }}>
          Join
        </button>
      </div>
    </div>
  );
}
