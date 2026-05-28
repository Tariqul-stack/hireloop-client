"use client";

import Link from "next/link";
import { LogoFacebook, LogoLinkedin, LogoGithub } from "@gravity-ui/icons";

const footerLinks = {
  Product: [
    { label: "Job discovery", href: "/jobs" },
    { label: "Worker AI", href: "/worker-ai" },
    { label: "Companies", href: "/companies" },
    { label: "Salary data", href: "/salary-data" },
  ],
  Navigations: [
    { label: "Help center", href: "/help" },
    { label: "Career library", href: "/career-library" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Brand Guideline", href: "/brand" },
    { label: "Newsroom", href: "/newsroom" },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <LogoFacebook className="h-4 w-4" />,
    bg: "bg-[#1a1a1a]",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: <LogoGithub className="h-4 w-4" />,
    bg: "bg-[#1a1a1a]",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: <LogoLinkedin className="h-4 w-4" />,
    bg: "bg-[#1a1a1a]",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
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
            <p className="text-sm leading-relaxed text-white/40 max-w-[220px]">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-5">
              <h3 className="text-sm font-semibold text-violet-500">
                {category}
              </h3>
              <ul className="flex flex-col gap-3.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-opacity hover:opacity-80 ${social.bg}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright & legal */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6 text-xs text-white/30">
            <span>Copyright 2024 — Hire Loop</span>
            <div className="flex items-center gap-4">
              <Link
                href="/terms"
                className="hover:text-white/60 transition-colors"
              >
                Terms &amp; Policy
              </Link>
              <span>-</span>
              <Link
                href="/privacy"
                className="hover:text-white/60 transition-colors"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
