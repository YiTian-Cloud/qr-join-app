// src/app/HomeClient.tsx
'use client';

import { useMemo, useState } from 'react';
import QRCode from 'react-qr-code';

export default function HomeClient() {
  // if you generate a unique code after Save, keep it here
  const [code, setCode] = useState<string>('');

  // set this to your live prod origin
  const PROD_ORIGIN = 'https://qr-join-app-9zqm-q59xhl817-yitian-clouds-projects.vercel.app';

  const joinUrl = useMemo(() => {
    const base =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : PROD_ORIGIN;

    // if you have a per-friend code, use /join/<code>
    return code ? `${base}/join/${encodeURIComponent(code)}` : `${base}/join`;
  }, [code]);

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Home</h1>

      {/* your existing inputs & Save logic here; when you Save, setCode(...) if you want per-friend URLs */}

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'white', padding: 16 }}>
          <QRCode value={joinUrl} size={220} />
        </div>
        <div style={{ marginTop: 8, fontSize: 12 }}>
          Share this QR. It opens:&nbsp;
          <a href={joinUrl} target="_blank" rel="noreferrer">{joinUrl}</a>
        </div>
      </div>
    </div>
  );
}
