"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="relative w-full overflow-hidden py-32"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* ── cta-bg.png — the grid dome texture ── */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none select-none"
        style={{ zIndex: 0 }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cta-bg.png"
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        {/* Bottom fade so it blends into page bg */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "60%",
            backgroundImage: "linear-gradient(to bottom, transparent, #0a0a0a)",
          }}
        />
        {/* Left fade */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: "20%",
            backgroundImage: "linear-gradient(to right, #0a0a0a, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "20%",
            backgroundImage: "linear-gradient(to left, #0a0a0a, transparent)",
          }}
        />
      </div>

      {/* ── Violet glow at the top center of the dome ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse at top, rgba(99,60,255,0.55) 0%, transparent 70%)",
          zIndex: 1,
        }}
        aria-hidden
      />

      {/* ── Content ── */}
      <div
        className="relative flex flex-col items-center px-4 text-center sm:px-6 lg:px-8"
        style={{ zIndex: 10 }}
      >
        <h2 className="max-w-2xl text-4xl font-bold text-white sm:text-5xl lg:text-[3.5rem] leading-tight">
          Your next role is
          <br />
          already looking for you
        </h2>

        <p
          className="mt-5 max-w-lg text-sm leading-relaxed sm:text-base"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sign-up"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-white/90 active:scale-95"
          >
            Create a free account
          </Link>
          <Link
            href="/pricing"
            className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/5 active:scale-95"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
