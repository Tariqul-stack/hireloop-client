"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

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
      style={{ display: "flex", height: "100vh" }}
      className="w-full text-white"
    >
      {/* Sidebar Component */}
      <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Content Area Wrapper */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        className="md:pl-[240px]"
      >
        {/* Topbar Component */}
        <DashboardTopbar onMenuClick={() => setIsOpen(true)} />

        {/* Dynamic page content */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#0a0a0a",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
