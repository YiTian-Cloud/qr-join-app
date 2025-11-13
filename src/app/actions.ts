/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/actions.ts
"use server";

import { db } from "@/lib/firebaseAdmin";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function saveMember(formData: FormData) {
  const name  = String(formData.get("name")  || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();

  if (!name || !phone || !email) {
    // minimal guard; you can add better validation later
    redirect("/?joined=1");
  }

  await db.collection("members").add({
    name,
    phone,
    email,
    createdAt: Date.now(),
  });

  // Persist joined state for future renders (works across refresh/PWA)
  cookies().set("joined", "1", { path: "/", maxAge: 60 * 60 * 24 * 7 }); // 7 days

  // Redirect to canonical /join (no query needed anymore)
  redirect("/join");
}

export async function postAnnouncement(formData: FormData) {
  const message = String(formData.get("message") ?? "").trim();
  const name    = String(formData.get("name") ?? "").trim(); // optional

  if (!message) {
    redirect("/join?joined=1"); // nothing to post; just return to joined page
  }

  // ✅ Actually save announcement to Firestore
  await db.collection("announcements").add({
    message,
    name: name || "Anonymous",
    createdAt: new Date(),          // Firestore Timestamp (via Admin SDK)
  });

  // Keep user in "joined" state
  cookies().set("joined", "1", { path: "/", maxAge: 60 * 60 * 24 * 7 });

  // Redirect back to /join (joined view)
  redirect("/join");
}

// ---- New: helper to fetch announcements for /announcements page ----

// ---- New: helper to fetch announcements for /announcements page ----

export type Announcement = {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
};

import type { Timestamp } from "firebase-admin/firestore";

type AnnouncementDoc = {
  name?: string;
  message?: string;
  createdAt?: Timestamp | number | null;
};

export async function getAnnouncements(): Promise<Announcement[]> {
  const snapshot = await db
    .collection("announcements")
    .orderBy("createdAt", "desc")
    .limit(100)
    .get();

  const announcements: Announcement[] = snapshot.docs.map((doc) => {
    const data = doc.data() as AnnouncementDoc;
    const raw = data.createdAt;

    let createdAt: Date;
    if (raw && typeof (raw as Timestamp).toDate === "function") {
      createdAt = (raw as Timestamp).toDate();
    } else if (typeof raw === "number") {
      createdAt = new Date(raw);
    } else {
      createdAt = new Date(0);
    }

    return {
      id: doc.id,
      name: data.name ?? "Anonymous",
      message: data.message ?? "",
      createdAt,
    };
  });

  return announcements;
}
