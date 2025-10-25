// src/app/announcements/page.tsx
// Server Component

// import your DB same way as in actions.ts
// Example (Admin SDK):
// import { db } from "@/lib/firebaseAdmin";

type Ann = { id: string; name?: string; message: string; createdAt?: Date };

export default async function AnnouncementsPage() {
  // Replace this with your real Firestore fetch using the same client as actions.ts
  // Example (Admin SDK):
  // const snap = await db.collection("announcements").orderBy("createdAt", "desc").limit(50).get();
  // const items: Ann[] = snap.docs.map(d => {
  //   const data = d.data();
  //   return { id: d.id, name: data.name, message: data.message, createdAt: data.createdAt?.toDate?.() ?? null };
  // });

  const items: Ann[] = []; // ← temp placeholder if you haven’t wired DB yet

  return (
    <main className="mx-auto max-w-xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Announcements</h1>
      {items.length === 0 ? (
        <div className="text-gray-500">No announcements yet.</div>
      ) : (
        <ul className="space-y-3">
          {items.map((a) => (
            <li key={a.id} className="rounded-md border p-3">
              <div className="text-sm text-gray-500">
                {a.name || "Anonymous"}{a.createdAt ? ` · ${a.createdAt.toLocaleString()}` : ""}
              </div>
              <div>{a.message}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
