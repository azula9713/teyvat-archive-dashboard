"use client";

import { BuildList } from "@/components/build-list";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function BuildsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Character Builds
          </h2>
          <p className="text-muted-foreground">
            Manage and create character builds for Genshin Impact.
          </p>
        </div>
        <BuildList />
      </div>
    </DashboardLayout>
  );
}
