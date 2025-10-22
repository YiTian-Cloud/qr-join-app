// app/join/joinClient.tsx
"use client";

import { useState } from "react";

export default function JoinClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Do your client-side handling or call a server route/action (not shown here).
    // Example: fetch("/api/join", { method: "POST", body: JSON.stringify({ name, email }) })
    alert(`Submitted:\nName: ${name}\nEmail: ${email}`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          className="w-full rounded-md border px-3 py-2 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ada Lovelace"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-md border px-3 py-2 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ada@example.com"
          required
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Join
      </button>
    </form>
  );
}
