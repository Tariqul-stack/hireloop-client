"use client";

import Link from "next/link";
import { GeoPin, Briefcase, CircleDollar, ArrowRight } from "@gravity-ui/icons";

export default function JobCard({ job }) {
  const {
    title,
    description,
    location,
    jobType,
    minSalary,
    maxSalary,
    currency,
    href,
  } = job;

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Title */}
      <h3
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "white",
          margin: 0,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          color: "rgba(255, 255, 255, 0.45)",
          lineHeight: "1.6",
          margin: 0,
        }}
      >
        {description}
      </p>

      {/* Tags Row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {/* Location Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "99px",
            padding: "6px 14px",
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <GeoPin size={16} style={{ color: "#a78bfa" }} />
          {location}
        </div>

        {/* Job Type Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "99px",
            padding: "6px 14px",
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <Briefcase size={16} style={{ color: "#a78bfa" }} />
          {jobType}
        </div>

        {/* Salary Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "99px",
            padding: "6px 14px",
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <CircleDollar size={16} style={{ color: "#a78bfa" }} />
          {minSalary}–{maxSalary}/{currency}
        </div>
      </div>

      {/* Apply Now Link */}
      <Link
        href={href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          fontWeight: 600,
          color: "white",
          textDecoration: "none",
          marginTop: "8px",
        }}
      >
        Apply Now
        <ArrowRight
          size={16}
          style={{
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
          }}
        />
      </Link>
    </div>
  );
}
