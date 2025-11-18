import Link from "next/link";
import QRDisplay from "../../QRDisplay";

export default function ThanksgivingClinicPage() {
  // QR should route back to main join page
  const rawBase =
    process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.length > 0
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "";

  const base = rawBase.replace(/\/+$/, "");
  const qrValue = `${base}/join`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50">
      <div className="mx-auto max-w-3xl px-4 py-6 space-y-4">

        {/* Top row: title pill + Home link */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-sm font-semibold tracking-wide text-emerald-700">
          {/* Left: icon + label */}
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-lg">
              ⛳
            </span>
            <span className="text-sm md:text-base">
            The Villages Golf & Country Club · Junior Golf Clinic
            </span>
          </div>

          {/* Right: Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 transition text-sm"
          >
            <span className="text-lg leading-none">←</span>
            <span>Home</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-md backdrop-blur">

          {/* Top Time & Location Banner */}
          <div className="bg-emerald-600 text-white text-center px-4 py-5">
            <div className="text-base md:text-lg font-semibold tracking-wide">
              Sunday · Nov 30, 2025
            </div>
            <div className="text-2xl md:text-3xl font-extrabold mt-1">
              1:00 PM – 3:00 PM
            </div>
            <div className="text-sm md:text-base mt-2 font-medium text-emerald-100">
              Putting Green · Driving Range
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">

            {/* Title */}
            <header className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Thanksgiving Golf Clinic – Villages GCC
              </h1>
            </header>

            {/* Description */}
            <section className="space-y-3 text-base md:text-lg text-gray-800 leading-relaxed">
              <p>
                Join us for a relaxed, community-focused golf clinic Villages GCC. We’ll spend time on the driving range, putting green,
                and finish with some fun chipping practice.
              </p>

              <p>
                <span className="font-semibold">Host:&nbsp;</span>
                Ethan Yin — a passionate Villages GCC Junior Program honoree
                and Leland High School’s #1-seeded sophomore, excited to give back
                and support fellow Villages golfers.
              </p>

              <p>
                <span className="font-semibold">Co-host:&nbsp;</span>
                Maximus Choi — a nationally ranked junior golfer, PGA Jr. League leader, future Division 1 prospect, and highly accomplished competitive pianist.
              </p>
            </section>

            {/* Clinic Outline + QR */}
            <div className="flex flex-col md:flex-row gap-8">

              {/* Left: Outline */}
              <section className="flex-1 space-y-3 text-base md:text-lg text-gray-800 leading-relaxed">
                <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-base">
                    🏌️‍♂️
                  </span>
                  Clinic Outline
                </h2>

                <ul className="list-disc list-inside space-y-1.5">
                  <li>Warm-up and basics at the driving range</li>
                  <li>Putting drills and speed control practice</li>
                  <li>Short-game and chipping techniques</li>
                  <li>Q&amp;A and casual hangout at the end</li>
                </ul>
              </section>

              {/* Right: QR Code */}
              <section className="flex-1 flex flex-col items-center gap-3">
                <h3 className="text-base md:text-lg font-semibold text-emerald-700">
                  Share This Event
                </h3>

                <div className="border rounded-2xl p-4 bg-white shadow-sm">
                  <QRDisplay value={qrValue} />
                </div>

                <p className="text-xs md:text-sm text-gray-600 break-all text-center">
                  {qrValue}
                </p>
              </section>
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-4 py-6">
  <div className="
    w-full
    bg-emerald-100 
    border border-emerald-200
    rounded-xl 
    flex items-center gap-3 
    px-4 py-3 
    shadow-sm
  ">
    <span className="text-2xl">🏌️‍♀️</span>
    <p className="text-base md:text-lg font-semibold text-emerald-800 leading-snug">
      All Villages golfers welcome. Free event — bring your clubs and enthusiasm!
    </p>
  </div>
</div>

        </div>


        {/* Bottom message - clean, roomy, senior-friendly */}


      </div>
    </main>
  );
}
