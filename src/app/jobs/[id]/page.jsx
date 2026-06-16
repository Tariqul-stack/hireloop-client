"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  GeoPin,
  Briefcase,
  CircleDollar,
  Clock,
  ArrowLeft,
} from "@gravity-ui/icons";
import { toast, Toaster } from "react-hot-toast";

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/jobs/${id}`);
      const result = await res.json();
      setJob(result);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to load job details");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          backgroundColor: "#0a0a0a",
          minHeight: "100vh",
          padding: "32px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            borderTop: "2px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!job) {
    return (
      <div
        style={{
          backgroundColor: "#0a0a0a",
          minHeight: "100vh",
          padding: "32px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "16px" }}>
          Job not found.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        padding: "32px 24px",
      }}
    >
      {/* Container */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Back Link */}
        <Link
          href="/jobs"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "14px",
            marginBottom: "32px",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
          }}
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </Link>

        {/* Job Detail Card */}
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          {/* Header Section */}
          <div style={{ marginBottom: "24px" }}>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "white",
                marginBottom: "8px",
                margin: 0,
                marginBottom: "8px",
              }}
            >
              {job.title}
            </h1>

            {/* Tags Row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "12px",
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
                {job.location}
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
                {job.jobType}
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
                {job.minSalary}–{job.maxSalary} {job.currency}
              </div>

              {/* Deadline Tag */}
              {job.deadline && (
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
                  <Clock size={16} style={{ color: "#a78bfa" }} />
                  Deadline:{" "}
                  {new Date(job.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              margin: "24px 0",
            }}
          />

          {/* Responsibilities Section */}
          {job.responsibilities && (
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "12px",
                  margin: 0,
                  marginBottom: "12px",
                }}
              >
                Responsibilities
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: "1.8",
                  whiteSpace: "pre-wrap",
                  margin: 0,
                }}
              >
                {job.responsibilities}
              </p>
            </div>
          )}

          {/* Requirements Section */}
          {job.requirements && (
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "12px",
                  margin: 0,
                  marginBottom: "12px",
                }}
              >
                Requirements
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: "1.8",
                  whiteSpace: "pre-wrap",
                  margin: 0,
                }}
              >
                {job.requirements}
              </p>
            </div>
          )}

          {/* Benefits Section */}
          {job.benefits && (
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "12px",
                  margin: 0,
                  marginBottom: "12px",
                }}
              >
                Benefits
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: "1.8",
                  whiteSpace: "pre-wrap",
                  margin: 0,
                }}
              >
                {job.benefits}
              </p>
            </div>
          )}

          {/* Apply Button */}
          <button
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
              borderRadius: "12px",
              padding: "14px 32px",
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              width: "100%",
              marginTop: "32px",
            }}
          >
            Apply Now
          </button>
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            backgroundColor: "#1a1a1a",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "10px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#7c3aed",
            },
          },
        }}
      />
    </div>
  );
}
