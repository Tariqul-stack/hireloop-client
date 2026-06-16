"use client";

import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import { toast, Toaster } from "react-hot-toast";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/jobs?status=active");
      const result = await res.json();
      setJobs(result || []);
    } catch (error) {
      toast.error("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        padding: "48px 24px",
      }}
    >
      {/* Container */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Heading Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "white",
              marginBottom: "8px",
            }}
          >
            Browse Jobs
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255, 255, 255, 0.4)",
              margin: 0,
            }}
          >
            Explore curated opportunities from top companies.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
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
        )}

        {/* Empty State */}
        {!isLoading && jobs.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "16px" }}>
              No jobs available.
            </p>
          </div>
        )}

        {/* Jobs Grid */}
        {!isLoading && jobs.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={{
                  ...job,
                  href: `/jobs/${job._id}`,
                }}
              />
            ))}
          </div>
        )}
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
