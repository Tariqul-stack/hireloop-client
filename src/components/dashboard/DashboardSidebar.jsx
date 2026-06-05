"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Xmark,
  House,
  Briefcase,
  Bookmark,
  Person,
  Plus,
  ListUl as List,
  FileText,
  ArrowRight,
} from "@gravity-ui/icons";

// Helper for User Initials / Avatar
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
        className={`${size} rounded-full object-cover ring-2 ring-violet-500/40`}
      />
    );
  }

  return (
    <div
      className={`${size} rounded-full flex items-center justify-center text-xs font-bold text-white ring-2 ring-violet-500/40`}
      style={{ backgroundColor: "#7c3aed" }}
    >
      {initials}
    </div>
  );
}

export default function DashboardSidebar({ isOpen, setIsOpen }) {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const user = session?.user;
  const role = user?.role ?? "jobSeeker";

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  // Seeker navigation links
  const seekerLinks = [
    { label: "Dashboard", href: "/dashboard/job-seeker", icon: House },
    { label: "Browse Jobs", href: "/dashboard/jobs", icon: Briefcase },
    { label: "Saved Jobs", href: "/dashboard/saved-jobs", icon: Bookmark },
    { label: "Applications", href: "/dashboard/applications", icon: FileText },
    { label: "Profile", href: "/dashboard/profile", icon: Person },
  ];

  // Recruiter navigation links
  const recruiterLinks = [
    { label: "Dashboard", href: "/dashboard/recruiter", icon: House },
    { label: "Post a Job", href: "/dashboard/recruiter/post", icon: Plus },
    { label: "My Listings", href: "/dashboard/recruiter/listings", icon: List },
    { label: "Applications", href: "/dashboard/recruiter/applications", icon: FileText },
    { label: "Profile", href: "/dashboard/profile", icon: Person },
  ];

  const links = role === "recruiter" ? recruiterLinks : seekerLinks;

  const handleLinkClick = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col h-full w-[240px] transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{
          backgroundColor: "#111111",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Brand Header */}
        <div
          className="flex h-16 items-center justify-between px-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={handleLinkClick}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
              <svg
                className="h-4 w-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 19 3 17.88 3 16.5v-12zm8.5 3.27L16 10.5l-4.5 2.73V7.77z" />
              </svg>
            </div>
            <span className="text-sm font-semibold leading-tight text-white">
              Hire Loop
            </span>
          </Link>

          {/* Close button for Mobile drawer */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <Xmark className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all"
                style={{
                  backgroundColor: isActive ? "#7c3aed" : "transparent",
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                }}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User profile & Logout footer */}
        <div
          className="p-4 border-t flex flex-col gap-4"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3 px-2">
            <UserAvatar user={user} />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-white truncate">
                {user?.name ?? "User"}
              </span>
              <span
                className="text-xs truncate"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {user?.email}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors hover:bg-white/5"
            style={{
              color: "#f87171",
              border: "1px solid rgba(248, 113, 113, 0.15)",
            }}
          >
            <ArrowRight className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
