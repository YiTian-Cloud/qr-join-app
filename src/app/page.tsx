export const revalidate = false;

import { headers } from "next/headers";
import Link from "next/link";
import QRDisplay from "./QRDisplay";
import { saveMember, postAnnouncement } from "./actions";
import RedirectPWAHomeToJoin from "../components/RedirectPWAHomeToJoin"; // keep this if you added it

function getBaseUrlFromHeaders() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : "";
}

type PageProps = { searchParams?: { joined?: string } };

export default function HomePage({ searchParams }: PageProps) {
  const rawBase =
    process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.length > 0
      ? process.env.NEXT_PUBLIC_BASE_URL
      : getBaseUrlFromHeaders();

  const base = rawBase.replace(/\/+$/, ""); // normalize trailing slash
  const qrValue = base ? `${base}/join` : "";
  const joined = searchParams?.joined === "1";

  return (
    <>
      <RedirectPWAHomeToJoin />
      <main className="mx-auto max-w-xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Golf Community — Join</h1>

        {/* QR ALWAYS visible so next friend can scan */}
        <section className="space-y-2">
          <QRDisplay value={qrValue} />
          <div className="text-xs text-gray-500 break-all">
            URL: {qrValue || "(no host detected)"}
          </div>
        </section>

        {joined ? (
          <div className="space-y-4">
            <div className="rounded-md border p-4 bg-green-50 text-green-700">
              <strong>Welcome to our golf community!</strong>
            </div>

            {/* Quick post box */}
            <form action={postAnnouncement} className="space-y-2 rounded-md border p-4">
              <div className="text-sm font-medium">Post a message</div>
              <input
                name="name"
                placeholder="Your name (optional)"
                className="w-full rounded-md border px-3 py-2"
              />
              <textarea
                name="message"
                required
                rows={3}
                placeholder="Share a quick hello or update..."
                className="w-full rounded-md border px-3 py-2"
              />
              <button type="submit" className="rounded-md bg-black px-4 py-2 text-white">
                Post
              </button>
            </form>

            {/* Link to announcements feed */}
            <div>
              <Link href="/announcements" className="underline text-blue-600">
                View announcements
              </Link>
            </div>
          </div>
        ) : (
          /* Original join form */
          <form action={saveMember} className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input id="name" name="name" required className="w-full rounded-md border px-3 py-2" />
            </div>
            <div className="space-y-1">
              <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
              <input id="phone" name="phone" required className="w-full rounded-md border px-3 py-2" />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input id="email" name="email" type="email" required className="w-full rounded-md border px-3 py-2" />
            </div>
            <button type="submit" className="rounded-md bg-black px-4 py-2 text-white">Save</button>
          </form>
        )}
      </main>
    </>
  );
}
