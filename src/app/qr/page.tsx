'use client';

import QRCode from 'react-qr-code';
import { useState } from 'react';

export default function QRDemoPage() {
  const [value, setValue] = useState('hello-qr');

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>QR Demo</h1>

      <div style={{ background: 'white', padding: 16, display: 'inline-block' }}>
        <QRCode value={value || 'placeholder'} size={200} />
      </div>

      <div style={{ marginTop: 16 }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to change QR content"
          style={{ width: '100%', padding: 8 }}
        />
      </div>
    </div>
  );
}
