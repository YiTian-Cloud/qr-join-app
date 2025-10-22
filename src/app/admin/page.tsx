// src/app/admin/members/page.tsx
'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const viewport = { themeColor: '#0ea5e9' };
// ... your admin component code that imports from '@/lib/firebase.client'


import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase.client';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

type Member = { id: string; name?: string; email?: string; phone?: string; groupId?: string; createdAt?: any };

export default function MembersPage() {
  const [rows, setRows] = useState<Member[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'members'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      setRows(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    });
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
      <h1>Registered Members</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr><th align="left">Name</th><th align="left">Email</th><th align="left">Phone</th><th align="left">Group</th><th align="left">ID</th></tr>
        </thead>
        <tbody>
          {rows.map(m => (
            <tr key={m.id} style={{ borderTop: '1px solid #eee' }}>
              <td>{m.name || '—'}</td>
              <td>{m.email || '—'}</td>
              <td>{m.phone || '—'}</td>
              <td>{m.groupId || '—'}</td>
              <td style={{fontFamily:'monospace'}}>{m.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <p style={{marginTop:12}}>No members yet.</p>}
    </div>
  );
}
