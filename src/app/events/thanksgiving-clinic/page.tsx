import QRDisplay from "../../QRDisplay"; // ⬅️ adjust if path differs
import Link from "next/link";

export default function ThanksgivingClinicPage() {
  const qrValue = `${process.env.NEXT_PUBLIC_BASE_URL}/events/thanksgiving-clinic`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Header pill */}
        <div className="mb-6 flex items-center justify-between text-xs font-semibold tracking-wide text-emerald-700">
  {/* Left side: icon + title */}
  <div className="flex items-center gap-2">
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
      ⛳
    </span>
    <span>Village Country Club · Junior Golf Clinic</span>
  </div>

  {/* Right side: Back to Home link */}
  <Link
    href="/"
    className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 transition text-xs"
  >
    <span className="text-base leading-none">←</span>
    <span>Home</span>
  </Link>
</div>

        {/* Main card */}
        <div className="overflow-hidden rounded-2xl border bg-white/90 shadow-md backdrop-blur">

          {/* Top Time/Location Banner */}
          <div className="bg-emerald-600 text-white text-center px-4 py-4">
            <div className="text-sm font-semibold tracking-wide">
              Sunday · Nov 30, 2025
            </div>
            <div className="text-xl font-bold">1:00 PM – 3:00 PM</div>
            <div className="text-xs mt-1 font-medium text-emerald-100">
              Putting Green · Driving Range
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">

            {/* Main Text */}
            <header className="space-y-1">
              <h1 className="text-2xl font-semibold text-gray-900">
                Thanksgiving Golf Clinic – Village Country Club
              </h1>
            </header>

            <section className="space-y-2 text-sm text-gray-800">
              <p>
                Join us for a relaxed, community-focused golf clinic at the Village
                Country Club. We’ll spend time on the driving range, putting green,
                and finish with some fun chipping practice.
              </p>
              <p>
                <span className="font-semibold">Host:</span>{" "}
                Ethan Yin — a passionate Village Country Club Junior Program honoree 
                and Leland High School’s #1-seeded sophomore, excited to give back 
                and support fellow Village golfers.
              </p>
              <p>
                <span className="font-semibold">Co-host:</span>{" "}
                Max Choi — a rising junior golfer, future Division 1 prospect, and
                a highly accomplished competitive pianist.
              </p>
            </section>

            {/* Clinic Outline + QR Row */}
            <div className="flex flex-col md:flex-row gap-8">

              {/* Left: Clinic Outline */}
              <section className="flex-1 space-y-2 text-sm text-gray-800">
                <h2 className="text-base font-semibold flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs">
                    🏌️‍♂️
                  </span>
                  Clinic Outline
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Warm-up and basics at the driving range</li>
                  <li>Putting drills and speed control practice</li>
                  <li>Short-game and chipping techniques</li>
                  <li>Q&amp;A and casual hangout at the end</li>
                </ul>
              </section>

              {/* Right: QR Code Panel */}
              <section className="flex-1 flex flex-col items-center gap-2">
                <h3 className="text-sm font-semibold text-emerald-700">
                  Share This Event
                </h3>
                <div className="border rounded-xl p-3 bg-white shadow-sm">
                  <QRDisplay value={qrValue} />
                </div>
                <p className="text-xs text-gray-500 break-all text-center">
                  {qrValue}
                </p>
              </section>

            </div>
          </div>

          {/* Bottom Horizontal Golf Graphic */}
          <div className="relative h-32 w-full overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-500 to-lime-400">
            <div className="absolute bottom-0 left-[10%] h-20 w-40 rounded-full bg-emerald-800/50 blur-xl" />
            <div className="absolute bottom-0 right-[10%] h-20 w-48 rounded-full bg-emerald-600/50 blur-xl" />

            <div className="absolute inset-x-0 bottom-6 flex justify-center">
              <div className="relative h-16 w-32">
                <div className="absolute bottom-0 left-1/2 h-3 w-12 -translate-x-1/2 rounded-full bg-black/30" />
                <div className="absolute bottom-3 left-1/2 h-12 w-1 -translate-x-1/2 bg-white" />
                <div className="absolute bottom-12 left-1/2 -translate-x-[2px] h-6 w-8 rounded-r-sm bg-amber-300 shadow-sm" />
                <div className="absolute bottom-3 left-[55%] h-4 w-4 rounded-full bg-white shadow-lg" />
              </div>
            </div>
          </div>

          {/* Footer callout */}
          <div className="border-t bg-emerald-50/80 px-6 py-4 md:px-8">
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-800">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white">
                🏌️‍♀️
              </span>
              All Village golfers welcome. Free event — bring your clubs and enthusiasm!
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
