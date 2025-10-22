// src/app/HomeClient.tsx
"use client";

import { useState } from "react";

export default function HomeClient() {
  const [msg, setMsg] = useState("Welcome");

  return (
    <section className="space-y-2">
      <p className="text-gray-600">{msg}</p>
      <button
        className="rounded-md bg-black px-4 py-2 text-white"
        onClick={() => setMsg("Thanks for visiting")}
      >
        Update
      </button>
    </section>
  );
}
