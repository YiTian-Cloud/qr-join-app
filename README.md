This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🌟 Features

✅ Generate & display a QR code linking to `/join`  
✅ Join a community with **Name / Phone / Email**  
✅ Store members & announcements in **Firebase Firestore**  
✅ Show persistent QR on top for others to scan  
✅ **Welcome banner + post box** for announcements after joining  
✅ Works as an **installable PWA** on iPhone & Android  
✅ Cookie-based session so “joined” state persists across refreshes  
✅ One-click “Add another person” resets the form

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | **Next.js 15 (App Router)** | UI, routing, server actions |
| Backend | **Next.js Server Actions** | Secure form handling |
| Database | **Firebase Firestore** | Members + announcements |
| Hosting | **Vercel** | Build & deploy |
| Styling | **Tailwind CSS** | Responsive UI |
| PWA | **Web App Manifest + Service Worker** | Home-screen install |

---

## ⚙️ 1. Setup Instructions

### 🔹 Prerequisites
- Node.js 18+  
- npm or pnpm  
- Firebase project (Firestore enabled)  
- Vercel account (for deployment)  

### 🔹 Clone the repository
```bash
git clone https://github.com/<your-username>/qr-groups.git
cd qr-groups
🔹 Install dependencies
bash

npm install
🔹 Add environment variables
Create a .env.local file in the project root:

bash

# Firebase client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=qr-groups.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=qr-groups
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=qr-groups.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcd1234

# Production base URL (your deployed app)
NEXT_PUBLIC_BASE_URL=https://qr-join-app-xxxx.vercel.app
💡 NEXT_PUBLIC_BASE_URL ensures the QR always points to your Production domain, not a preview build.

🔹 Run locally
bash

npm run dev
Visit http://localhost:3000.

🧩 2. File Structure
bash

src/
├── app/
│   ├── page.tsx                 # Home page (QR + join form + welcome view)
│   ├── join/page.tsx            # Same as / (renders HomePage)
│   ├── announcements/page.tsx   # Announcements feed
│   ├── actions.ts               # Server actions (saveMember, postAnnouncement, resetJoined)
│   ├── manifest.ts              # PWA manifest (start_url="/join")
│   └── layout.tsx               # Root layout + ClientInit
│
├── components/
│   ├── ClientInit.tsx           # Loads Firebase client on browser
│   ├── RedirectPWAHomeToJoin.tsx# Redirect "/"→"/join" for PWA startup
│   └── QRDisplay.tsx            # Renders QR from the join URL
│
├── lib/
│   ├── firebase.client.ts       # Firebase Web SDK init
│   └── firebase.admin.ts        # (optional) Admin SDK for server writes
│
├── public/icons/                # PWA icons (192×192, 512×512)
├── globals.css                  # Tailwind styles
└── tsconfig.json
🔄 3. Function Flow
A. Page load
layout.tsx → renders <ClientInit /> → runs firebase.client.ts

page.tsx → displays the QR (built from NEXT_PUBLIC_BASE_URL)

The QR links to /join

B. User joins
Scans QR → opens /join

Fills Name / Phone / Email

form action={saveMember} → Server Action

Saves data to Firestore

Sets joined=1 cookie

Redirects /join

C. After join
Cookie causes page to render “joined” view:

✅ QR still visible

✅ “Welcome to our golf community” banner

✅ Post box → postAnnouncement server action

✅ Link → /announcements

D. View announcements
/announcements fetches Firestore docs and lists posts chronologically.

E. Reset
“Add another person” form → resetJoined() → clears cookie → reloads blank join form.

🧭 4. PWA Behavior
manifest.ts

ts

start_url: "/join",
scope: "/",
display: "standalone"
On Home-Screen launch, PWA opens /join

RedirectPWAHomeToJoin.tsx ensures any / route also lands on /join

Works offline (via Vercel service worker cache)

Safari users: if major updates occur, delete/re-add the Home-Screen icon to refresh cache.

🔐 5. Environment Variables (Summary)
Variable	Purpose
NEXT_PUBLIC_FIREBASE_API_KEY	Firebase client key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN	Firebase domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID	Firestore project ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET	File storage bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID	Messaging sender ID
NEXT_PUBLIC_FIREBASE_APP_ID	Firebase App ID
NEXT_PUBLIC_BASE_URL	Canonical production URL (for QR)

🚀 6. Deployment (Vercel)
One-time
Link repo:

bash

vercel link
Add env vars via Vercel → Project → Settings → Environment Variables

Deploy
Option A — Auto deploy when you push to GitHub main

Option B — Manual

bash

vercel --prod
✅ Always verify the small “URL:” under your QR after deployment points to the Production domain (not a preview).

🧰 7. Local Development Tips
Run serverless logs: vercel logs <deployment-url>

Run lint/format:

bash

npm run lint
npx black .  # if using Python-style formatting tools
Debug server actions: add console.log() in actions.ts — view logs in Vercel → Functions → Logs

💡 8. Common iPhone / Safari Issues
Issue	Cause	Fix
“Vercel Authentication Required”	Scanned a preview deployment URL	Use production NEXT_PUBLIC_BASE_URL
Page resets to join form after submit	Query param lost on iOS refresh	Fixed via cookie (joined state)
New friend sees announcements (old cookie)	Shared phone retains cookie	“Add another person” button clears it
Home-Screen opens wrong page	Manifest start_url not /join	Ensure manifest.ts sets start_url="/join"

🧠 9. Future Enhancements
Area	Enhancement
Firestore	Grouped collections: groups/{id}/members
Auth	Optional Firebase Auth for admins
Admin	/admin dashboard listing members
PWA	Push notifications for new announcements
UI	Responsive QR & theme customization

🪪 10. License
MIT License © 2025 [Yi Tian]

🧩 Appendix — Dev Commands
bash

# Run locally
npm run dev

# Build production bundle
npm run build

# Run production locally
npm start

# Run tests (if added)
npm test
Maintainer note:
Keep .env.local out of version control (.gitignore includes it).
Always use redirect("/join") after saving members; the cookie tracks joined state for reliability on iOS.
