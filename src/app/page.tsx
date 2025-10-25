// src/app/page.tsx
export const revalidate = false;
import RedirectPWAHomeToJoin from "../components/RedirectPWAHomeToJoin";
import { headers } from "next/headers";
import QRDisplay from "./QRDisplay";
import { saveMember } from "./actions";



function getBaseUrlFromHeaders() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : "";
}

type PageProps = { searchParams?: { joined?: string } };

export default function HomePage({ searchParams }: PageProps) {
  // Prefer env in production if you want to force a canonical domain;
  // otherwise compute dynamically from headers (works on preview and prod).
  const base =
    process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.length > 0
      ? process.env.NEXT_PUBLIC_BASE_URL
      : getBaseUrlFromHeaders();

  const qrValue = base ? `${base}/join` : "";
  const joined = searchParams?.joined === "1";

  return (
     <RedirectPWAHomeToJoin />  {/* ← add this line */}
    <main className="mx-auto max-w-xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Golf Community — Join</h1>

      <section className="space-y-2">
        <QRDisplay value={qrValue} />
        <div className="text-xs text-gray-500 break-all">URL: {qrValue || "(no host detected)"}</div>
      </section>

      {joined ? (
        <div className="rounded-md border p-4 bg-green-50 text-green-700">
          <strong>Welcome to our golf community!</strong>
        </div>
      ) : (
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
  );
}
