This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Golf Join App (QR Join)

**Live demo:** [https://qr-join-app-lcqd.vercel.app/](https://qr-join-app-lcqd.vercel.app/)

A tiny Next.js app to let golfers (or any group) join by scanning a QR code. Members submit **Name / Phone / Email**, get a brief **welcome + announcements** view, and the **QR stays visible** so others can join right away. Works great as a **PWA** on iOS/Android.

---

## ✨ Features

* Generates a **QR code** that links to `/join` (useful for posters or on-course meetups)
* Simple **join form** → stored in **Firebase Firestore**
* **Welcome + announcements** after joining
* **Cookie-based session** so the joined state persists
* **“Add another person”** one-click reset
* **Installable PWA** (icons/manifest) for home-screen launch

---

## 🧱 Tech Stack

* **Frontend/Backend:** Next.js 15 (App Router) + Server Actions
* **Database:** Firebase Firestore
* **Styling:** Tailwind CSS
* **Hosting:** Vercel
* **PWA:** Web App Manifest + Service Worker

---

## 🚀 Quick Start

```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev
# open http://localhost:3000
```

Create a `.env.local` in the project root with:

```bash
# Firebase client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Canonical production URL (used to generate the QR)
NEXT_PUBLIC_BASE_URL=https://qr-join-app-lcqd.vercel.app
```

> Tip: `NEXT_PUBLIC_BASE_URL` ensures the QR always points to **prod**, not preview builds.

---

## 📁 Project Layout

```
src/
  app/
    page.tsx                # Home (QR + join/after-join views)
    join/page.tsx           # Joins route (renders same HomePage)
    announcements/page.tsx  # Announcements list
    actions.ts              # saveMember, postAnnouncement, resetJoined
    manifest.ts             # PWA manifest (start_url="/join")
    layout.tsx              # Root layout + ClientInit
  components/
    ClientInit.tsx          # Initialize Firebase on client
    RedirectPWAHomeToJoin.tsx  # Ensure PWA opens at /join
    QRDisplay.tsx           # Renders QR for the join URL
  public/icons/             # 192x192, 512x512 PWA icons
  globals.css               # Tailwind styles
```

---

## 🔁 How It Works (flow)

1. **Home** renders a QR using `NEXT_PUBLIC_BASE_URL` → points to **`/join`**.
2. Golfer **scans QR** → opens **/join** and submits Name/Phone/Email.
3. **Server Action** saves to Firestore, sets a `joined=1` cookie, redirects.
4. With the cookie, page shows **welcome + announcements**, while **QR stays visible**.
5. **Add another person** clears cookie to collect the next member.

---

## 📲 PWA Notes

* `manifest.ts` uses `start_url: "/join"` so home‑screen launches into the join flow.
* If iOS caching gets sticky after big updates, remove/re-add the home‑screen icon.

---

## 📦 Deploy (Vercel)

1. Link the repo in Vercel.
2. Add the env vars in **Project → Settings → Environment Variables**.
3. Deploy from `main` or run:

   ```bash
   vercel --prod
   ```

Verify the **QR target URL** shows your **production domain**.

---

## 🪪 License

MIT © 2025 Yi Tian
