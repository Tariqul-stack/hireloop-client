"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars, Xmark, ChevronDown } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

// Avatar — shows image if available, else initials
function UserAvatar({ user, size = "h-8 w-8" }) {
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

// Dropdown menu for signed-in user
function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full transition-all hover:opacity-80"
        aria-label="User menu"
      >
        <UserAvatar user={user} />
        <ChevronDown
          className="h-3.5 w-3.5 text-white/50 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/10 py-1.5 shadow-xl"
          style={{ backgroundColor: "#161616", zIndex: 100 }}
        >
          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8">
            <UserAvatar user={user} size="h-9 w-9" />
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

          {/* Menu items */}
          <div className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              Profile
            </Link>
            <Link
              href="/saved-jobs"
              onClick={() => setOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              Saved Jobs
            </Link>
          </div>

          <div className="border-t border-white/8 pt-1">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center px-4 py-2 text-sm transition-colors hover:bg-white/5"
              style={{ color: "#f87171" }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname && pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <nav
      className="sticky top-0 w-full transition-all duration-500 border-b"
      style={{
        zIndex: 50,
        borderColor: scrolled
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.05)",
        backgroundColor: scrolled ? "rgba(10,10,12,0.85)" : "#0a0a0a",
        backdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
      }}
    >
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 ml-auto">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white hover:bg-white/5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mx-3 h-5 w-px bg-white/20" aria-hidden="true" />

          {/* Auth section */}
          {isPending ? (
            // Loading skeleton
            <div
              className="h-8 w-8 rounded-full animate-pulse"
              style={{ backgroundColor: "#2a2a2a" }}
            />
          ) : user ? (
            // Signed in — show avatar + dropdown
            <UserMenu user={user} />
          ) : (
            // Signed out — show Sign In + Get Started
            <>
              <Link
                href="/auth/signin"
                className="rounded-md px-3 py-2 text-sm font-semibold text-violet-400 transition-colors hover:text-violet-300"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="ml-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:bg-white/90 active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="ml-auto flex md:hidden items-center justify-center rounded-md p-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <Xmark className="h-5 w-5" />
          ) : (
            <Bars className="h-5 w-5" />
          )}
        </button>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="border-t border-white/10 md:hidden"
          style={{
            backgroundColor: "rgba(10,10,12,0.85)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        >
          <ul className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li>
              <div className="my-2 h-px bg-white/10" />
            </li>

            {user ? (
              // Mobile — signed in
              <>
                <li className="flex items-center gap-3 px-3 py-2">
                  <UserAvatar user={user} />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-white truncate">
                      {user.name}
                    </span>
                    <span
                      className="text-xs truncate"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {user.email}
                    </span>
                  </div>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="block rounded-md px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="block rounded-md px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li className="pb-1">
                  <button
                    onClick={async () => {
                      await authClient.signOut();
                      window.location.href = "/";
                    }}
                    className="block w-full text-left rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-white/5"
                    style={{ color: "#f87171" }}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              // Mobile — signed out
              <>
                <li>
                  <Link
                    href="/auth/signin"
                    className="block rounded-md px-3 py-2.5 text-sm font-semibold text-violet-400 hover:text-violet-300 hover:bg-white/5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
                <li className="pb-1">
                  <Link
                    href="/auth/signup"
                    className="block rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-gray-900 hover:bg-white/90 transition-all active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
