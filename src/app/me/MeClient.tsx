'use client';

import React, { useEffect, useState } from 'react';

type Settings = {
  notifications: boolean;
  timezone: string;
};

export default function MeClient() {
  const [settings, setSettings] = useState<Settings>({ notifications: true, timezone: 'America/Los_Angeles' });

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setSettings((s) => ({ ...s, notifications: checked }));
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSettings((s) => ({ ...s, timezone: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: persist settings
    console.log('Saving settings', settings);
  };

  useEffect(() => {
    // load settings if needed
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold">My Settings</h1>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={settings.notifications} onChange={onCheckboxChange} />
          Enable notifications
        </label>

        <select value={settings.timezone} onChange={onSelectChange} className="border p-2">
          <option value="America/Los_Angeles">America/Los_Angeles</option>
          <option value="America/New_York">America/New_York</option>
        </select>

        <button className="px-4 py-2 rounded bg-black text-white">Save</button>
      </form>
    </main>
  );
}
