// src/components/RedirectPWAHomeToJoin.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RedirectPWAHomeToJoin() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Example: if PWA opens at "/", push to "/join"
    if (pathname === "/") {
      router.replace("/join");
    }
  }, [pathname, router]);

  return null;
}
