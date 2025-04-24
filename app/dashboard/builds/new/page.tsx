"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BuildForm } from "@/components/character-build/build-form";

export default function NewBuildPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Create New Build</h1>
      <BuildForm />
    </DashboardLayout>
  );
}
