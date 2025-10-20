"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, db } from "../lib/firebase";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import QRCode from "react-qr-code";

export default function Home() {
  const [uid, setUid] = useState<string | null>(null);
  const [groupName, setGroupName] = useState("");
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null); // NEW: remember created group id

  // ensure we have a user (anonymous ok)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        const res = await signInAnonymously(auth);
        setUid(res.user.uid);
      } else {
        setUid(u.uid);
      }
    });
    return () => unsub();
  }, []);

  const joinUrl = useMemo(() => {
    if (!inviteCode) return "";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/join/${inviteCode}`;
  }, [inviteCode]);

  const createGroup = async () => {
    if (!groupName.trim() || !uid) return;
    // 1) create the group
    const gRef = await addDoc(collection(db, "groups"), {
      name: groupName.trim(),
      ownerId: uid,
      createdAt: serverTimestamp(),
    });
    setGroupId(gRef.id); // NEW: store for "View members" link

    // 2) make a short invite code from the id
    const code = gRef.id.slice(-6).toUpperCase();
    await setDoc(doc(db, "invites", code), {
      groupId: gRef.id,
      createdAt: serverTimestamp(),
      active: true,
    });
    setInviteCode(code);
  };

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Create a group + share the QR</h1>

      <div className="rounded-2xl bg-white p-4 shadow">
        <label className="block text-sm font-medium mb-2">Group name</label>
        <input
          className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="e.g., Bay Area Hikers"
        />
        <button
          onClick={createGroup}
          className="mt-3 rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
          disabled={!groupName.trim() || !uid}
        >
          Create
        </button>
      </div>

      {inviteCode && (
        <div className="mt-6 rounded-2xl bg-white p-4 shadow">
          <p className="mb-2 text-sm">Invite code</p>
          <p className="mb-4 text-3xl font-bold tracking-widest">{inviteCode}</p>

          <div className="mx-auto w-full flex justify-center bg-white p-4">
            <QRCode value={joinUrl} size={192} />
          </div>

          <p className="mt-4 break-all text-sm text-gray-600">{joinUrl}</p>

          {/* NEW: quick actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => navigator.clipboard?.writeText(joinUrl)}
              className="rounded-xl bg-gray-800 px-3 py-2 text-white"
            >
              Copy join link
            </button>
            <a
              href={`/invite/${inviteCode}`}
              className="rounded-xl bg-black px-3 py-2 text-white"
            >
              Open full-screen QR
            </a>
            {groupId && (
              <a
                href={`/group/${groupId}`}
                className="rounded-xl bg-gray-700 px-3 py-2 text-white"
              >
                View members
              </a>
            )}
            <a
              href="/me"
              className="rounded-xl bg-gray-600 px-3 py-2 text-white"
            >
              My Groups
            </a>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Print or share this QR. Scanning it opens your join page.
          </p>
        </div>
      )}
    </main>
  );
}
