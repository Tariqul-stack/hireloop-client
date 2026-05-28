"use client";

import Link from "next/link";
import { GeoPin, Suitcase, CircleDollar, ArrowRight } from "@gravity-ui/icons";

// Static data — will be replaced with API/backend fetch later
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
    href: "/jobs/1",
  },
  {
    id: 2,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
    href: "/jobs/2",
  },
  {
    id: 3,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
    href: "/jobs/3",
  },
  {
    id: 4,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
    href: "/jobs/4",
  },
  {
    id: 5,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
    href: "/jobs/5",
  },
  {
    id: 6,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
    href: "/jobs/6",
  },
];

function JobCard({ job }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white/8 bg-[#1a1a1a] p-6 transition-all hover:border-white/15 hover:bg-[#1f1f1f]">
      {/* Top */}
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-white">{job.title}</h3>
        <p className="text-sm text-white/40 leading-relaxed">
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {/* Location */}
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
            <GeoPin className="h-3.5 w-3.5 text-violet-400" />
            {job.location}
          </span>

          {/* Type */}
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
            <Suitcase className="h-3.5 w-3.5 text-violet-400" />
            {job.type}
          </span>

          {/* Salary */}
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
            <CircleDollar className="h-3.5 w-3.5 text-violet-400" />
            {job.salary}
          </span>
        </div>
      </div>

      {/* Apply Now */}
      <div className="mt-8">
        <Link
          href={job.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white group"
        >
          Apply Now
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default function JobDiscoverySection() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center text-center gap-4">
          {/* Label */}
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
            <span className="h-1 w-1 rounded-full bg-violet-500" aria-hidden />
            SMART JOB DISCOVERY
            <span className="h-1 w-1 rounded-full bg-violet-500" aria-hidden />
          </div>

          {/* Heading */}
          <h2 className="max-w-lg text-4xl font-bold text-white sm:text-5xl leading-tight">
            The roles you&apos;d never find by searching
          </h2>
        </div>

        {/* Job cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* CTA button */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/jobs"
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 transition-all hover:bg-white/90 active:scale-95"
          >
            View all job open
          </Link>
        </div>
      </div>
    </section>
  );
}
