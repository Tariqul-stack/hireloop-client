"use client";

import { authClient } from "@/lib/auth-client";
import { Magnifier, Bell, Bars } from "@gravity-ui/icons";

// Helper for Initials calculation / avatar rendering
function UserAvatar({ user, size = "h-9 w-9" }) {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (user?.email?.[0]?.toUpperCase() ?? "?");

  if (user?.image) {
    return (
      <img
        src={user.image}
        alt={user.name ?? "User"}
        className={`${size} rounded-full object-cover`}
        style={{ border: "2px solid rgba(124, 58, 237, 0.4)" }}
      />
    );
  }

  return (
    <div
      className={`${size} rounded-full flex items-center justify-center text-xs font-bold text-white`}
      style={{
        backgroundColor: "#7c3aed",
        border: "2px solid rgba(124, 58, 237, 0.4)",
      }}
    >
      {initials}
    </div>
  );
}

export default function DashboardTopbar({ onMenuClick }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const companyName = user?.company || user?.email || "";

  return (
    <header
      className="flex items-center justify-between px-6 shrink-0"
      style={{
        height: "64px",
        backgroundColor: "#111111",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Left side: Hamburger (mobile toggle) + Search Input */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile sidebar toggle button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Open sidebar"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <Bars className="h-5 w-5" />
        </button>

        {/* Search bar container */}
        <div
          className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full"
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.08)",
            width: "320px",
          }}
        >
          <Magnifier
            className="h-4 w-4 shrink-0"
            style={{ color: "rgba(255,255,255,0.3)" }}
          />
          <input
            type="text"
            placeholder="Search applications, jobs, or talent..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
          />
        </div>
      </div>

      {/* Right side: Bell notification icon + Profile avatar & info */}
      <div className="flex items-center gap-5">
        {/* Notification Bell button */}
        <button
          type="button"
          className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
          style={{ border: "none", background: "transparent", cursor: "pointer" }}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-white/70 hover:text-white transition-colors" />
          <span
            className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full"
            style={{ backgroundColor: "#ef4444" }}
          />
        </button>

        {/* User identification info */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end min-w-0">
            <span className="text-sm font-medium text-white truncate">
              {user?.name ?? "User"}
            </span>
            <span
              className="text-xs truncate max-w-[150px]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {companyName}
            </span>
          </div>
          <UserAvatar user={user} />
        </div>
      </div>
    </header>
  );
}
