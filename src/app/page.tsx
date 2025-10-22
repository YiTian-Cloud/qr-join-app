// src/app/page.tsx
"use client";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import HomeClient from "./HomeClient";

export default function Page() {
  return <HomeClient />;
}
