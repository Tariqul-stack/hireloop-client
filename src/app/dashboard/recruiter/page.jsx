"use client";

import { authClient } from "@/lib/auth-client";

export default function RecruiterDashboard() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userName = user?.name ?? "Recruiter";

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold text-white">Welcome, {userName}</h1>
      <p className="text-sm text-white/50">
        Recruiter Dashboard — coming soon
      </p>
    </div>
  );
}
