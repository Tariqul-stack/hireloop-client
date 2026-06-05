"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/auth/signin");
      return;
    }

    const role = session.user?.role;
    if (role === "recruiter") {
      router.replace("/dashboard/recruiter");
    } else {
      router.replace("/dashboard/job-seeker");
    }
  }, [session, isPending, router]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
    </div>
  );
}
