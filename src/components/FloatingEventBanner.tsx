"use client";

import Link from "next/link";

const event = {
  title: "Thanksgiving Golf Clinic",
  dateLabel: "Sun, Nov 30, 2025 · 1:00–3:00 PM",
  shortDescription: "Free clinic on the putting green, driving range, and chipping area.",
  href: "/events/thanksgiving-clinic", // 👈 updated route
};

export default function FloatingEventBanner() {
  return (
    <Link href={event.href} className="block w-full">
      <div className="rounded-xl border bg-white shadow-sm p-3 flex flex-col gap-1 h-full">
        <span className="text-xs font-semibold text-green-700 uppercase">
          Upcoming Event
        </span>
        <span className="text-sm font-semibold">{event.title}</span>
        <span className="text-xs text-gray-600">{event.dateLabel}</span>
        <span className="text-xs text-gray-700">
          {event.shortDescription}
        </span>
        <span className="mt-1 text-xs font-semibold text-blue-600">
          View details →
        </span>
      </div>
    </Link>
  );
}
