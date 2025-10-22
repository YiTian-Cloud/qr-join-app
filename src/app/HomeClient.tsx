'use client';

import QRCode from 'react-qr-code';
import { useMemo } from 'react';

export default function HomeClient() {
  const PROD_ORIGIN = 'https://YOUR-DOMAIN.vercel.app'; // <-- put your prod origin

  // Use /join or /join/golf (pick one)
  const joinUrl = useMemo(() => {
    const base = typeof window !== 'undefined' ? window.location.origin : PROD_ORIGIN;
    return `${base}/join`;           // or: `${base}/join/golf`
  }, []);

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Home</h1>
      <div style={{ textAlign: 'center' }}>
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
