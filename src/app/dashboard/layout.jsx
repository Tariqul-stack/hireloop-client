"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

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
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      className="w-full text-white"
    >
      {/* Sidebar + Content row */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar Component */}
        <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Dynamic page content */}
        <main
          style={{ flex: 1, overflowY: "auto", backgroundColor: "#0a0a0a" }}
          className="md:pl-[240px]"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
