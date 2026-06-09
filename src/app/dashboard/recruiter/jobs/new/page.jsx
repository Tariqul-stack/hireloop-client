"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { MapPin } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { createJob } from "@/lib/actions/jobs";

export default function PostJobPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    jobType: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    currency: "usd",
    location: "",
    workType: "on-site",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const jobData = {
        ...formData,
        companyId: session?.user?.id,
        recruiterId: session?.user?.id,
        recruiterName: session?.user?.name,
        recruiterEmail: session?.user?.email,
        status: "active",
        postedAt: new Date().toISOString(),
      };
      const result = await createJob(jobData);
      if (result?.insertedId) {
        toast.success("Job posted successfully!");
        setTimeout(() => {
          router.push("/dashboard/recruiter/jobs");
        }, 1500);
      } else {
        toast.error("Failed to post job. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    backgroundColor: "#1a1a1a",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "10px",
    color: "white",
    fontSize: "14px",
    padding: "10px 14px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: "6px",
    display: "block",
  };

  const sectionHeadingStyle = {
    fontSize: "16px",
    fontWeight: 600,
    color: "white",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    paddingBottom: "12px",
    marginBottom: "20px",
  };

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        padding: "32px",
        minHeight: "100vh",
      }}
    >
      {/* Page Heading */}
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "white",
          marginBottom: "8px",
        }}
      >
        Post a New Job
      </h1>
      <p
        style={{
          color: "rgba(255, 255, 255, 0.4)",
          fontSize: "14px",
          marginBottom: "32px",
        }}
      >
        Fill in the details below to publish a job listing
      </p>

      {/* Form Container */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit}>
          {/* Section 1: Job Information */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={sectionHeadingStyle}>Job Information</h2>

            {/* Row 1: Job Title & Job Category */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label style={labelStyle}>Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  placeholder="e.g. Senior Frontend Developer"
                  style={inputStyle}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                    e.target.style.backgroundColor = "#1a1a1a";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    e.target.style.backgroundColor = "#1a1a1a";
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Job Category</label>
                <select
                  name="category"
                  value={formData.category}
                  style={inputStyle}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  }}
                >
                  <option value="">Select a category</option>
                  <option value="technology">Technology</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Row 2: Job Type & Application Deadline */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label style={labelStyle}>Job Type</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  style={inputStyle}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  }}
                >
                  <option value="">Select a type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="remote">Remote</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Application Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  style={inputStyle}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  }}
                />
              </div>
            </div>

            {/* Row 3: Salary */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label style={labelStyle}>Min Salary</label>
                <input
                  type="number"
                  name="minSalary"
                  value={formData.minSalary}
                  placeholder="e.g. 3000"
                  style={inputStyle}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Max Salary</label>
                <input
                  type="number"
                  name="maxSalary"
                  value={formData.maxSalary}
                  placeholder="e.g. 8000"
                  style={inputStyle}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  style={inputStyle}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  }}
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                  <option value="bdt">BDT</option>
                </select>
              </div>
            </div>

            {/* Row 4: Location & Work Type */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label style={labelStyle}>Location</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    placeholder="City, Country"
                    style={{ ...inputStyle, paddingLeft: "36px" }}
                    onChange={handleChange}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    <MapPin size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Work Type</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, workType: "on-site" })
                    }
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor:
                        formData.workType === "on-site" ? "#7c3aed" : "#1a1a1a",
                      color:
                        formData.workType === "on-site"
                          ? "white"
                          : "rgba(255, 255, 255, 0.5)",
                      fontWeight: formData.workType === "on-site" ? 600 : 400,
                    }}
                  >
                    On-site
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, workType: "remote" })
                    }
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor:
                        formData.workType === "remote" ? "#7c3aed" : "#1a1a1a",
                      color:
                        formData.workType === "remote"
                          ? "white"
                          : "rgba(255, 255, 255, 0.5)",
                      fontWeight: formData.workType === "remote" ? 600 : 400,
                    }}
                  >
                    Remote
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Job Description */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={sectionHeadingStyle}>Job Description</h2>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Responsibilities</label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                placeholder="List the key responsibilities of this role..."
                style={{
                  ...inputStyle,
                  height: "120px",
                  resize: "vertical",
                  padding: "12px",
                }}
                onChange={handleChange}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                placeholder="List required skills, experience, and qualifications..."
                style={{
                  ...inputStyle,
                  height: "120px",
                  resize: "vertical",
                  padding: "12px",
                }}
                onChange={handleChange}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                }}
              />
            </div>

            <div>
              <label style={labelStyle}>Benefits (Optional)</label>
              <textarea
                name="benefits"
                value={formData.benefits}
                placeholder="e.g. Health insurance, remote work, equity..."
                style={{
                  ...inputStyle,
                  height: "100px",
                  resize: "vertical",
                  padding: "12px",
                }}
                onChange={handleChange}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                }}
              />
            </div>
          </div>

          {/* Section 3: Company */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={sectionHeadingStyle}>Company</h2>

            <div
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#2a2a2a",
                  borderRadius: "8px",
                  flexShrink: 0,
                }}
              />

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  No company registered
                </p>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.4)",
                    fontSize: "13px",
                    margin: "4px 0 0 0",
                  }}
                >
                  You need to register a company before posting jobs.
                </p>
                <a
                  href="/dashboard/recruiter/company"
                  style={{
                    display: "inline-block",
                    marginTop: "12px",
                    border: "1px solid rgba(124, 58, 237, 0.4)",
                    color: "#a78bfa",
                    backgroundColor: "rgba(124, 58, 237, 0.08)",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "13px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Register Company
                </a>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div
            style={{
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              marginTop: "32px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <a
              href="/dashboard/recruiter/jobs"
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.6)",
                borderRadius: "10px",
                padding: "10px 24px",
                fontSize: "14px",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </a>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: "#7c3aed",
                color: "white",
                borderRadius: "10px",
                padding: "10px 24px",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.target.style.backgroundColor = "#6d28d9";
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.target.style.backgroundColor = "#7c3aed";
              }}
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "white",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#7c3aed", secondary: "white" },
          },
        }}
      />
    </div>
  );
}
