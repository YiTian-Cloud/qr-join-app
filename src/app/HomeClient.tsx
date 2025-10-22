'use client';

import React, { useEffect, useState } from 'react';

type Profile = {
  name: string;
  email: string;
  phone: string;
};

export default function HomeClient() {
  const [profile, setProfile] = useState<Profile>({ name: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);

  // Example: input change handler (was `any`)
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Example: form submit (was `any`)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      // TODO: save profile
      // await saveProfile(profile)
      console.log('Saving profile', profile);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    // Load initial data if needed
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold">Home</h1>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input
          name="name"
          value={profile.name}
          onChange={onInputChange}
          placeholder="Name"
          className="border p-2 w-full"
        />
        <input
          name="email"
          value={profile.email}
          onChange={onInputChange}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          name="phone"
          value={profile.phone}
          onChange={onInputChange}
          placeholder="Phone"
          className="border p-2 w-full"
        />
        <button disabled={saving} className="px-4 py-2 rounded bg-black text-white">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </form>
    </main>
  );
}
