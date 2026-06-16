"use client";

import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import { toast, Toaster } from "react-hot-toast";
import { Magnifier } from "@gravity-ui/icons";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/jobs?status=active");
      const result = await res.json();
      setAllJobs(result || []);
      setJobs(result || []);
    } catch (error) {
      toast.error("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...allJobs];

    if (searchQuery.trim()) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
    } else if (sortBy === "salary-high") {
      filtered.sort((a, b) => Number(b.maxSalary) - Number(a.maxSalary));
    } else if (sortBy === "salary-low") {
      filtered.sort((a, b) => Number(a.minSalary) - Number(b.minSalary));
    }

    setJobs(filtered);
  }, [searchQuery, sortBy, allJobs]);

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

        {/* Search and Sort UI */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "32px",
            flexWrap: "wrap",
          }}
        >
          {/* Search Input */}
          <div
            style={{
              flex: 1,
              minWidth: "280px",
              position: "relative",
            }}
          >
            <Magnifier
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.35)",
                height: "16px",
                width: "16px",
              }}
            />
            <input
              type="text"
              placeholder="Search by job title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "#111111",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                padding: "12px 14px 12px 40px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
              }
            />
          </div>

          {/* Sort Select */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              backgroundColor: "#111111",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              color: "white",
              fontSize: "14px",
              padding: "12px 14px",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              minWidth: "180px",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
            }
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="salary-high">Salary: High to Low</option>
            <option value="salary-low">Salary: Low to High</option>
          </select>
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
              {searchQuery.trim()
                ? `No jobs found for "${searchQuery}"`
                : "No jobs available."}
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
