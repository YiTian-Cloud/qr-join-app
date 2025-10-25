"use client";
import { useEffect } from "react";

export default function RedirectPWAHomeToJoin() {
  useEffect(() => {
    const isStandalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true; // iOS legacy flag
    if (isStandalone && window.location.pathname === "/") {
      window.location.replace("/join");
    }
  }, []);
  return null;
}
