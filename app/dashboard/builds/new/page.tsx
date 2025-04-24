"use client";

import { BuildForm } from "@/components/character-build/build-form";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function NewBuildPage() {
  return (
    <DashboardLayout>
      <h1 className="mb-6 text-3xl font-bold">Create New Build</h1>
      <BuildForm />
    </DashboardLayout>
  );
}
