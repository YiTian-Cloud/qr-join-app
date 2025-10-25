// src/app/actions.ts
"use server";

import { db } from "@/lib/firebaseAdmin";
import { redirect } from "next/navigation";

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

  redirect("/?joined=1");
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

  redirect("/join?joined=1");
}