"use client"; // <-- add this

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50 print:bg-white print:text-black">
      <div className="mx-auto max-w-3xl lg:max-w-4xl xl:max-w-5xl print:w-[800px] px-4 py-6 space-y-4 print:space-y-2">
        {/* Top row: title pill + Home link + Print button */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-sm font-semibold tracking-wide text-emerald-700 print:text-black">
          {/* Left: icon + label */}
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-lg">
              ⛳
            </span>
            <span className="text-sm md:text-base">
              The Villages Golf & Country Club · Junior Golf Clinic
            </span>
          </div>

          {/* Right: Home + Print */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 transition text-sm print:hidden"
            >
              <span className="text-lg leading-none">←</span>
              <span>Home</span>
            </Link>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 rounded-full border border-emerald-600 px-3 py-1.5 text-xs md:text-sm text-emerald-700 hover:bg-emerald-50 transition print:hidden"
            >
              🖨️ <span>Print as PDF</span>
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-md backdrop-blur print:shadow-none print:border print:border-gray-300">
          {/* Top Time & Location Banner */}
          <div className="bg-emerald-600 text-white text-center px-4 py-5 print:py-3">
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

          <div className="p-6 md:p-8 space-y-6 print:p-4 print:space-y-4">
            {/* Title */}
            <header className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Thanksgiving Golf Clinic – Villages GCC
              </h1>
            </header>

            {/* Description */}
            <section className="space-y-3 text-base md:text-lg text-gray-800 leading-relaxed print:text-sm print:leading-snug">
              <p>
                Join us for a relaxed, community-focused golf clinic Villages GCC. We’ll
                spend time on the driving range, putting green, and finish with some fun
                chipping practice.
              </p>

              <p>
                <span className="font-semibold">Host:&nbsp;</span>
                Ethan Yin — a passionate Villages GCC Junior Program honoree and Leland
                High School’s #1-seeded sophomore, excited to give back and support
                fellow Villages golfers.
              </p>

              <p>
                <span className="font-semibold">Co-host:&nbsp;</span>
                Maximus Choi — a nationally ranked junior golfer, PGA Jr. League leader,
                future Division 1 prospect, and highly accomplished competitive pianist.
              </p>
            </section>

            {/* Clinic Outline + QR */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Left: Outline */}
              <section className="w-full md:w-2/3 space-y-3 text-base md:text-lg text-gray-800 leading-relaxed print:text-sm print:leading-snug">
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
              <section className="w-full md:w-1/3 flex flex-col items-center gap-3">
                <h3 className="text-base md:text-lg font-semibold text-emerald-700">
                  Share This Event
                </h3>

                <div className="border rounded-xl p-2 bg-white shadow-sm print:shadow-none print:p-1">
  <div className="scale-75 origin-center print:scale-60">
    <QRDisplay value={qrValue} />
  </div>
</div>


                <p className="text-xs md:text-sm text-gray-600 break-all text-center print:text-[11px]">
                  {qrValue}
                </p>
              </section>
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-4 py-4 print:px-2 print:py-1">
  <div
    className="
      w-full
      bg-emerald-100 
      border border-emerald-200
      rounded-lg 
      flex items-center gap-2 
      px-3 py-2 
      shadow-sm
      print:shadow-none
    "
  >
    {/* Hide emoji when printing to save vertical + horizontal space */}
    <span className="text-2xl print:hidden">🏌️‍♀️</span>
    <p className="text-sm md:text-base font-semibold text-emerald-800 leading-snug print:text-[11px]">
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
