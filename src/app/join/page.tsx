'use client';

import { useEffect, useState } from 'react';

function useIosA2hsHint() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = window.navigator.userAgent || '';
    const isiOS = /iPad|iPhone|iPod/.test(ua);
    const isStandalone = (window.navigator as any).standalone === true || window.matchMedia('(display-mode: standalone)').matches;
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    if (isiOS && isSafari && !isStandalone) {
      setShow(true);
    }
  }, []);
  return show;
}

export default function JoinPage() {
  const showHint = useIosA2hsHint();

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', padding: 20 }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>Join</h1>

      {/* your friend’s form fields go here... */}

      {showHint && (
        <div style={{
          marginTop: 16,
          padding: '10px 12px',
          borderRadius: 8,
          background: '#fffbea',
          border: '1px solid #f5e0a1',
          color: '#7a5e00',
          fontSize: 14
        }}>
          Tip: Add this app to your Home Screen —
          open the <b>Share</b> menu <span aria-label="share" role="img">🔗</span> and choose
          <b> Add to Home Screen</b>.
        </div>
      )}
    </div>
  );
}
