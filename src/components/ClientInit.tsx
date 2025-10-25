"use client";

// before
// import "@/lib/firebase.client";

// after (components and lib are siblings under src/)
import "../lib/firebase.client";

export default function ClientInit() {
  return null;
}
