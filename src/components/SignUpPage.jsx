"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  Person,
  ArrowLeft,
  CircleCheck,
  TriangleExclamation,
  LogoGithub,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string }
  const [formData, setFormData] = useState({
    name: "",
    role: "jobSeeker",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }
    if (formData.password.length < 8) {
      setStatus({
        type: "error",
        message: "Password must be at least 8 characters.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (error) {
        setStatus({
          type: "error",
          message: error.message || "Something went wrong. Please try again.",
        });
      } else {
        setStatus({
          type: "success",
          message: "Account created! Check your email to verify your account.",
        });
        setFormData({ name: "", role: "jobSeeker", email: "", password: "", confirmPassword: "" });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setSocialLoading("google");
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      setStatus({ type: "error", message: "Failed to sign in with Google." });
      setSocialLoading(null);
    }
  };

  const handleGithubSignUp = async () => {
    setSocialLoading("github");
    try {
      await authClient.signIn.social({ provider: "github", callbackURL: "/" });
    } catch {
      setStatus({ type: "error", message: "Failed to sign in with GitHub." });
      setSocialLoading(null);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse at top, rgba(99,60,255,0.18) 0%, transparent 70%)",
          zIndex: 0,
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-md" style={{ zIndex: 10 }}>
        {/* Back to sign in */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

        {/* Card */}
        <div
          className="rounded-2xl border border-white/8 p-8"
          style={{ backgroundColor: "#111111" }}
        >
          {/* Logo + heading */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 19 3 17.88 3 16.5v-12zm8.5 3.27L16 10.5l-4.5 2.73V7.77z" />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-white">
                Create your account
              </h1>
              <p
                className="mt-1 text-sm"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Join thousands of professionals on Hire Loop
              </p>
            </div>
          </div>

          {/* Status message */}
          {status && (
            <div
              className="mb-5 flex items-start gap-3 rounded-xl border px-4 py-3"
              style={{
                backgroundColor:
                  status.type === "success"
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(239,68,68,0.08)",
                borderColor:
                  status.type === "success"
                    ? "rgba(34,197,94,0.25)"
                    : "rgba(239,68,68,0.25)",
              }}
            >
              {status.type === "success" ? (
                <CircleCheck className="h-4 w-4 mt-0.5 shrink-0 text-green-400" />
              ) : (
                <TriangleExclamation className="h-4 w-4 mt-0.5 shrink-0 text-red-400" />
              )}
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: status.type === "success" ? "#4ade80" : "#f87171",
                }}
              >
                {status.message}
              </p>
            </div>
          )}

          {/* Success state — show sign in link */}
          {status?.type === "success" ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
              >
                <CircleCheck className="h-8 w-8 text-green-400" />
              </div>
              <p
                className="text-center text-sm"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Your account is ready. You can now sign in.
              </p>
              <Link
                href="/auth/signin"
                className="w-full rounded-xl bg-violet-600 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-violet-500 active:scale-95"
              >
                Go to Sign In
              </Link>
              <button
                onClick={() => setStatus(null)}
                className="text-sm transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Create another account
              </button>
            </div>
          ) : (
            <>
              {/* Social sign up */}
              <div className="flex flex-col gap-3 mb-6">
                <button
                  onClick={handleGoogleSignUp}
                  disabled={!!socialLoading}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  {socialLoading === "google" ? (
                    <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  {socialLoading === "google"
                    ? "Redirecting..."
                    : "Continue with Google"}
                </button>

                <button
                  onClick={handleGithubSignUp}
                  disabled={!!socialLoading}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  {socialLoading === "github" ? (
                    <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  ) : (
                    <LogoGithub className="h-4 w-4 text-white" />
                  )}
                  {socialLoading === "github"
                    ? "Redirecting..."
                    : "Continue with GitHub"}
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6 flex items-center gap-3">
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  or sign up with email
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-medium"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Full name
                  </label>
                  <div
                    className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition-all focus-within:border-violet-500/50"
                    style={{ backgroundColor: "#1a1a1a" }}
                  >
                    <Person
                      className="h-4 w-4 shrink-0"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
                    />
                  </div>
                </div>

                {/* Role selection */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-medium"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    I want to sign up as a
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: "jobSeeker" })}
                      className="flex-1 rounded-xl py-3 text-sm font-semibold text-white transition-all border"
                      style={{
                        backgroundColor:
                          formData.role === "jobSeeker" ? "#7c3aed" : "#1a1a1a",
                        borderColor:
                          formData.role === "jobSeeker"
                            ? "#7c3aed"
                            : "rgba(255,255,255,0.1)",
                      }}
                    >
                      Job Seeker
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: "recruiter" })}
                      className="flex-1 rounded-xl py-3 text-sm font-semibold text-white transition-all border"
                      style={{
                        backgroundColor:
                          formData.role === "recruiter" ? "#7c3aed" : "#1a1a1a",
                        borderColor:
                          formData.role === "recruiter"
                            ? "#7c3aed"
                            : "rgba(255,255,255,0.1)",
                      }}
                    >
                      Recruiter
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-medium"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Email address
                  </label>
                  <div
                    className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition-all focus-within:border-violet-500/50"
                    style={{ backgroundColor: "#1a1a1a" }}
                  >
                    <Envelope
                      className="h-4 w-4 shrink-0"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-medium"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Password
                  </label>
                  <div
                    className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition-all focus-within:border-violet-500/50"
                    style={{ backgroundColor: "#1a1a1a" }}
                  >
                    <Lock
                      className="h-4 w-4 shrink-0"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Min. 8 characters"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="shrink-0 transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeSlash className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-medium"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Confirm password
                  </label>
                  <div
                    className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition-all focus-within:border-violet-500/50"
                    style={{ backgroundColor: "#1a1a1a" }}
                  >
                    <Lock
                      className="h-4 w-4 shrink-0"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    />
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="shrink-0 transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirm ? (
                        <EyeSlash className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-500 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </button>
              </form>
            </>
          )}

          {/* Sign in link — always visible */}
          {status?.type !== "success" && (
            <p
              className="mt-6 text-center text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-violet-400 font-medium hover:text-violet-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
