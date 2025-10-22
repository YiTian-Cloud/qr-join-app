// src/app/HomeClient.tsx
'use client';

import { useMemo, useState } from 'react';
import QRCode from 'react-qr-code';

export default function HomeClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Whatever schema you want to encode; can be JSON, URL, etc.
  const qrPayload = useMemo(() => {
    // Example as a compact URL; change to your own format
    const params = new URLSearchParams();
    if (name) params.set('n', name);
    if (email) params.set('e', email);
    if (phone) params.set('p', phone);
    const url = `qr-join://join?${params.toString()}`;
    return params.toString() ? url : 'qr-join://join?demo=1';
  }, [name, email, phone]);

  const onSave = async () => {
    // Your existing save logic (e.g., Firebase) goes here
    // await saveToFirestore({ name, email, phone });
    // then maybe toast/clear fields, etc.
  };

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Home</h1>

      <div style={{ display: 'grid', gap: 12 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 10 }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10 }}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ padding: 10 }}
        />

        <button onClick={onSave} style={{ padding: '10px 14px' }}>
          Save
        </button>
      </div>

      {/* QR Preview */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'white', padding: 16 }}>
          <QRCode value={qrPayload} size={200} />
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: '#555' }}>
          Encoded: <code>{qrPayload}</code>
        </div>
      </div>
    </div>
  );
}
