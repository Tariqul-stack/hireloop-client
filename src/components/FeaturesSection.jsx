"use client";

import {
  Magnifier,
  ChartLineArrowUp,
  ChartColumn,
  Bookmark,
  FolderMagnifier,
  FileText,
  NutHex,
  ArrowUpRight,
} from "@gravity-ui/icons";

const features = [
  {
    id: 1,
    icon: <Magnifier className="h-6 w-6 text-violet-400" />,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    id: 2,
    icon: <ChartLineArrowUp className="h-6 w-6 text-violet-400" />,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    id: 3,
    icon: <ChartColumn className="h-6 w-6 text-violet-400" />,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    id: 4,
    icon: <Bookmark className="h-6 w-6 text-violet-400" />,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    id: 5,
    icon: <FolderMagnifier className="h-6 w-6 text-violet-400" />,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    id: 6,
    icon: <FileText className="h-6 w-6 text-violet-400" />,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    id: 7,
    icon: <NutHex className="h-6 w-6 text-violet-400" />,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    id: 8,
    icon: <ArrowUpRight className="h-6 w-6 text-violet-400" />,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      {/* Icon box */}
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/8"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 pt-1">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="w-full py-24" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <div
            className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <span className="h-1 w-1 rounded-full bg-violet-500" aria-hidden />
            FEATURES JOB
            <span className="h-1 w-1 rounded-full bg-violet-500" aria-hidden />
          </div>

          <h2 className="max-w-xl text-4xl font-bold text-white sm:text-5xl leading-tight">
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        {/* Features grid — 4 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ id, icon, title, description }) => (
            <FeatureCard
              key={id}
              icon={icon}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
