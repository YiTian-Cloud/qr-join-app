// src/app/announcements/page.tsx
import Link from "next/link";
import { getAnnouncements } from "../actions";

export const revalidate = 0; // always fetch fresh data

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <main className="mx-auto min-h-screen max-w-xl space-y-6 bg-slate-50 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Golf Community — Announcements</h1>
        <p className="text-sm text-gray-600">
          Messages posted by members of the golf community.
        </p>
        <Link href="/join" className="text-sm text-blue-600 underline">
          ← Back to Join &amp; Post
        </Link>
      </header>

      <section className="rounded-md border bg-white p-4">
        {announcements.length === 0 ? (
          <p className="text-sm text-gray-500">
            No announcements yet. Post the first one from the{" "}
            <Link href="/join" className="underline">
              join page
            </Link>
            .
          </p>
        ) : (
          <ul className="space-y-3 text-sm">
            {announcements.map((a) => (
              <li
                key={a.id}
                className="border-b pb-3 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{a.name}</span>
                  <span className="text-xs text-gray-500">
                    {a.createdAt.toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 whitespace-pre-line">{a.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
