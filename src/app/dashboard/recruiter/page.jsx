"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import StatsCard from "@/components/dashboard/StatsCard";
import {
  FileText,
  Persons,
  ThunderboltFill,
  CircleCheck,
  Plus,
} from "@gravity-ui/icons";

// Recent Applicants Mock Data
const recentApplicants = [
  {
    name: "Julianne Moore",
    initials: "JM",
    role: "Senior Product Designer",
    date: "Oct 24 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    name: "Robert Downey",
    initials: "RD",
    role: "Backend Engineer",
    date: "Oct 23 2023",
    experience: "4 years",
    status: "New",
  },
  {
    name: "Emma Stone",
    initials: "ES",
    role: "Marketing Lead",
    date: "Oct 22 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    name: "Chris Pratt",
    initials: "CP",
    role: "Product Manager",
    date: "Oct 21 2023",
    experience: "5 years",
    status: "Rejected",
  },
];

// Top Companies Mock Data
const topCompanies = [
  {
    name: "Google Inc.",
    logoLetter: "G",
    category: "Technology • Mountain View",
    activeJobs: "24 active jobs",
  },
  {
    name: "Meta Platforms",
    logoLetter: "M",
    category: "Social Media • Menlo Park",
    activeJobs: "18 active jobs",
  },
  {
    name: "Stripe",
    logoLetter: "S",
    category: "Fintech • San Francisco",
    activeJobs: "12 active jobs",
  },
  {
    name: "Tesla",
    logoLetter: "T",
    category: "Automotive • Austin",
    activeJobs: "31 active jobs",
  },
];

export default function RecruiterDashboard() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name ?? "Recruiter";

  // Hover states for various interactive elements
  const [isFabHovered, setIsFabHovered] = useState(false);
  const [btnHoverIndex, setBtnHoverIndex] = useState(null);

  // Status Badge style generator
  const getStatusBadgeStyle = (status) => {
    const baseStyle = {
      fontSize: "12px",
      padding: "4px 10px",
      borderRadius: "99px",
      display: "inline-block",
      fontWeight: "500",
    };

    switch (status) {
      case "Interviewing":
        return {
          ...baseStyle,
          backgroundColor: "rgba(34, 197, 94, 0.15)",
          color: "#4ade80",
        };
      case "New":
        return {
          ...baseStyle,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          color: "rgba(255, 255, 255, 0.6)",
        };
      case "Reviewing":
        return {
          ...baseStyle,
          backgroundColor: "rgba(251, 191, 36, 0.15)",
          color: "#fbbf24",
        };
      case "Rejected":
        return {
          ...baseStyle,
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          color: "#f87171",
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div
      style={{
        padding: "32px",
        backgroundColor: "#0a0a0a",
        minHeight: "100%",
      }}
      className="flex flex-col text-white relative"
    >
      {/* SECTION A: Welcome Heading */}
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "32px",
        }}
      >
        Welcome back, {userName}
      </h1>

      {/* SECTION B: Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatsCard
          icon={<FileText className="h-5 w-5 text-white" />}
          label="Total Job Posts"
          value={48}
        />
        <StatsCard
          icon={<Persons className="h-5 w-5 text-white" />}
          label="Total Applicants"
          value="1,284"
        />
        <StatsCard
          icon={<ThunderboltFill className="h-5 w-5 text-white" />}
          label="Active Jobs"
          value={18}
        />
        <StatsCard
          icon={<CircleCheck className="h-5 w-5 text-white" />}
          label="Jobs Closed"
          value={32}
        />
      </div>

      {/* SECTION C: Columns layout split (65% left, 35% right) */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: Recent Applications table */}
        <div className="w-full lg:w-[65%] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Applications</h2>
            <a
              href="#"
              style={{ color: "#7c3aed" }}
              className="text-sm font-medium hover:text-violet-400 transition-colors"
            >
              View all
            </a>
          </div>

          <div
            style={{
              backgroundColor: "#111111",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr>
                  <th
                    style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "12px", textTransform: "uppercase" }}
                    className="px-6 py-4 font-semibold tracking-wider"
                  >
                    Candidate Name
                  </th>
                  <th
                    style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "12px", textTransform: "uppercase" }}
                    className="px-6 py-4 font-semibold tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "12px", textTransform: "uppercase" }}
                    className="px-6 py-4 font-semibold tracking-wider"
                  >
                    Date Applied
                  </th>
                  <th
                    style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "12px", textTransform: "uppercase" }}
                    className="px-6 py-4 font-semibold tracking-wider"
                  >
                    Experience
                  </th>
                  <th
                    style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "12px", textTransform: "uppercase" }}
                    className="px-6 py-4 font-semibold tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentApplicants.map((applicant, idx) => (
                  <tr
                    key={idx}
                    style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Grey Circle Avatar */}
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            color: "#ffffff",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                          className="flex items-center justify-center shrink-0"
                        >
                          {applicant.initials}
                        </div>
                        <span className="text-sm font-medium text-white/90">
                          {applicant.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/70">
                      {applicant.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/50">
                      {applicant.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/70">
                      {applicant.experience}
                    </td>
                    <td className="px-6 py-4">
                      <span style={getStatusBadgeStyle(applicant.status)}>
                        {applicant.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: My Top Companies */}
        <div className="w-full lg:w-[35%] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">My Top Companies</h2>
            <a
              href="#"
              style={{ color: "#7c3aed" }}
              className="text-sm font-medium hover:text-violet-400 transition-colors"
            >
              View all
            </a>
          </div>

          <div
            style={{
              backgroundColor: "#111111",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "20px",
            }}
            className="flex flex-col gap-5"
          >
            {/* Company Items */}
            {topCompanies.map((company, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Square Dark Logo Placeholder */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#2a2a2a",
                      borderRadius: "8px",
                    }}
                    className="flex items-center justify-center text-white/80 font-bold shrink-0"
                  >
                    {company.logoLetter}
                  </div>
                  {/* Title & subtitle info */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-white truncate">
                      {company.name}
                    </span>
                    <span
                      className="text-xs truncate"
                      style={{ color: "rgba(255, 255, 255, 0.4)" }}
                    >
                      {company.category}
                    </span>
                  </div>
                </div>
                {/* Active Jobs Badge count */}
                <span
                  style={{ color: "#7c3aed" }}
                  className="text-xs font-semibold shrink-0"
                >
                  {company.activeJobs}
                </span>
              </div>
            ))}

            {/* Bottom Button */}
            <button
              type="button"
              onMouseEnter={() => setBtnHoverIndex(99)}
              onMouseLeave={() => setBtnHoverIndex(null)}
              style={{
                width: "100%",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: btnHoverIndex === 99 ? "rgba(255, 255, 255, 0.04)" : "transparent",
                color: "rgba(255, 255, 255, 0.6)",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              className="active:scale-[0.98]"
            >
              View All Companies
            </button>
          </div>
        </div>
      </div>

      {/* SECTION D: Floating Action Button (FAB) */}
      <button
        type="button"
        onMouseEnter={() => setIsFabHovered(true)}
        onMouseLeave={() => setIsFabHovered(false)}
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          zIndex: 50,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: isFabHovered ? "#6d28d9" : "#7c3aed",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
          transition: "background-color 0.2s ease, transform 0.1s ease",
        }}
        className="active:scale-[0.95]"
        aria-label="Add job post"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
