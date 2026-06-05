"use client";

import { authClient } from "@/lib/auth-client";

export default function JobSeekerDashboard() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userName = user?.name ?? "Job Seeker";

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold text-white">Welcome, {userName}</h1>
      <p className="text-sm text-white/50">
        Job Seeker Dashboard — coming soon
      </p>
    </div>
  );
}
