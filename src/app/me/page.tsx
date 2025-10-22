// src/app/me/page.tsx
import { Suspense } from "react";
import MeClient from "./MeClient";   // ← fix this line

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <MeClient />
    </Suspense>
  );
}
