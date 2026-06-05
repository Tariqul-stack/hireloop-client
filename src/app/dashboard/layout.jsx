"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Bars } from "@gravity-ui/icons";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-[9999]"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div
      className="min-h-screen w-full flex text-white"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Sidebar Component */}
      <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Content Area Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden md:pl-[240px]">
        {/* Mobile Header (top bar) */}
        <header
          className="flex md:hidden items-center justify-between px-6 h-16 border-b shrink-0"
          style={{
            backgroundColor: "#111111",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          {/* Logo or Brand */}
          <div className="flex items-center gap-2.5">
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
              Programming
              <br />
              Hero
            </span>
          </div>

          {/* Toggle Button for Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Open sidebar"
          >
            <Bars className="h-5 w-5" />
          </button>
        </header>

        {/* Dynamic page content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
