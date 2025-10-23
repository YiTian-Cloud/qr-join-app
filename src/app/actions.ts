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
    redirect("/?joined=0");
  }

  await db.collection("members").add({
    name,
    phone,
    email,
    createdAt: Date.now(),
  });

  redirect("/?joined=1");
}
