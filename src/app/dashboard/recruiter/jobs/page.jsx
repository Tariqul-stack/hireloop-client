"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getCompanyJobs } from "@/lib/api/jobs";
import { toast, Toaster } from "react-hot-toast";
import { Eye, TrashBin, Pencil } from "@gravity-ui/icons";

export default function JobsPage() {
  const { data: session } = authClient.useSession();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [deletingJobId, setDeletingJobId] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchJobs();
    }
  }, [session?.user?.id]);

  const fetchJobs = async () => {
    try {
      const result = await getCompanyJobs(session.user.id);
      setJobs(result || []);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to load jobs");
      setIsLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    setIsDeleting(jobId);
    try {
      const res = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setJobs(jobs.filter((j) => j._id !== jobId));
        toast.success("Job deleted successfully");
      } else {
        toast.error("Failed to delete job");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(null);
      setDeletingJobId(null);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/jobs/${editingJob._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingJob),
        },
      );
      if (res.ok) {
        setJobs(jobs.map((j) => (j._id === editingJob._id ? editingJob : j)));
        setEditingJob(null);
        toast.success("Job updated successfully");
      } else {
        toast.error("Failed to update job");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      style={{
        padding: "32px",
        backgroundColor: "#0a0a0a",
        minHeight: "100%",
        position: "relative",
      }}
    >
      {/* Heading Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "white",
          }}
        >
          My Jobs
        </h1>
        <Link
          href="/dashboard/recruiter/jobs/new"
          style={{
            backgroundColor: "#7c3aed",
            color: "white",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Post New Job
        </Link>
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
            No jobs posted yet.
          </p>
        </div>
      )}

      {/* Jobs Table */}
      {!isLoading && jobs.length > 0 && (
        <div
          style={{
            backgroundColor: "#111111",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            marginTop: "24px",
            overflow: "hidden",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              backgroundColor: "#0f0f0f",
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr 1fr 1fr",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {[
              "Title",
              "Category",
              "Type",
              "Date Posted",
              "Status",
              "Actions",
            ].map((header) => (
              <div
                key={header}
                style={{
                  color: "rgba(255, 255, 255, 0.4)",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  padding: "12px 20px",
                  textAlign: "left",
                  fontWeight: 500,
                }}
              >
                {header}
              </div>
            ))}
          </div>

          {/* Table Body */}
          {jobs.map((job) => (
            <div
              key={job._id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr 1fr 1fr",
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              {/* Title Cell */}
              <div style={{ padding: "16px 20px" }}>
                <div
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {job.title}
                </div>
                <div
                  style={{
                    color: "rgba(255, 255, 255, 0.3)",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  Ref: {job._id.toString().slice(-6)}
                </div>
              </div>

              {/* Category Cell */}
              <div
                style={{
                  padding: "16px 20px",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "14px",
                }}
              >
                {job.category?.charAt(0).toUpperCase() + job.category?.slice(1)}
              </div>

              {/* Type Cell */}
              <div
                style={{
                  padding: "16px 20px",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "14px",
                }}
              >
                {job.jobType?.charAt(0).toUpperCase() + job.jobType?.slice(1)}
              </div>

              {/* Date Posted Cell */}
              <div
                style={{
                  padding: "16px 20px",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "14px",
                }}
              >
                {new Date(job.postedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              {/* Status Cell */}
              <div style={{ padding: "16px 20px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    padding: "4px 10px",
                    borderRadius: "99px",
                    fontWeight: 500,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor:
                      job.status === "active"
                        ? "rgba(34, 197, 94, 0.15)"
                        : "rgba(255, 255, 255, 0.08)",
                    color:
                      job.status === "active"
                        ? "#4ade80"
                        : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "currentColor",
                    }}
                  />
                  {job.status === "active" ? "ACTIVE" : "CLOSED"}
                </div>
              </div>

              {/* Actions Cell */}
              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  gap: "8px",
                }}
              >
                <button
                  onClick={() => {}}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    color: "rgba(255, 255, 255, 0.5)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgba(255, 255, 255, 0.5)";
                  }}
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => setEditingJob(job)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    color: "rgba(255, 255, 255, 0.5)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgba(255, 255, 255, 0.5)";
                  }}
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => setDeletingJobId(job._id)}
                  disabled={isDeleting === job._id}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: isDeleting === job._id ? "not-allowed" : "pointer",
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    color: "rgba(239, 68, 68, 0.6)",
                    transition: "color 0.2s",
                    opacity: isDeleting === job._id ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (isDeleting !== job._id) {
                      e.target.style.color = "#f87171";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgba(239, 68, 68, 0.6)";
                  }}
                >
                  <TrashBin size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingJob && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#111111",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "32px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  Edit Job
                </h2>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.4)",
                    fontSize: "14px",
                    marginTop: "4px",
                  }}
                >
                  {editingJob.title}
                </p>
              </div>
              <button
                onClick={() => setEditingJob(null)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "24px",
                }}
              >
                ✕
              </button>
            </div>

            {/* Form Fields */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editingJob.title}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, title: e.target.value })
                  }
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Category
                </label>
                <select
                  name="category"
                  value={editingJob.category}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, category: e.target.value })
                  }
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="technology">Technology</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={editingJob.jobType}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, jobType: e.target.value })
                  }
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="remote">Remote</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Min Salary
                </label>
                <input
                  type="number"
                  name="minSalary"
                  value={editingJob.minSalary}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, minSalary: e.target.value })
                  }
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Max Salary
                </label>
                <input
                  type="number"
                  name="maxSalary"
                  value={editingJob.maxSalary}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, maxSalary: e.target.value })
                  }
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Currency
                </label>
                <select
                  name="currency"
                  value={editingJob.currency}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, currency: e.target.value })
                  }
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                  <option value="inr">INR</option>
                </select>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={editingJob.location}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, location: e.target.value })
                  }
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Status
                </label>
                <select
                  name="status"
                  value={editingJob.status}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, status: e.target.value })
                  }
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Responsibilities
                </label>
                <textarea
                  name="responsibilities"
                  value={editingJob.responsibilities}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      responsibilities: e.target.value,
                    })
                  }
                  rows="3"
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={editingJob.requirements}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      requirements: e.target.value,
                    })
                  }
                  rows="3"
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Benefits
                </label>
                <textarea
                  name="benefits"
                  value={editingJob.benefits}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, benefits: e.target.value })
                  }
                  rows="3"
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* Modal Footer Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "24px",
              }}
            >
              <button
                onClick={() => setEditingJob(null)}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                style={{
                  backgroundColor: "#7c3aed",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingJobId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#111111",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "28px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            {/* Icon */}
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderRadius: "50%",
                padding: "16px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                marginBottom: "16px",
              }}
            >
              <TrashBin size={40} style={{ color: "#f87171" }} />
            </div>

            {/* Heading */}
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "white",
                textAlign: "center",
                marginBottom: "8px",
              }}
            >
              Delete Job?
            </h3>

            {/* Subtext */}
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.4)",
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              This action cannot be undone. The job will be permanently removed.
            </p>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setDeletingJobId(null)}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "10px",
                  padding: "10px 24px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingJobId)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  borderRadius: "10px",
                  padding: "10px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#dc2626";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#ef4444";
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
