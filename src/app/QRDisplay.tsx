// src/app/QRDisplay.tsx
"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRDisplay({ value }: { value: string }) {
  if (!value) {
    return (
      <div className="p-3 rounded border text-sm text-red-600 bg-red-50">
        Missing NEXT_PUBLIC_BASE_URL — set it in your env.
      </div>
    );
  }
  return (
    <div className="inline-block p-4 bg-white rounded border">
      <QRCodeCanvas value={value} size={224} includeMargin />
    </div>
  );
}
