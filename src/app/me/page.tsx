"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where, limit,
  type Timestamp
} from "firebase/firestore";

type MemberDoc = {
  uid: string;
  groupId: string;
  displayName: string;
  joinedAt: Timestamp | null;
};
type Group = { id: string; name: string };
type PostDoc = {
  groupId: string;
  authorUid: string;
  type: "topic" | "event";
  text: string;
  createdAt: Timestamp | null;
};
type Post = PostDoc & { id: string; groupName?: string };

export default function Me() {
  const [uid, setUid] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [events, setEvents] = useState<Post[]>([]);

  // Ensure we have a user (anonymous is fine)
  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      if (!u) {
        const res = await signInAnonymously(auth);
        setUid(res.user.uid);
      } else {
        setUid(u.uid);
      }
    });
  }, []);

  // Load groups the user joined
  useEffect(() => {
    if (!uid) return;

    const q = query(
      collection(db, "members"),
      where("uid", "==", uid),
      orderBy("joinedAt", "desc")
    );

    const unsub = onSnapshot(q, async (snap) => {
      const memberRows = snap.docs.map((d) => d.data() as MemberDoc);
      const groupIds = Array.from(new Set(memberRows.map((m) => m.groupId)));
      // Resolve names
      const groupDocs = await Promise.all(
        groupIds.map(async (id) => {
          const g = await getDoc(doc(db, "groups", id));
          return g.exists() ? ({ id, name: (g.data().name as string) ?? "Group" }) : ({ id, name: "Group" });
        })
      );
      setGroups(groupDocs);

      // Recent EVENTS across up to 10 groups (Firestore 'in' max is 10)
      const chunk = groupIds.slice(0, 10);
      if (chunk.length) {
        const eventsQ = query(
          collection(db, "posts"),
          where("groupId", "in", chunk),
          where("type", "==", "event"),
          orderBy("createdAt", "desc"),
          limit(20)
        );
        const evSnap = await getDocs(eventsQ);
        const nameMap = new Map(groupDocs.map(g => [g.id, g.name]));
        const evs: Post[] = evSnap.docs.map((d) => {
          const data = d.data() as PostDoc;
          return { id: d.id, ...data, groupName: nameMap.get(data.groupId) };
        });
        setEvents(evs);
      } else {
        setEvents([]);
      }
    });

    return () => unsub();
  }, [uid]);

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-4">My Groups</h1>

      <div className="rounded-2xl bg-white p-4 shadow">
        {groups.length === 0 ? (
          <p className="text-sm text-gray-500">You haven’t joined any groups yet.</p>
        ) : (
          <ul className="divide-y">
            {groups.map((g) => (
              <li key={g.id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-medium">{g.name}</div>
                  <div className="text-xs text-gray-500">{g.id}</div>
                </div>
                <div className="flex gap-2">
                  <a className="text-sm text-blue-600 hover:underline" href={`/group/${g.id}`}>
                    Members
                  </a>
                  <a className="text-sm text-blue-600 hover:underline" href={`/join/${g.id.slice(-6).toUpperCase()}`}>
                    Join page
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h2 className="text-lg font-medium mt-8 mb-3">Recent events</h2>
      <div className="rounded-2xl bg-white p-4 shadow">
        {events.length === 0 ? (
          <p className="text-sm text-gray-500">No event posts yet.</p>
        ) : (
          <ul className="space-y-3">
            {events.map((e) => (
              <li key={e.id} className="rounded-xl border p-3">
                <div className="text-xs text-gray-500 mb-1">{e.groupName}</div>
                <div className="font-medium">Event</div>
                <div className="">{e.text}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {e.createdAt ? new Date(e.createdAt.toMillis()).toLocaleString() : "—"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <a href="/" className="text-sm text-blue-600 hover:underline">← Back to Home</a>
      </div>
    </main>
  );
}
