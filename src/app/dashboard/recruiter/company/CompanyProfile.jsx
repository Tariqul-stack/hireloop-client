"use client";

import { useState, useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { toast, Toaster } from "react-hot-toast";
import {
  createCompany,
  updateCompany,
  getCompanyByRecruiterId,
} from "@/lib/actions/companies";
import { ArrowUpFromLine, GeoPin } from "@gravity-ui/icons";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const { data: session } = authClient.useSession();
  const [company, setCompany] = useState(recruiterCompany);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(!recruiterCompany);
  const [isSaving, setIsSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    industry: "technology",
    websiteUrl: "",
    location: "",
    employeeCount: "1-10",
    description: "",
    logoUrl: "",
  });

  useEffect(() => {
    if (recruiterCompany) {
      setCompany(recruiterCompany);
      setFormData({
        name: recruiterCompany.name || "",
        industry: recruiterCompany.industry || "technology",
        websiteUrl: recruiterCompany.websiteUrl || "",
        location: recruiterCompany.location || "",
        employeeCount: recruiterCompany.employeeCount || "1-10",
        description: recruiterCompany.description || "",
        logoUrl: recruiterCompany.logoUrl || "",
      });
      if (recruiterCompany.logoUrl) {
        setLogoPreview(recruiterCompany.logoUrl);
      }
      setIsEditing(false);
    } else {
      setCompany(null);
      setIsEditing(true);
    }
    setIsLoading(false);
  }, [recruiterCompany]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    setIsUploadingLogo(true);
    try {
      const formDataImg = new FormData();
      formDataImg.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
        {
          method: "POST",
          body: formDataImg,
        },
      );
      const data = await res.json();
      if (data.success) {
        setLogoPreview(data.data.url);
        setFormData((prev) => ({ ...prev, logoUrl: data.data.url }));
        toast.success("Logo uploaded!");
      } else {
        toast.error("Logo upload failed");
      }
    } catch (error) {
      toast.error("Upload error");
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Company name is required");
      return;
    }
    setIsSaving(true);
    try {
      const companyData = {
        ...formData,
        recruiterId: session?.user?.id,
        recruiterEmail: session?.user?.email,
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      const result = await createCompany(companyData);
      if (result?.insertedId) {
        toast.success("Company registered successfully!");
        const newCompany = { ...companyData, _id: result.insertedId };
        setCompany(newCompany);
        setIsEditing(false);
      } else {
        toast.error("Failed to register company");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      const result = await updateCompany(company._id, formData);
      if (result?.modifiedCount === 1 || result?.success) {
        toast.success("Company updated successfully!");
        setCompany({ ...company, ...formData });
        setIsEditing(false);
      } else {
        toast.error("Failed to update company");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          backgroundColor: "#0a0a0a",
          padding: "32px",
          minHeight: "100%",
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

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        padding: "32px",
        minHeight: "100%",
      }}
    >
      {/* Heading Row */}
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
          Company Profile
        </h1>
        {company && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        )}
      </div>

      {/* Case A: No company registered and not editing */}
      {!company && !isEditing && (
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "48px",
            textAlign: "center",
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#1a1a1a",
              borderRadius: "16px",
              margin: "0 auto",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowUpFromLine
              size={32}
              style={{ color: "rgba(255, 255, 255, 0.3)" }}
            />
          </div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "white",
              marginBottom: "8px",
            }}
          >
            No Company Registered
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.4)",
              marginBottom: "24px",
            }}
          >
            Register your company to start posting jobs and finding talent.
          </p>
          <button
            onClick={() => setIsEditing(true)}
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
              borderRadius: "10px",
              padding: "12px 28px",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Register Company
          </button>
        </div>
      )}

      {/* Case B: Form shown */}
      {isEditing && (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "white",
              marginBottom: "4px",
            }}
          >
            {company ? "Edit Company" : "Register New Company"}
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.4)",
              marginBottom: "24px",
            }}
          >
            Enter your business details to start hiring on HireLoop.
          </p>

          <form onSubmit={company ? (e) => e.preventDefault() : handleSubmit}>
            {/* Row 1 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
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
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Acme Corp"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
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
                  Industry / Category
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
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
            </div>

            {/* Row 2 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
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
                  Website URL
                </label>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      backgroundColor: "#2a2a2a",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "10px 0 0 10px",
                      padding: "10px 14px",
                      color: "rgba(255, 255, 255, 0.4)",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    https://
                  </div>
                  <input
                    type="text"
                    name="websiteUrl"
                    placeholder="www.company.com"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderLeft: "none",
                      borderRadius: "0 10px 10px 0",
                      color: "white",
                      fontSize: "14px",
                      padding: "10px 14px",
                      width: "100%",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    }}
                  />
                </div>
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
                  Location
                </label>
                <div style={{ position: "relative" }}>
                  <GeoPin
                    size={16}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "rgba(255, 255, 255, 0.4)",
                    }}
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "10px",
                      color: "white",
                      fontSize: "14px",
                      padding: "10px 14px 10px 36px",
                      width: "100%",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
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
                  Employee Count Range
                </label>
                <select
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    padding: "10px 14px",
                    width: "100%",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  }}
                >
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
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
                  Company Logo
                </label>
                <div
                  style={{ display: "flex", gap: "16px", alignItems: "center" }}
                >
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      width: "64px",
                      height: "64px",
                      backgroundColor: "#1a1a1a",
                      border: "2px dashed rgba(255, 255, 255, 0.15)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : isUploadingLogo ? (
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "2px solid rgba(255, 255, 255, 0.2)",
                          borderTop: "2px solid white",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      />
                    ) : (
                      <ArrowUpFromLine
                        size={20}
                        style={{ color: "rgba(255, 255, 255, 0.4)" }}
                      />
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "white",
                        fontWeight: 500,
                      }}
                    >
                      Upload image
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.4)",
                        marginTop: "2px",
                      }}
                    >
                      PNG, JPG up to 5MB
                    </div>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleLogoUpload}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* Row 4 */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.6)",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                Brief Description
              </label>
              <textarea
                name="description"
                placeholder="Tell us about your company's mission and culture..."
                value={formData.description}
                onChange={handleChange}
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                  padding: "10px 14px",
                  width: "100%",
                  boxSizing: "border-box",
                  outline: "none",
                  fontFamily: "inherit",
                  height: "120px",
                  resize: "vertical",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                }}
              />
            </div>

            {/* Form Footer */}
            <div
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                paddingTop: "20px",
                marginTop: "8px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              {company && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
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
              )}
              <button
                type={company ? "button" : "submit"}
                onClick={company ? handleUpdate : undefined}
                disabled={isSaving}
                style={{
                  backgroundColor: "#7c3aed",
                  color: "white",
                  borderRadius: "10px",
                  padding: "10px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  border: "none",
                  cursor: isSaving ? "not-allowed" : "pointer",
                  opacity: isSaving ? 0.6 : 1,
                }}
              >
                {company
                  ? isSaving
                    ? "Saving..."
                    : "Save Changes"
                  : isSaving
                    ? "Registering..."
                    : "Register Company"}
              </button>
            </div>
          </form>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Case C: Company exists and not editing */}
      {company && !isEditing && (
        <div
          style={{
            backgroundColor: "#111111",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "28px",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {/* Top Row */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              marginBottom: "28px",
            }}
          >
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={company.name}
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  backgroundColor: "#7c3aed",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {company.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {company.name}
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgba(124, 58, 237, 0.15)",
                    color: "#a78bfa",
                    fontSize: "12px",
                    padding: "4px 12px",
                    borderRadius: "99px",
                  }}
                >
                  {company.industry
                    ? company.industry.charAt(0).toUpperCase() +
                      company.industry.slice(1)
                    : "N/A"}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "12px",
                    padding: "4px 12px",
                    borderRadius: "99px",
                    backgroundColor:
                      company.status === "pending"
                        ? "rgba(251, 191, 36, 0.15)"
                        : "rgba(34, 197, 94, 0.15)",
                    color: company.status === "pending" ? "#fbbf24" : "#4ade80",
                  }}
                >
                  {company.status === "pending"
                    ? "Pending Approval"
                    : "Approved"}
                </span>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.4)",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                }}
              >
                Website
              </div>
              <div
                style={{ fontSize: "14px", color: "white", fontWeight: 500 }}
              >
                {company.websiteUrl || "Not set"}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.4)",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                }}
              >
                Location
              </div>
              <div
                style={{ fontSize: "14px", color: "white", fontWeight: 500 }}
              >
                {company.location || "Not set"}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.4)",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                }}
              >
                Team Size
              </div>
              <div
                style={{ fontSize: "14px", color: "white", fontWeight: 500 }}
              >
                {company.employeeCount
                  ? `${company.employeeCount} employees`
                  : "Not set"}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.4)",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                }}
              >
                Registered
              </div>
              <div
                style={{ fontSize: "14px", color: "white", fontWeight: 500 }}
              >
                {new Date(company.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Description Section */}
          {company.description && (
            <div
              style={{
                marginTop: "20px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.4)",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                About
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: "1.6",
                }}
              >
                {company.description}
              </p>
            </div>
          )}
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
