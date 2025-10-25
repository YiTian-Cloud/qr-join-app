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

 // 2) Persist joined state for future renders (works across refresh/PWA)
  cookies().set("joined", "1", { path: "/", maxAge: 60 * 60 * 24 * 7 }); // 7 days


  // 3) Redirect to canonical /join (no query needed anymore)
  redirect("/join");
}
export async function postAnnouncement(formData: FormData) {
  const message = String(formData.get("message") ?? "").trim();
  const name    = String(formData.get("name") ?? "").trim(); // optional field in the form

  if (!message) {
    redirect("/join?joined=1"); // nothing to post; just return to joined page
  }

  // Use the SAME DB client you used for saveMember.
  // Example using Firestore (Admin SDK):
  // await db.collection("announcements").add({
  //   message,
  //   name: name || "Anonymous",
  //   createdAt: new Date()
  // });

 // Keep user in "joined" state
  cookies().set("joined", "1", { path: "/", maxAge: 60 * 60 * 24 * 7 });
   // 3) Redirect to canonical /join (no query needed anymore)
  redirect("/join");
}