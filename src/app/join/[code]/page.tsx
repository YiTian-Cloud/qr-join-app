"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../../lib/firebase";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  type Timestamp,
} from "firebase/firestore";

type PostDoc = {
  groupId: string;
  authorUid: string;
  type: "topic" | "event";
  text: string;
  createdAt: Timestamp | null;
};

type Post = PostDoc & { id: string };

export default function Join({ params }: { params: { code: string } }) {
  const code = params.code.toUpperCase();

  const [uid, setUid] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [groupId, setGroupId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState<string>("…");
  const [joined, setJoined] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");

  // Ensure anonymous auth
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

  // Resolve invite code -> group
  useEffect(() => {
    const load = async () => {
      const inv = await getDoc(doc(db, "invites", code));
      if (inv.exists()) {
        const gid = inv.data().groupId as string;
        setGroupId(gid);
        const g = await getDoc(doc(db, "groups", gid));
        if (g.exists()) setGroupName((g.data().name as string) ?? "Group");
      } else {
        setGroupName("Invalid invite code");
      }
    };
    void load();
  }, [code]);

  // Live posts for this group
  useEffect(() => {
    if (!groupId) return;
    const q = query(
      collection(db, "posts"),
      where("groupId", "==", groupId),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snap) => {
      const items: Post[] = snap.docs.map((d) => {
        const data = d.data() as Partial<PostDoc>;
        return {
          id: d.id,
          groupId: data.groupId ?? "",
          authorUid: data.authorUid ?? "",
          type: (data.type as "topic" | "event") ?? "topic",
          text: data.text ?? "",
          createdAt: (data.createdAt as Timestamp | null) ?? null,
        };
      });
      setPosts(items);
    });
  }, [groupId]);

  const doJoin = async () => {
    if (!uid || !groupId || !displayName.trim()) return;
    await setDoc(doc(db, "members", `${uid}_${groupId}`), {
      uid,
      groupId,
      displayName: displayName.trim(),
      joinedAt: serverTimestamp(),
      role: "member",
    });
    setJoined(true);
  };

  const postTopic = async () => {
    if (!uid || !groupId || !text.trim()) return;
    await addDoc(collection(db, "posts"), {
      groupId,
      authorUid: uid,
      type: "topic",
      text: text.trim(),
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-2">{groupName}</h1>
      <p className="text-sm text-gray-600 mb-4">Invite code: {code}</p>

      {!joined && (
        <div className="rounded-2xl bg-white p-4 shadow mb-6">
          <label className="block text-sm mb-2">Your display name</label>
          <input
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g., Eric"
          />
          <button
            onClick={doJoin}
            className="mt-3 rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
            disabled={!displayName.trim() || !uid || !groupId}
          >
            Join group
          </button>
          <p className="mt-2 text-xs text-gray-500">
            Anonymous sign-in, no email required (you can add later).
          </p>
        </div>
      )}

      <div className="rounded-2xl bg-white p-4 shadow">
        <h2 className="font-medium mb-3">Share something</h2>
        <textarea
          className="w-full rounded-xl border p-3 focus:outline-none focus:ring"
          rows={3}
          placeholder="Topic or event announcement…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={postTopic}
          className="mt-3 rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
          disabled={!text.trim()}
        >
          Post
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="rounded-2xl bg-white p-4 shadow">
            <p className="text-sm text-gray-500">
              {p.type === "event" ? "Event" : "Topic"}
            </p>
            <p className="mt-1">{p.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
