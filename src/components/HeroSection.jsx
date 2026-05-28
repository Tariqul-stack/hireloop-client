"use client";

import {
  Magnifier,
  GeoPin,
  Briefcase,
  ChartColumn,
  Persons,
  StarFill,
} from "@gravity-ui/icons";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

const stats = [
  {
    icon: <Briefcase className="h-5 w-5 text-white/60" />,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: <ChartColumn className="h-5 w-5 text-white/60" />,
    value: "12K",
    label: "Companies",
  },
  {
    icon: <Persons className="h-5 w-5 text-white/60" />,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: <StarFill className="h-5 w-5 text-white/60" />,
    value: "97%",
    label: "Satisfication Rate",
  },
];

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* ── Globe image ──
          Using a regular <img> tag with width:100% so the image
          renders at full natural height — no cropping, no fill.
          The image is positioned absolutely from the top so the
          planet body (which sits in the lower half of the portrait image)
          naturally falls into the lower portion of the hero section.
      */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none select-none"
        style={{ zIndex: 0, marginTop: "-15%" }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/globe.png"
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "250px",
            backgroundImage: "linear-gradient(to bottom, transparent, #0a0a0a)",
          }}
        />
        {/* Left edge fade */}
        <div
          className="absolute inset-y-0 left-0 w-32"
          style={{
            backgroundImage: "linear-gradient(to right, #0a0a0a, transparent)",
          }}
        />
        {/* Right edge fade */}
        <div
          className="absolute inset-y-0 right-0 w-32"
          style={{
            backgroundImage: "linear-gradient(to left, #0a0a0a, transparent)",
          }}
        />
      </div>

      {/* ── Text content ── */}
      <div
        className="relative flex flex-col items-center px-4 pt-20 pb-0 text-center sm:px-6 lg:px-8"
        style={{ zIndex: 10 }}
      >
        {/* Badge */}
        <div
          className="relative mb-8 flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-xs tracking-widest text-white/70 uppercase"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="absolute right-full mr-3 h-px w-20 bg-gradient-to-l from-white/25 to-transparent"
            aria-hidden
          />
          <span>💼</span>
          <span>
            <span className="font-bold text-white">50,000+</span> NEW JOBS THIS
            MONTH
          </span>
          <span
            className="absolute left-full ml-3 h-px w-20 bg-gradient-to-r from-white/25 to-transparent"
            aria-hidden
          />
        </div>

        {/* Heading */}
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          Find Your Dream Job Today
        </h1>

        {/* Subheading */}
        <p
          className="mt-5 max-w-xl text-sm leading-relaxed sm:text-base"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <div
          className="mt-10 flex w-full max-w-2xl items-center rounded-full border border-white/15 px-5 py-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Magnifier className="h-4 w-4 shrink-0 text-white/40" />
          <input
            type="text"
            placeholder="Job title, skill or company"
            className="flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder:text-white/35 outline-none"
          />
          <div className="h-5 w-px bg-white/20 mx-1" aria-hidden />
          <GeoPin className="h-4 w-4 shrink-0 text-white/40 ml-3" />
          <input
            type="text"
            placeholder="Location or Remote"
            className="flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder:text-white/35 outline-none"
          />
          <button
            aria-label="Search jobs"
            className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white transition-all hover:bg-violet-500 active:scale-95"
          >
            <Magnifier className="h-4 w-4" />
          </button>
        </div>

        {/* Trending positions */}
        <div
          className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <span>Trending Position</span>
          {trendingPositions.map((pos) => (
            <button
              key={pos}
              className="rounded-full border border-white/15 px-3 py-1 text-xs transition-colors hover:border-violet-500/50 hover:text-white"
              style={{
                backgroundColor: "rgba(0,0,0,0.25)",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      {/* ── Globe overlay text ── */}
      <div
        className="relative flex w-full items-center justify-center px-4 text-center"
        style={{ zIndex: 10, marginTop: "18vw" }}
      >
        <p
          className="text-xl font-light sm:text-2xl lg:text-5xl"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          Assisting over{" "}
          <span className="font-semibold text-5xl text-white">
            15,000 job seekers
          </span>
          <br />
          find their dream positions.
        </p>
      </div>

      {/* ── Stats cards ── */}
      <div
        className="relative mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 pb-16 sm:px-6 lg:grid-cols-4 lg:px-8"
        style={{ zIndex: 10, marginTop: "12vw" }}
      >
        {stats.map(({ icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col gap-6 rounded-2xl border border-white/8 p-5"
            style={{
              backgroundColor: "rgba(17,17,17,0.92)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span>{icon}</span>
            <div>
              <p className="text-4xl font-bold text-white">{value}</p>
              <p
                className="mt-1 text-sm"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
