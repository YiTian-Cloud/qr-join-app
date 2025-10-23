"use client";

import { useState } from "react";

export default function JoinClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Submitted:\nName: ${name}\nEmail: ${email}`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input id="name" name="name" value={name}
               onChange={(e) => setName(e.target.value)} required
               className="w-full rounded-md border px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" value={email}
               onChange={(e) => setEmail(e.target.value)} required
               className="w-full rounded-md border px-3 py-2" />
      </div>
      <button type="submit" className="rounded-md bg-black px-4 py-2 text-white">
        Join
      </button>
    </form>
  );
}
