"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars, Xmark } from "@gravity-ui/icons";

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#111111]/80 backdrop-blur-xl">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — left aligned */}
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

        {/* Desktop nav — right aligned */}
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

          {/* Vertical divider */}
          <div className="mx-3 h-5 w-px bg-white/20" aria-hidden="true" />

          {/* Sign In */}
          <Link
            href="/sign-in"
            className="rounded-md px-3 py-2 text-sm font-semibold text-violet-400 transition-colors hover:text-violet-300"
          >
            Sign In
          </Link>

          {/* Get Started */}
          <Link
            href="/get-started"
            className="ml-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:bg-white/90 active:scale-95"
          >
            Get Started
          </Link>
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
        <div className="border-t border-white/10 md:hidden">
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

            <li>
              <Link
                href="/sign-in"
                className="block rounded-md px-3 py-2.5 text-sm font-semibold text-violet-400 hover:text-violet-300 hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>

            <li className="pb-1">
              <Link
                href="/get-started"
                className="block rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-gray-900 hover:bg-white/90 transition-all active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
