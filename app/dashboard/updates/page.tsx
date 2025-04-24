"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RecentUpdates } from "@/components/recent-updates";

export default function UpdatesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Updates</h2>
          <p className="text-muted-foreground">
            Manage and track changes to the Teyvat Archive Admin.
          </p>
        </div>
        <RecentUpdates />
      </div>
    </DashboardLayout>
  );
}
