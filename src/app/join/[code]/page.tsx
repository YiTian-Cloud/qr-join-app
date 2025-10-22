"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase.client"; 
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  type Timestamp,
} from "firebase/firestore";

type InviteDoc = { groupId: string; createdAt?: Timestamp | null; active?: boolean };
type GroupDoc = { name: string };

export default function Join() {

  // 1) Router
  const router = useRouter();

  // 2) Create singletons from your client helpers (memoized so they don't recreate on re-renders)
  const auth = useMemo(getFirebaseAuth, []);
  const db   = useMemo(getFirebaseDb, []);

  // read dynamic route /join/[code]
  const params = useParams<{ code: string | string[] }>();
  const raw = Array.isArray(params?.code) ? params.code[0] : params?.code ?? "";
  const code = raw.toUpperCase();

  // auth & group state
  const [uid, setUid] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState<string>("…");
  const [invalid, setInvalid] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [joining, setJoining] = useState(false);

  const joinDisabled = !name.trim() || !uid || !groupId || joining;

  const groupUrl = useMemo(
    () => (groupId ? `/group/${groupId}` : "#"),
    [groupId]
  );

  // Ensure we have a (anonymous) user
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

  // Resolve invite code -> group, fetch name
  useEffect(() => {
    if (!code) return;
    (async () => {
      const invSnap = await getDoc(doc(db, "invites", code));
      if (!invSnap.exists()) {
        setInvalid(true);
        setGroupName("Invalid invite code");
        return;
      }
      const inv = invSnap.data() as InviteDoc;
      const gid = inv.groupId;
      setGroupId(gid);

      const gSnap = await getDoc(doc(db, "groups", gid));
      if (gSnap.exists()) {
        const g = gSnap.data() as GroupDoc;
        setGroupName(g.name || "Group");
      } else {
        setGroupName("Group");
      }
    })();
  }, [code]);

  // If already a member, auto-redirect to the group page
  useEffect(() => {
    if (!uid || !groupId) return;
    (async () => {
      const mSnap = await getDoc(doc(db, "members", `${uid}_${groupId}`));
      if (mSnap.exists()) {
        window.location.href = `/group/${groupId}`;
      }
    })();
  }, [uid, groupId]);

  const handleJoin = async () => {
    if (joinDisabled) return;
    setJoining(true);
    try {
      // Create/overwrite membership doc with contact info
      await setDoc(doc(db, "members", `${uid!}_${groupId!}`), {
        uid,
        groupId,
        displayName: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        joinedAt: serverTimestamp(),
        role: "member",
      });

      // (Optional) also store a profile doc by uid (handy to reuse later)
      await setDoc(
        doc(db, "profiles", uid!),
        {
          uid,
          displayName: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Go straight to the group page (members + announcements)
      window.location.href = `/group/${groupId}`;
    } finally {
      setJoining(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-2">{groupName}</h1>
      <p className="text-sm text-gray-600 mb-4">
        Invite code: <span className="font-mono">{code}</span>
      </p>

      {invalid ? (
        <div className="rounded-2xl bg-white p-4 shadow">
          <p className="text-sm text-red-600">This invite code is not valid.</p>
          <a href="/" className="mt-3 inline-block text-sm text-blue-600 hover:underline">
            ← Back to Home
          </a>
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-4 shadow">
          <h2 className="font-medium mb-3">Join this group</h2>

          <label className="block text-sm mb-1">Name</label>
          <input
            className="w-full rounded-xl border px-3 py-2 mb-3 focus:outline-none focus:ring"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />

          <label className="block text-sm mb-1">Phone</label>
          <input
            className="w-full rounded-xl border px-3 py-2 mb-3 focus:outline-none focus:ring"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(optional) e.g., +1 415 555 0123"
            inputMode="tel"
          />

          <label className="block text-sm mb-1">Email</label>
          <input
            className="w-full rounded-xl border px-3 py-2 mb-3 focus:outline-none focus:ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="(optional) you@example.com"
            inputMode="email"
          />

          <button
            onClick={handleJoin}
            className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
            disabled={joinDisabled}
          >
            {joining ? "Joining…" : "Join group"}
          </button>

          {groupId && (
            <a
              href={groupUrl}
              className="ml-3 text-sm text-blue-600 hover:underline"
            >
              View group page
            </a>
          )}

          <p className="mt-3 text-xs text-gray-500">
            Your name, phone, and email will be visible to group admins (and
            members if you choose to display it later).
          </p>
        </div>
      )}
    </main>
  );
}
